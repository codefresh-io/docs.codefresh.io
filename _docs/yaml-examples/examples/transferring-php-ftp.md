---
title: "Transferring Applications via FTP"
description: "Deploying a Php Application to a VM using FTP"
group: yaml-examples
sub_group: examples
toc: true
---

## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
- A remote machine with an ftp server and ssh setup (ensure that your ftp directory, I.e., `/srv/ftp/pub` has the proper write permissions for the ftp user) 

>Note that as you may already know, FTP is extremely insecure as it relies on plain-text passwords and usernames, making data very vulnerable to sniffing.  A more secure solution would be to use SFTP or SCP.

## The Example Php Project

The example project can be found on [Github](https://github.com/anna-codefresh/php-composer-sample-app).  The application is a simple Php application that displays an example timer.

{% include image.html 
lightbox="true" 
file="/images/learn-by-example/php/test-environment.png"
url="/images/learn-by-example/php/test-environment.png"
alt="Example Php Application"
caption="Example Php Application"
max-width="90%"
%}

## Create the Pipeline

Our pipeline will contain four stages:

- A stage for cloning
- A stage for packaging
- A stage for transferring files

{% include image.html 
lightbox="true" 
file="/images/examples/php-file-transfer/pipeline.png"
url="/images/examples/php-file-transfer/pipeline.png"
alt="Codefresh UI Pipeline View"
caption="Codefresh UI Pipeline View"
max-width="90%"
%}

Here is the entire pipeline:

```yaml
# More examples of Codefresh YAML can be found at
# https://codefresh.io/docs/docs/yaml-examples/examples/

version: "1.0"
# Stages can help you organize your steps in stages
stages:
  - "clone"
  - "install"
  - "transfer"
steps:
  clone:
    title: "Cloning main repository..."
    type: "git-clone"
    arguments:
      repo: "anna-codefresh/php-composer-sample-app"
      git: "github"
    stage: "clone"
  install_dependencies:
    title: "Collecting Php dependencies..."
    type: "freestyle"
    working_directory: "./php-composer-sample-app"
    arguments:
      image: "composer:1.9.3"
      commands:
        - "composer install --ignore-platform-reqs --no-interaction --no-plugins --no-scripts --prefer-dist"
    stage: "install"
  steps:
    ftp_transfer:
    title: "Transferring application to VM via ftp..."
    type: "freestyle" 
    working_directory: "./php-composer-sample-app"
    arguments:
      image: "dockito/lftp-client:latest"
      environment:
        - USER=<USER>
        - PASSWORD=<PASSWORD>
        - HOST=<HOST>
        - PUB_FTP_DIR=<PATH/TO/DIR>
      commands:
        - lftp -u $USER,$PASSWORD -e "cd $PUB_FTP_DIR; mkdir php-composer-sample-app; cd php-composer-sample-app; mput "*.*"; bye" $HOST
    stage: "transfer"
```
This pipeline does the following:

1. A [git-clone]({{$site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step that clones the main repository
2. A [freestyle step]($$site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that installs the necessary Php dependencies for our application
3. A freestyle step that transfers our application via ftp 

## What to Read Next

- [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
- [Git-clone Step]({{$site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
- [Freestyle Step]($$site.baseurl}}/docs/codefresh-yaml/steps/freestyle/)


