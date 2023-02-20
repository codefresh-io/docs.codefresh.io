---
title: "Deploy to VM via FTP"
description: "Deploying a PHP application to a VM using FTP"
group: example-catalog
sub_group: cd-examples
redirect_from:
  - /docs/yaml-examples/examples/transferring-php-ftp/
  - /docs/learn-by-example/java/spring-mvc-jdbc-template/
toc: true
---

## Prerequisites

- A [Codefresh account]- A [Codefresh account]({{site.baseurl}}/docs/administration/account-user-management/create-codefresh-account/)
- A remote machine with an FTP server and SSH setup (ensure that your FTP directory, I.e., `/srv/ftp/pub` has the proper write permissions for the FTP user).

>Note that as you may already know, FTP is extremely insecure as it relies on plain-text passwords and usernames, making data very vulnerable to sniffing.  A more secure solution would be to use SFTP or SCP.

## Example PHP project

The example project can be found on [GitHub](https://github.com/codefresh-contrib/ftp-php-app){:target="\_blank"}.  The application is a simple PHP application that displays an example timer.

{% include image.html 
lightbox="true" 
file="/images/examples/php-file-transfer/test-environment.png"
url="/images/examples/php-file-transfer/test-environment.png"
alt="Example PHP Application"
caption="Example PHP Application"
max-width="90%"
%}

## Create the pipeline

Our pipeline includes four stages:

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

`codefresh.yml`
{% highlight yaml %}
{% raw %}
# More examples of Codefresh YAML can be found at
# https://codefresh.io/docs/docs/example-catalog/

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
      repo: "codefresh-contrib/ftp-php-app"
      git: "github"
    stage: "clone"
  install_dependencies:
    title: "Collecting Php dependencies..."
    type: "freestyle"
    working_directory: "./ftp-php-app"
    arguments:
      image: "composer:1.9.3"
      commands:
        - "composer install --ignore-platform-reqs --no-interaction --no-plugins --no-scripts --prefer-dist"
    stage: "install"
  steps:
    ftp_transfer:
    title: "Transferring application to VM via ftp..."
    type: "freestyle" 
    working_directory: "./ftp-php-app"
    arguments:
      image: "dockito/lftp-client:latest"
      environment:
        - USER=<USER>
        - PASSWORD=<PASSWORD>
        - HOST=<HOST>
        - PUB_FTP_DIR=<PATH/TO/DIR>
      commands:
        - lftp -e "set ftp:use-site-utime2 false; mirror -x ^\.git/$ -X flat-logo.png -p -R ftp-php-ap $PUB_FTP_DIR/ftp-php-app; exit" -u $USER,$PASSWORD $HOST
    stage: "transfer"
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the main repository through a [Git-clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/).
2. Installs the necessary PHP dependencies for our application through a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/).
3. Transfers our application via FTP through another freestyle step. Note that you will need to change the environment variables to your respective values, either in the YAML itself (above), or through the pipeline settings:

{% include image.html 
lightbox="true" 
file="/images/examples/php-file-transfer/variables.png"
url="/images/examples/php-file-transfer/variables.png"
alt="Codefresh Environment Variables"
caption="Codefresh Environment Variables"
max-width="90%"
%}

## Related articles
[CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#cd-examples)  
[Codefresh YAML for pipeline definitions]({{site.baseurl}}/docs/pipelines/what-is-the-codefresh-yaml/)  
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[How Codefresh pipelines work]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/)


