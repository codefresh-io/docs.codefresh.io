---
title: "Maven Central Repository rate limiting in Pipelines"
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

The build failed with following error during installation of maven dependencies:
```shell
Exception in thread "main" java.io.IOException: 
Server returned HTTP response code: 429 for URL: 
https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.8.6/apache-maven-3.8.6-bin.zip
```

## Details

Maven Central (operated by Sonatype) rate-limits traffic per IP, and the combined volume from all customers running on shared runtimes can trigger that limit — causing your builds to fail with HTTP 429 Too Many Requests. When facing the rate limit for a long time it might result in 403 Forbidden error.

This issue mostly affects pipelines running on Codefresh shared SaaS runtimes which is Cloud Builds or these runtimes:

    system/linux_paying_plan
    system/linux_non_paying_plan
    system/codefresh-enterprise
    system/plan/linux

If your pipelines run on a hybrid runner (your own Kubernetes cluster), your builds already use your own egress IP and you might not face this issue. However, if it happens this guide is still relevant for you.

**The fix is straightforward**: route your Maven dependency downloads through a caching proxy that sits between your pipeline and Maven Central. After the first download of each artifact, all subsequent requests are served from the cache — Maven Central never sees repeated traffic from your builds.

There are a **couple of options** to proceed with:
- AWS CodeArtifact
- Google Artifact Registry
- Azure Artifacts
- Self-hosted Nexus Repository Manager


## Configure Maven Proxy Cache using AWS CodeArtifact

### Step 1: Create a CodeArtifact domain and repository

```shell
# Create a domain (one per AWS account is typical)
aws codeartifact create-domain --domain my-org

# Create a Maven repository with Maven Central as upstream
aws codeartifact create-repository \
  --domain my-org \
  --repository maven-proxy \
  --description "Maven Central caching proxy"

# Connect it to Maven Central
aws codeartifact associate-external-connection \
  --domain my-org \
  --repository maven-proxy \
  --external-connection public:maven-central
```

### Step 2: Get your repository endpoint

```shell
# Create a domain (one per AWS account is typical)
aws codeartifact create-domain --domain my-org

# Create a Maven repository with Maven Central as upstream
aws codeartifact create-repository \
  --domain my-org \
  --repository maven-proxy \
  --description "Maven Central caching proxy"

# Connect it to Maven Central
aws codeartifact associate-external-connection \
  --domain my-org \
  --repository maven-proxy \
  --external-connection public:maven-central
```

### Step 3: Configure ~/.m2/settings.xml

```yaml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
          https://maven.apache.org/xsd/settings-1.0.0.xsd">

  <servers>
    <server>
      <id>codeartifact</id>
      <username>aws</username>
      <!-- Token is injected at build time via environment variable -->
      <password>${env.CODEARTIFACT_AUTH_TOKEN}</password>
    </server>
  </servers>

  <mirrors>
    <mirror>
      <id>codeartifact</id>
      <name>CodeArtifact Maven Central Proxy</name>
      <url>https://my-org-123456789012.d.codeartifact.us-east-1.amazonaws.com/maven/maven-proxy/</url>
      <!-- Redirect all external Maven traffic through the proxy -->
      <mirrorOf>external:*</mirrorOf>
    </mirror>
  </mirrors>

</settings>
```

### Step 4: Add a token refresh step to your Codefresh pipeline

CodeArtifact auth tokens expire every 12 hours, so you need to fetch a fresh one at the start of each build. Add this as the first step in your pipeline:
```yaml
version: "1.0"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}"
    revision: "${{CF_BRANCH}}"
    git: "github"

  get_codeartifact_token:
    title: Refresh CodeArtifact auth token
    image: amazon/aws-cli
    working_directory: "${{clone}}"
    commands:
      - echo CODEARTIFACT_AUTH_TOKEN=$(aws codeartifact get-authorization-token --domain codefresh-org --domain-owner ${DOMAIN_OWNER} --region us-east-1 --query authorizationToken --output text) >> ${{CF_VOLUME_PATH}}/env_vars_to_export 

  build:
    title: Maven build
    image: maven:3.9-eclipse-temurin-21
    working_directory: "${{clone}}"
    commands:
      - mvn -s ci/settings.xml clean install
```

## Configure Maven Proxy Cache using Google Artifact Registry

### Step 1: Create a Remote Repository

```shell
gcloud artifacts repositories create maven-proxy \
  --project=YOUR_PROJECT_ID \
  --repository-format=maven \
  --location=us-east1 \
  --description="Maven Central caching proxy" \
  --mode=remote-repository \
  --remote-mvn-repo=MAVEN-CENTRAL
```

### Step 2: Get the repository URL

Your proxy URL follows this pattern:
```shell
https://LOCATION-maven.pkg.dev/PROJECT_ID/REPOSITORY_NAME/
# Example:
https://us-east1-maven.pkg.dev/my-project/maven-proxy/
```
### Step 3: Configure ~/.m2/settings.xml

```yaml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
          https://maven.apache.org/xsd/settings-1.0.0.xsd">

  <servers>
    <server>
      <id>artifact-registry</id>
      <username>_json_key</username>
      <password>${env.GOOGLE_JSON_KEY_FILE}</password>
    </server>
  </servers>
          
  <mirrors>
    <mirror>
      <id>artifact-registry</id>
      <name>GCP Artifact Registry — Maven Central Proxy</name>
      <url>https://LOCATION-maven.pkg.dev/PROJECT_ID/REPOSITORY_NAME/</url>
      <mirrorOf>central</mirrorOf>
    </mirror>
  </mirrors>

</settings>
```
### Step 4: Authenticate in Codefresh pipeline

Store your service account json key file as a Codefresh secret variable named `GOOGLE_JSON_KEY_FILE`. Maven picks it
up automatically via the `${env.GOOGLE_JSON_KEY_FILE}` reference in `settings.xml`.

```yaml
version: "1.0"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}"
    revision: "${{CF_BRANCH}}"
    git: "github"

  build:
    title: Maven build
    image: maven:3.9-eclipse-temurin-21
    working_directory: "${{clone}}"
    commands:
      - mvn -s ci/settings.xml clean install
```

## Configure Maven Proxy Cache using Azure Artifacts

### Step 1: Create a feed with Maven Central upstream

1. In Azure DevOps, go to **Artifacts** → **Create Feed**
2. Name your feed (e.g. `maven-proxy`)
3. Check **"Include packages from common public sources"** — this enables Maven Central
   as an upstream automatically
4. Click **Create**

To add Maven Central to an existing feed manually:

1. Open your feed → gear icon → **Upstream sources**
2. Click **Add Upstream** → **Public source**
3. Select **Maven Central** (`https://repo.maven.apache.org/maven2/`)
4. Click **Save**

### Step 2: Get your feed URL

Your feed URL follows this pattern:

```
https://pkgs.dev.azure.com/ORGANIZATION/PROJECT/_packaging/FEED_NAME/maven/v1
```

### Step 3: Generate a Personal Access Token

In Azure DevOps: **User Settings** → **Personal Access Tokens** → **New Token**

Set scope: **Packaging → Read & write**

### Step 4: Configure `~/.m2/settings.xml`

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
          https://maven.apache.org/xsd/settings-1.0.0.xsd">

  <servers>
    <server>
      <id>azure-artifacts</id>
      <username>AzureDevOps</username>
      <password>${env.AZURE_ARTIFACTS_PAT}</password>
    </server>
  </servers>

  <mirrors>
    <mirror>
      <id>azure-artifacts</id>
      <name>Azure Artifacts — Maven Central Proxy</name>
      <url>https://pkgs.dev.azure.com/MY_ORG/MY_PROJECT/_packaging/maven-proxy/maven/v1</url>
      <mirrorOf>external:*</mirrorOf>
    </mirror>
  </mirrors>

</settings>
```

### Step 5: Set the PAT in your Codefresh pipeline

Store your PAT as a Codefresh secret variable named `AZURE_ARTIFACTS_PAT`. Maven picks it
up automatically via the `${env.AZURE_ARTIFACTS_PAT}` reference in `settings.xml`.

```yaml
version: "1.0"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}"
    revision: "${{CF_BRANCH}}"
    git: "github"

  build:
    title: Maven build
    image: maven:3.9-eclipse-temurin-21
    working_directory: "${{clone}}"
    commands:
      - mvn -s ci/settings.xml clean install
```

## Configure Maven Proxy Cache using Self-Hosted Nexus Repository Manager

Nexus OSS is free. Infrastructure cost depends on your setup — a minimal deployment (2 vCPU, 4 GB RAM, 100 GB storage) runs roughly $60–120/month on most cloud providers. A production-grade setup with SSD storage and egress is closer to $200–500/month.

>_**Note**:_
>
>The reason the YAML editor does not catch this at this time is because it istechnically a valid YAML file.


### Step 1: Deploy Nexus OSS to your cluster

Use [official sonatype documentation](https://help.sonatype.com/en/install-nexus-repository.html) to check requirements for Nexus repository installation.

### Step 2: Configure a Maven proxy repository in Nexus

1. Open the Nexus UI (typically `http://nexus.your-domain.com`)
2. Log in (default credentials: admin / check `/nexus-data/admin.password`)
3. Go to **Settings** → **Repositories** → **Create repository**
4. Choose **maven2 (proxy)**
5. Set:
  - **Name:** `maven-central-proxy`
  - **Remote storage URL:** `https://repo.maven.apache.org/maven2/`
  - **Blob store:** default
6. Click **Create repository**

Your proxy URL will be:

```
http://nexus.your-domain.com/repository/maven-central-proxy/
```

### Step 3: Configure `~/.m2/settings.xml`

```xml
<settings xmlns="http://maven.apache.org/SETTINGS/1.0.0"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.0.0
          https://maven.apache.org/xsd/settings-1.0.0.xsd">

  <servers>
    <server>
      <id>nexus</id>
      <username>${env.NEXUS_USER}</username>
      <!-- Token is injected at build time via environment variable -->
      <password>${env.NEXUS_PASSWORD}</password>
    </server>
  </servers>

  <mirrors>
    <mirror>
      <id>nexus</id>
      <name>Nexus Maven Central Proxy</name>
      <url>https://nexus.your-domain.com/repository/maven-central-proxy/</url>
      <!-- Redirect all external Maven traffic through the proxy -->
      <mirrorOf>external:*</mirrorOf>
    </mirror>
  </mirrors>

</settings>
```

### Step 4: Add credentials to your Codefresh pipeline

Add Codefresh secret variables named `NEXUS_USER` and 'NEXUS_PASSWORD''. Maven picks it
up automatically via the `${env.NEXUS_USER}` and `${env.NEXUS_PASSWORD}` reference in `settings.xml`.:

```yaml
version: "1.0"

steps:
  clone:
    title: "Cloning repository"
    type: "git-clone"
    repo: "${{CF_REPO_OWNER}}/${{CF_REPO_NAME}}"
    revision: "${{CF_BRANCH}}"
    git: "github"

  build:
    title: Maven build
    image: maven:3.9-eclipse-temurin-21
    working_directory: "${{clone}}"
    commands:
      - mvn -s ci/settings.xml clean install
```
## Verifying the Proxy Works

Check logs for the step where maven dependencies installations are executed
```
Downloading from proxy: https://your-proxy-url/org/apache/...
```

If you see your proxy URL instead of repo.maven.apache.org, the redirect is working.
