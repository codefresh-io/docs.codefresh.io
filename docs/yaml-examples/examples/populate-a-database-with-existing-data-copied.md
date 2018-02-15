---
layout: docs
title: "Populate a database with existing data - copied"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/populate-a-database-with-existing-data-copied
  - /docs/populate-a-database-with-existing-data-copied
toc: true
old_url: /docs/populate-a-database-with-existing-data-copied
was_hidden: true
---
In case you are running a [composition step]({{ site.baseurl }}/docs/codefresh-yaml/steps/composition-1/), it will be run by default from the repository working directory. This means that you should be able to do anything you do locally from your repository.

There are several ways to store data used by applications that run in Docker containers. We encourage users to familiarize themselves with the options available, including:
- Create a data directory on the host system (outside the container) and mount this to a directory visible from inside the container. This places the database files in a known location on the host system, and makes it easy for tools and applications on the host system to access the files. The downside is that the user needs to make sure that the directory exists, and that e.g. directory permissions and other security mechanisms on the host system are set up correctly.

## Postgres

{{site.data.callout.callout_info}}
##### Official repository of Docker postgres image

[https://hub.docker.com/\_/postgres/](https://hub.docker.com/_/postgres/){:target="_blank"} 
{{site.data.callout.end}}

- Create a data directory on a suitable volume on your host system, e.g. `/my/own/datadir`.
- Add the following volumes to postgres container

  `YAML`
{% highlight yaml %}
{% raw %}
postgres:
  image: postgres:latest
  ports:
    - 5432
  volumes:
    - /my/own/datadir:/var/lib/postgresql/data
  environment:
    POSTGRES_USER: $POSTGRES_USER
    POSTGRES_PASSWORD: $POSTGRES_PASSWORD
    POSTGRES_DB: $POSTGRES_DB
{% endraw %}
{% endhighlight %}

The - `/my/own/datadir:/data/db` part of the command mounts the `/my/own/datadir` directory from the underlying host system as `/data/db` inside the container, where Postgres by default will write its data files.

{{site.data.callout.callout_info}}
##### Example of repository 

Just head over to the example [__repository__](https://github.com/codefreshdemo/example_nodejs_postgres/tree/dataset){:target="_blank"} in Github.
{{site.data.callout.end}}
 
{{site.data.callout.callout_warning}}
To create the folder `./data` locally you can just build and run this [docker-compose.yml](https://github.com/codefreshdemo/example_nodejs_postgres/blob/dataset/docker-compose-test.yml){:target="_blank"} locally
{{site.data.callout.end}}

  `YAML`
{% highlight yaml %}
{% raw %}
  unit_test:
    type: composition
    working_directory: ${{main_clone}}
    composition:
      version: '2'
      services:
        postgres:
          image: postgres:latest
          ports:
            - 5432
          volumes:
            - ./data:/var/lib/postgresql/data
          environment:
            POSTGRES_USER: $POSTGRES_USER
            POSTGRES_PASSWORD: $POSTGRES_PASSWORD
            POSTGRES_DB: $POSTGRES_DB
    composition_candidates:
      test:
        image: ${{build_step}}
        links:
          - postgres
        command: bash -c '/dataset/test-script.sh'
        environment:
          - POSTGRES_USER=$POSTGRES_USER
          - POSTGRES_PASSWORD=$POSTGRES_PASSWORD
          - POSTGRES_DB=$POSTGRES_DB
          - POSTGRES_HOST=$POSTGRES_HOST
    composition_variables:
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=postgres
      - POSTGRES_DB=my_db
      - POSTGRES_HOST=postgres
{% endraw %}
{% endhighlight %}

## Mongo

{{site.data.callout.callout_info}}
##### Official repository of Docker mongo image

[https://hub.docker.com/\_/mongo/](https://hub.docker.com/_/mongo/){:target="_blank"} 
{{site.data.callout.end}}

- Create a data directory on a suitable volume on your host system, e.g. /my/own/datadir.
- Add the following volumes to mongo container

  `YAML`
{% highlight yaml %}
{% raw %}
mongo:
  image: mongo
  volumes:
    - /my/own/datadir:/data/db
{% endraw %}
{% endhighlight %}

The - `/my/own/datadir:/data/db` part of the command mounts the `/my/own/datadir` directory from the underlying host system as `/data/db` inside the container, where MongoDB by default will write its data files.

{{site.data.callout.callout_info}}
##### Example of repository 

Just head over to the example [__repository__](https://github.com/codefreshdemo/example_nodejs_mongo/tree/dataset){:target="_blank"} in Github.
{{site.data.callout.end}}
 
{{site.data.callout.callout_warning}}
To create the folder `./data` locally you can just build and run this [docker-compose.yml](https://github.com/codefreshdemo/example_nodejs_mongo/blob/dataset/docker-compose.yml){:target="_blank"} locally
{{site.data.callout.end}}

  `YAML`
{% highlight yaml %}
{% raw %}
  unit_test:
    type: composition
    working_directory: ${{build_step}}
    composition:
      version: '2'
      services:
        mongo:
          image: mongo
          volumes:
            - ./data:/data/db
    composition_candidates:
      test:
        image: ${{build_step}}
        links:
          - mongo
        command: bash -c "/src/test-script.sh"
        environment:
          - MONGO_PORT=27017
          - MONGO_HOST=mongo
          - MONGO_DB=demo
{% endraw %}
{% endhighlight %}
