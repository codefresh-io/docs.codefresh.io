---
layout: docs
title: "Examples"
description: ""
group: codefresh-yaml
redirect_from:
  - /docs/examples
  - /docs/codefresh-yaml-examples
toc: true
old: /docs/examples
was_hidden: true
---

## An Opening Note

{{site.data.callout.callout_info}}
##### Remark

The *perform a Git clone operation* is not executed in most of the examples because Codefresh automatically adds a Git clone step, named ```initial-clone```, in the beginning of the pipeline to clone your service’s repository. 
{{site.data.callout.end}}

## Build an Image - Dockerfile in Root Directory
If your repository contains a ```Dockerfile``` in the root directory, you can use the following YAML file to build an image.

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  build-the-image:
    type: build
    description: Builds my service
    image-name: myuser/myservice
    tag: develop
    build-arguments:
      - port=9000
{% endraw %}
{% endhighlight %}

## Build an Image - Specify Dockerfile Location
If your ```Dockerfile``` isn’t maintained in the root directory of your repository, you can specify its location relative to the root directory using the ```dockerfile``` attribute.

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  build-the-image:
    type: build
    description: Builds my service
    dockerfile: dockerfiles/Dockerfile.prod
    image-name: myuser/myservice
    tag: develop
    build-arguments:
      - port=9000
{% endraw %}
{% endhighlight %}

## Build an Image - From a Different Git Repository
In this example we specify a `git-clone` step to clone a different Git repository and build our image from it instead.

{{site.data.callout.callout_warning}}
`Git-clone` step not required and added automatically 
{{site.data.callout.end}}

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  clone-a-repo:
    type: git-clone
    repo: https://github.com/myusername/myrepo.git
    credentials:
      username: subject
      password: credentials
  
  build-the-image:
    type: build
    working-directory: ${{clone-a-repo}}
    image-name: myuser/myservice
    tag: develop
{% endraw %}
{% endhighlight %}
 
You can also utilize the [User Provided Variables](doc:variables#section-user-provided) instead of hard-coding the credentials within the descriptor.

## Build and Push an Image
In this example, the **push** step references the image built by the **build** step using the ```candidate``` attribute.
Make sure to configure your account’s Docker registry details and credentials before you execute a push.

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  build-the-image:
    type: build
    image-name: myuser/myservice
    tag: develop

  push-the-image:
    type: push
    candidate: ${{build-the-image}}
    tag: latest
{% endraw %}
{% endhighlight %}

## Run Unit Tests
Using the **freestyle** step, you can execute a series of shell commands. The most common use case is to run unit tests on your code.

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  test-all-the-code:
    image-name: node:5
    working-directory: ${{initial-clone}}
    commands:
      - npm install gulp -g 
      - npm install
      - gulp unit_test
{% endraw %}
{% endhighlight %}

## Run Integration Tests
Using the **composition** step, you can run a more complex interaction of services; For example – run integration tests on an image that was built.

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  build-the-image:
    type: build
    image-name: myuser/myservice
    tag: develop
  
  integration-test:
    type: composition
    composition:
      version: '2'
      services:
        db:
          image: postgres
    composition-candidates:
      test:
        image: ${{build-the-image}}
        command: gulp integration_test
{% endraw %}
{% endhighlight %}

## Run unit tests with composition on example app + mysql

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
    build-step:
        type: build
        image-name: myuser/myservice
        dockerfile: Dockerfile
        tag: latest

    unit-test:
        type: composition
        working-directory: ${{initial-clone}}
        composition:
            version: '2'
            services:
              db:
                image: mysql:latest
                ports:
                  - 3306
                environment:
                  MYSQL_ROOT_PASSWORD: $root_password
                  MYSQL_USER: $user
                  MYSQL_PASSWORD: $password
                  MYSQL_DATABASE: $database
        composition-candidates:
            test:
              image: ${{build-step}}
              command: bash -c 'sleep 30 && MYSQL_ROOT_PASSWORD=admin MYSQL_USER=my_user MYSQL_HOST=db MYSQL_PASSWORD=admin MYSQL_DATABASE=nodejs npm test'
        composition-variables:
              - root_password=admin
              - user=my_user
              - password=admin
              - database=nodejs
{% endraw %}
{% endhighlight %}

## Run composition on example app + postgres

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
    build-step-name:
        type: build
        image-name: myuser/myservice
        dockerfile: Dockerfile
        tag: latest
    launch-env:
        type: launch-composition
        composition:
          version: '2'
          services:
            app:
              image: 'myuser/myservice'
              links:
               - db
              ports:
               - 8080
            db:
              image: postgres
              ports:
               - 5432
{% endraw %}
{% endhighlight %}

## Run composition on example app + mongo

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
    build-step-name:
        type: build
        image-name: myuser/myservice
        dockerfile: Dockerfile
        tag: latest
    launch-env:
        type: launch-composition
        composition:
          version: '2'
          services:
            app:
              image: 'myuser/myservice'
              links:
               - mongo
              ports:
               - 8080
            mongo:
              image: mongo
{% endraw %}
{% endhighlight %}

## Run unit tests with composition on example app + mongo

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
    build-step:
        type: build
        image-name: myuser/myservice
        dockerfile: Dockerfile
        tag: latest

    unit-test:
        type: composition
        working-directory: ${{initial-clone}}
        composition:
            version: '2'
            services:
              db:
                image: mongo:latest
                ports:
                  - 27017
                environment:
                  - key=value
        composition-candidates:
            test:
              image: ${{build-step}}
              command: echo $(date)
        composition-variables:
              - key=value
{% endraw %}
{% endhighlight %}
