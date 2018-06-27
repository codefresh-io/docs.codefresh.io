---
title: "Debugging Codefresh builds locally"
description: ""
group: troubleshooting
sub_group: common-issues
toc: true
---

Codefresh provides detailed logs for each pipeline that show all the execution results. If however, you wish to run
a build step locally you can easily install Docker on your workstation and simulate the same executions Codefresh performs on its platform runners.

## Prerequisites 

You need to have Docker installed on your local workstation. You can follow the [official instructions](https://docs.docker.com/install/) to install it. Notice that if you use Linux, the Docker version offered by your native
package manager is not always the latest version.

Once docker is installed, check that it runs correctly with:

```
docker run hello-world
```

You should get a short welcome message.

## Simulating a Codefresh build step


Codefresh is running each build step in the context of a Docker container. To fully replicate a build step locally you need to:

1. use the same docker image as a build context
1. mount the shared codefresh volume at `/codefresh/volume`
1. place your git source project inside the volume
1. execute the same command defined in your `codefresh.yml` file

For more details on how Codefresh runs build steps see the [introduction to pipelines]({{ site.baseurl }}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines).

Detailed steps are shown below.

### Step 1 - Clone or update locally your source project

Clone your git repository and checkout the branch the build in Codefresh failed on.

If your repository is already cloned locally, make sure to run `git pull` so your local cloned
repository will be updated with the latest changes (make sure you have checked out 
the correct branch first).

### Step 2 - Login to your Docker registry

If the docker image that you use is a public one (such as node, python, maven, etc.) you can skip this step.

If the docker image you use is a private one, you should log in to the respective registry from the command line.

For example if your image is in the Codefresh Docker registry, you can [create a Token]({{ site.baseurl }}/docs/docker-registries/codefresh-registry/#use-codefresh-registry-locally) from the Codefresh UI 
and use it locally.

Check the documentation of your own Docker registry (e.g. GRC, Quay.io, Bintray) on how to achieve this.

The docker login command should return with a success message.

### Step 3 - Mount your git project inside the container 


To mount your project inside the Docker container run the following command:

```
docker run -it -v $(pwd):/codefresh/volume/<your_repo_name> <image_name_and_tag> /bin/bash
```

* Replace `<your_repo_name>` with the name of your git project
* Replace `<image_name_and_tag>` with the full name of your Docker image

In the case of the Codefresh registry you can easily get the name from the Codefresh UI

{% include image.html 
lightbox="true" 
file="/images/troubleshooting/obtain-docker-image.png" 
url="/images/troubleshooting/obtain-docker-image.png"
alt="codefresh_add_your_first_service"
max-width="60%"
caption="Getting the full name of a Docker image (click image to enlarge)" 
%}

Notice that if your image does not have bash available you can use `/bin/sh` instead, as the last part of the command.

### Step 4 - Change the work directory to the root project

The docker command above will put you in a shell inside the container.

Now you’re running within the container with your repository mounted as a volume under
`/codefresh/volume/<your_repo_name>`. You make sure you’re running the
same commands that you’re using in Codefresh from the same working_directory that
your failed step is using.

Working directory refers to your starting point within the container. By default (if you’re
not referring to it in the Codefresh step) it’ll be your cloned repository path which is
`/codefresh/volume/<your_repo_name>`.

Navigate to your working directory within the container:

```
cd /codefresh/volume/<your_repo_name>
```

Of your build step uses another working directory then use that one instead (e.g. `/app`, `/opt`)

### Step 5 - Execute the build command

Finally we execute the same build command that was defined in the `codefresh.yml` file.

This process fully simulates debugging of Codefresh steps locally in your machine to resolve issues in
your code that may appear during the CI process.


## Full example

Let's assume that we have a Python/Flask application that fails during unit-tests in Codefresh and we want to run the tests locally (without actually installing python on the workstation, docker is enough). The name of the project is `python-flask-example-app` in Github.

First we login to the Codefresh Registry locally using a token that can be obtained from the [User settings]({{ site.baseurl }}/docs/docker-registries/codefresh-registry/#use-codefresh-registry-locally).

```
$ docker login r.cfcr.io -u kostis-codefresh -p <TOKEN_HERE>
Login Succeeded

```

Then we find the image from the UI, in our case it is `r.cfcr.io/kostis-codefresh/kostis-codefresh/python-flask-sampleapp:master-b168342`.

We make sure that we are in the correct branch in our local workstation, and then we start the docker container
mounting the source code as well:

```
$ cd /my-workspace/python-flask-example
$ git checkout master
$ git pull
$ docker run -it -v $(pwd):/codefresh/volume/python-flask-example  r.cfcr.io/kostis-codefresh/kostis-codefresh/python-flask-sampleapp:master-b168342 bash
#

```

Finally we enter the correct directory and run our unit tests:

```
# cd /codefresh/volume/python-flask-example
# python setup.py test

```

Now the unit tests will run and we can see their results in detail.







