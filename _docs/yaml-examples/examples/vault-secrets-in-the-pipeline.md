---
title: "Vault Secrets in the Pipeline"
description: "Accessing and Referring to Vault Secrets in the Pipeline"
group: yaml-examples
sub_group: examples
toc: true
---

Codefresh offers a Vault plugin you may use from the [Step Marketplace](https://codefresh.io/steps/step/vault).  The plugin imports key-value pairs from the Vault server, and exports them into the pipeline. 
## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
- An existing Vault server [already setup](https://learn.hashicorp.com/vault/getting-started/install)
- A secret stored in said Vault server with a key of "password"
- A Vault [authorization token](https://learn.hashicorp.com/vault/getting-started/authentication#tokens)

## The Example Java Application

You can find the example project on [Github](https://github.com/codefresh-contrib/vault-sample-app).

The example application retrieves the system variable "password," from the pipeline and uses it to authenticate to a Redis database, but you are free to use any type of database of your choosing.

```java
        String password = System.getenv("password");
        String host = System.getProperty("server.host");

        RedisClient redisClient = new RedisClient(
                RedisURI.create("redis://" + password + "@" + host + ":6379"));
        RedisConnection<String, String> connection = redisClient.connect();
```

Also in the example application is a simple unit test that ensures we are able to read and write data to the database.

You cannot run the application locally, as it needs to run in the pipeline in order to use our environment variables to connect.

## Create the Pipeline

We will be running the following pipeline that contains three step types: a vault step, a [git-clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step, and a [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/).

{% include image.html 
lightbox="true" 
file="/images/examples/secrets/vault-pipeline.png" 
url="/images/examples/secrets/vault-pipeline.png" 
alt="Vault pipeline"
caption="Vault Pipeline"
max-width="100%" 
%}

You should be able to copy and paste this YAML in the in-line editor of the Codefresh UI.  It will automatically clone the project for you.

Note that you need to change the `VAULT_ADDR`, `VAULT_AUTH`, and `VAULT_AUTH_TOKEN` arguments under the first step to your respective values.

`codefresh.yml`
```yaml
version: "1.0"
stages:
  - "vault"
  - "clone"
  - "package"
steps:
  vault:
    title: Importing vault values...
    stage: "vault"
    type: vault
    arguments:
      VAULT_ADDR: 'http://<YOUR_VAULT_SERVER_IP>:<PORT>'
      VAULT_PATH: 'path/to/secret'
      VAULT_AUTH_TOKEN: '<YOUR_VAULT_AUTH_TOKEN>'
  main_clone:
    title: Cloning main repository...
    type: git-clone
    arguments:
      repo: 'codefresh-contrib/vault-sample-app'
      git: github
    stage: clone
  package_jar:
    title: Packaging jar and running unit tests...
    stage: package
    arguments:
      image: maven:3.5.2-jdk-8-alpine
      working_directory: ./
      commands:
      - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository -Dserver.host=my-redis-db-host clean package
    services:
      composition:
        my-redis-db-host:
          image: 'redis:4-alpine'
          command: 'redis-server --requirepass $password'
          ports:
            - 6379
```

The above pipeline does the following:

1. Imports the key-value pairs from the Vault server and exports them into the pipeline under `/meta/env_vars_to_export`.
2. Clones the main repository (note the special use of naming the step `main_clone`).  This ensures that all subsequent commands are run [inside the project that was checked out]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/#basic-clone-step-project-based-pipeline).
3. The last step, `package_jar`, does a few special things to take note of:
   - Spins up a [Service Container]({{site.baseurl}}/docs/codefresh-yaml/service-containers/) running Redis on port 6379 , and sets the password to the database using our exported environment variable
   - Sets `maven.repo.local` to cache Maven dependencies into the local codefresh volume to [speed up builds]({{site.baseurl}}/docs/learn-by-example/java/spring-boot-2/#caching-the-maven-dependencies)
   - Runs unit tests and packages the jar.  Note how you can directly refer to the service container's name (`my-redis-db-host`) when we set `server.host`

You will see that the variable was correctly exported to the pipeline by running a simple `echo` command:   
  {% include image.html 
  lightbox="true" 
  file="/images/examples/secrets/vault-pipeline2.png" 
  url="/images/examples/secrets/vault-pipeline2.png" 
  alt="Vault pipeline Variable"
  caption="Vault Pipeline Variable"
  max-width="100%" 
  %}
  
## What to Read Next

- [Git-clone Step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
- [Freestyle Step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
- [Service Containers]({{site.baseurl}}//docs/codefresh-yaml/service-containers/)
