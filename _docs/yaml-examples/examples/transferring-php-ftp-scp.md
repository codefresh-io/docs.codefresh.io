---
title: "Transferring Applications via ftp and scp"
description: "Deploying a Php Application to a VM using ftp and scp"
group: yaml-examples
sub_group: examples
toc: true
---

## Prerequisites

- A [free Codefresh account](https://codefresh.io/docs/docs/getting-started/create-a-codefresh-account/)
- A remote machine with an ftp server and ssh setup (ensure that your ftp directory, I.e., `/srv/ftp/pub` has the proper write permissions for the ftp user) 

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

You will need to modify the file, `ftp-commands.txt` with your own values to run this with the pipeline:

```text
open <HOST>
user <USER> <PASSWORD>
mkdir php-composer-sample-app
cd php-composer-sample-app
prompt
mput "*.*"
bye
```
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
  - "ftp transfer"
  - "scp transfer"
steps:
  main_clone:
    title: "Cloning main repository..."
    type: "git-clone"
    repo: "anna-codefresh/php-composer-sample-app"
    git: "github"
    stage: "clone"
  collect_dependencies:
    title: "Collecting Php dependencies..."
    type: "freestyle"
    image: "composer:1.9.3"
    commands:
      - "composer install --ignore-platform-reqs --no-interaction --no-plugins --no-scripts --prefer-dist"
      - ls
    stage: "install"
  file_transfer:
    type: parallel
    stage: transfer
    steps:
      ftp_transfer:
        title: "Transferring application to VM via ftp..."
        type: "freestyle" 
        image: "dockito/ftp-client:latest"
        working_directory: "./"
        commands:
          - "ftp -p -n < ftp-commands.txt"
      scp_transfer:
        title: "Transferring application to VM via scp..."
        type: "freestyle" 
        image: "ictu/sshpass:latest"
        working_directory: "./"
        environment:
          - USER=<USER>
          - HOST=<SERVER.IP.ADDRESS>
          - PASSWORD=<PASSWORD>
        commands:
          - "echo | ssh-keygen -P '' -t rsa"
          - "sshpass -p $PASSWORD ssh-copy-id -i /root/.ssh/id_rsa.pub -o StrictHostKeyChecking=no $USER@$HOST"
          - "scp -r ../php-composer-sample-app $USER@$HOST:</path/to/directory>"
```
This pipeline does the following:

1. Clones the main repository (note the special use of naming the step `main_clone`).  This ensures that all subsequent commands are run [inside the project that was checked out]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/#basic-clone-step-project-based-pipeline).
2. A [freestyle step]($$site.baseurl}}/docs/codefresh-yaml/steps/freestyle/) that installs the necessary Php dependencies for our application
3. A set of steps that run in [parallel]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/):
   - A  freestyle step that transfers our application via ftp 
   - A second freestyle step that generates an ssh key, copies it over to the remote VM, and uses scp to transfer our application (note for this step you will need to modify the environment variables, in addition to the path you want the application to end up in on the target host).

## What to Read Next

- [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
- [Parallel Steps]({{site.baseurl}}/docs/codefresh-yaml/advanced-workflows/)


