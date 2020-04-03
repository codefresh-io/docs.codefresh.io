---
title: "Decryption with Mozilla SOPS"
description: "Store secrets in your repository and decrypt them using Mozilla SOPS"
group: yaml-examples
sub_group: examples
toc: true
---

## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
- A public and private GnuGP key pair
- A credentials yaml, that is encrypted using Mozilla SOPS, and stored in your repository

## The Example Java Application

You can find the example project on [Github](https://github.com/codefresh-contrib/mozilla-sops-app).

The example application retrieves the system variable "password," from the pipeline and uses it to authenticate to a Redis database, but you are free to use any type of database of your choosing.

```java
        String password = System.getenv("password");
        String host = System.getProperty("server.host");

        RedisClient redisClient = new RedisClient(
                RedisURI.create("redis://" + password + "@" + host + ":6379"));
        RedisConnection<String, String> connection = redisClient.connect();
```

Also in the example application is a simple unit test that ensures we are able to read and write data to the database.

An encrypted credentials file is stored in the repository (along with a public key):

`credentials.yaml`
```yaml
password: ENC[AES256_GCM,data:Jsth2tY8GhLgj6Jct27l,iv:3vcKVoD5ms29R5SWHiFhDhSAvvJTRzjn9lA6woroUQ8=,tag:OjkLvcHxE4m5RSCV7ej+FA==,type:str]
sops:
    kms: []
    gcp_kms: []
    azure_kv: []
    lastmodified: '2020-03-30T19:12:49Z'
    mac: ENC[AES256_GCM,data:jGMTkFhXjgGMdWBpaSWjGZP6fta3UuYjEsnqziNELQZ2cLScT9v+GKg/c8iJYv1Gfiz3aw4ivYYrWzwmZehIbPHaw3/XBv/VRCQhzRWYKaf6pPFUXIS7XALSf9L9VbGOXL/CGPRae3t3HpaOor+knd6iQk2WR3K9kSeib4RBSCE=,iv:WSP8hBwaBv3ymTGltBOaVVC1sT08IG4hwqESlG8rN9w=,tag:3hZvCuql+ASWe/Mm5Bl7xg==,type:str]
    pgp:
    -   created_at: '2020-03-30T19:12:49Z'
        enc: |
            -----BEGIN PGP MESSAGE-----
            hQGMA9TqgBq6RQVRAQv/UouNaHfxkJ5PwXLvda97Fgj/2ew2VXPAlAnLvoGvTsb2
            U4GXcaE7c4mYf7wSKF9k/F0FZTUEnd3CRji/OqjrNyvj5zI/9KGRABCKvzjsx+ZG
            JolVnDifHl78Mor1CUPQ4JXasHKbVSlNLMGgDHIsvpeC7f7pIi8YDUDIa3/zXhFK
            jcKzz4nlrW1Ph8zukmQk49Xvv6+DFj2NTptOB3U6mh79RCdnyCSRHxA3f0X00Pi5
            g0p5x46S5E04uC2wXrZv8i/gyQbLHxwjmdbLq+P1Peu4/i9eSZZOpx0mc1KJ2mjr
            oKRvgnUFz3xuYrSNzjC1vM01UbuSytlwx+S3J7VVLPSZRso1sbgv2+ylUOAHS+gZ
            64uL0j/BZrF4wZI8y8zr0nJ6cZLiiF3LeXhfcuWJJ7+5p1OBEvfO+sWorLahIZTw
            pogYPDpz4rGnrJRKBkNsVlYuUG8aNerIfhEBr6n//VJtt7QXTEXraLCTt4a6z/Fl
            R6YSeNCKWQlURrTfm4Kv0lwBzMTLUb+Fg3HO8ShhiE9/2dKTSJkRJMVXRDp22Fm1
            vO/wMFUjg6Dkrj1LVqQ9zcXc5QElgc4mF/V7SazacbQ7/g67tVtUrTit9LXgR9A0
            k7wU5iT5oWLJtWwpkA==
            =Il2p
            -----END PGP MESSAGE-----
        fp: C70833A85193F72C2D72CB9DBC109AFC69E0185D
    encrypted_regex: password
    version: 3.5.0
```
You cannot run the application locally, as it needs to run in the pipeline in order to use our environment variables to connect.

## Create the Pipeline

Our pipeline will contain four stages:

- A stage for cloning
- A stage for importing the private/public keypair
- A stage for decrypting the credentials file
- A stage for packaging our jar and running unit tests

{% include image.html 
lightbox="true" 
file="/images/examples/secrets/mozilla-sops-pipeline.png"
url="/images/examples/secrets/mozilla-sops-pipeline.png"
alt="Codefresh UI Pipeline View"
caption="Codefresh UI Pipeline View"
max-width="90%"
%}

First, you will need to add a pipeline variable, `PRIV_KEY`, for your private key.  You can do that in the UI by navigating to the in-line YAML editor and to the right-hand side, you will find the **Variables** tab:

{% include image.html 
lightbox="true" 
file="/images/examples/secrets/mozilla-sops-pipeline-vars.png"
url="/images/examples/secrets/mozilla-sops-pipeline-vars.png"
alt="Mozilla SOPS Pipeline Variables"
caption="Pipeline Variables"
max-width="90%"
%}

You can also add this [directly in the YAML itself]({{site.baseurl}}/docs/how-to-guides/migrating-from-travis-ci/#environment-variables).

Here is the entire pipeline:

`codefresh.yaml`
{% highlight yaml %}
{% raw %}
# More examples of Codefresh YAML can be found at
# https://codefresh.io/docs/docs/yaml-examples/examples/

version: "1.0"
# Stages can help you organize your steps in stages
stages:
  - "clone"
  - "import"
  - "decrypt"
  - "package"

steps:
  clone:
    title: "Cloning repository..."
    type: "git-clone"
    stage: "clone"
    arguments:
      repo: "codefresh-contrib/mozilla-sops-app"
      revision: "master"

  import_keys:
    title: "Importing gpg keys..."
    type: "freestyle"
    stage: "import"
    working_directory: '${{clone}}'
    arguments:
      image: "vladgh/gpg"
      commands:
        - gpg --import public.key
        - echo -e "${{PRIV_KEY}}" > private.key
        - gpg --allow-secret-key-import --import private.key

  decrypt_password:
    title: "Decrypting password..."
    type: "freestyle"
    working_directory: "${{clone}}"
    stage: "decrypt"
    arguments:
      image: "mozilla/sops"
      commands:
        - cp -r /codefresh/volume/.gnupg /root/.gnupg
        - cf_export password=$(sops --decrypt --extract '["password"]' credentials.yaml)

  package_jar:
    title: "Packaging jar and running unit tests..."
    working_directory: ${{clone}}
    stage: "package"
    arguments:
      image: "maven:3.5.2-jdk-8-alpine"
      commands:
        - mvn -Dmaven.repo.local=/codefresh/volume/m2_repository -Dserver.host=my-redis-db-host clean package
    services:
      composition:
        my-redis-db-host:
          image: 'redis:4-alpine'
          command: 'redis-server --requirepass $password'
          ports:
            - 6379
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. A [git-clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step that clones the main repository
2. A [freestyle step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that uses a GPG image and imports the public and private key pair
3. A freestyle step that decrypts the credentials file.  At this step, SOPS is looking for the .gnupg directory (where the keyring is stored) under /root.  We need to copy it from the [Codefresh Volume]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/#custom-volumes), as /root is not saved between containers.
4. The last step, `package_jar`, does a few special things to take note of:
   - Spins up a [Service Container]({{site.baseurl}}/docs/codefresh-yaml/service-containers/) running Redis on port 6379 , and sets the password to the database using our exported environment variable
   - Sets `maven.repo.local` to cache Maven dependencies into the local codefresh volume to [speed up builds]({{site.baseurl}}/docs/learn-by-example/java/spring-boot-2/#caching-the-maven-dependencies)
   - Runs unit tests and packages the jar.  Note how you can directly refer to the service container's name (`my-redis-db-host`) when we set `server.host`

## What to Read Next

- [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
- [Git-clone Step]({{$site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
- [Freestyle Step]({{site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)
- [Vault Secrets in the Pipeline]({{site.baseurl}}/docs/yaml-examples/examples/vault-secrets-in-the-pipeline/)

