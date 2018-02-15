---
layout: docs
title: "Populate a database with existing data"
description: ""
group: yaml-examples
sub_group: examples
redirect_from:
  - /docs/populate-a-database-with-existing-data
toc: true
---
In case you are running a [composition step]({{ site.baseurl }}/docs/codefresh-yaml/steps/composition-1/), it will be run by default from the repository working directory. This means that you should be able to do anything you do locally from your repository.

## Postgres

{{site.data.callout.callout_info}}
##### Official repository of Docker postgres image

{% raw %}[https://hub.docker.com/\_/postgres/](https://hub.docker.com/_/postgres/){:target="_blank"}{% endraw %}
{{site.data.callout.end}}

- Сommit database files into the source control repository
- Сreate a docker image with the database contents

  `YAML`
{% highlight yaml %}
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
{% endhighlight %}

The `- /my/own/datadir:/data/db` part of the command mounts the `/my/own/datadir` directory from the underlying host system as `/data/db` inside the container, where Postgres by default will write its data files. 

{{site.data.callout.callout_info}}
##### Example of repository

Just head over to the example [**repository**](https://github.com/codefreshdemo/example_nodejs_postgres/tree/dataset){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}

{{site.data.callout.callout_warning}}

To create the folder `./data` locally you can just build and run this [**docker-compose.yml**](https://github.com/codefreshdemo/example_nodejs_postgres/blob/dataset/docker-compose-test.yml){:target="_blank"} locally.
Also when using specifically postgres, you have another option.
You can put `.sql` files inside `/docker-entrypoint-initdb.d` folder and it will run them when the container starts. See more info about it under section `How to extend this image` [https://hub.docker.com/\_/postgres/](https://hub.docker.com/_/postgres/){:target="_blank"}
{{site.data.callout.end}}

  `YAML`
{% highlight yaml %}
  unit_test:
    type: composition
    working_directory: {% raw %}${{main_clone}}{% endraw %}
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
        image: your/image
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
{% endhighlight %}

## Mongo

{{site.data.callout.callout_info}}
##### Official repository of Docker mongo image

[https://hub.docker.com/\_/mongo/](https://hub.docker.com/_/mongo/){:target="_blank"}
{{site.data.callout.end}}

- Сommit database files into the source control repository
- Сreate a docker image with the database contents

  `YAML`
{% highlight yaml %}
        mongo:
          image: mongo
          volumes:
            - /my/own/datadir:/data/db
{% endhighlight %}

The - `/my/own/datadir:/data/db` part of the command mounts the `/my/own/datadir` directory from the underlying host system as /data/db inside the container, where MongoDB by default will write its data files.

{{site.data.callout.callout_info}}
##### Example of repository

Just head over to the example [**repository**](https://github.com/codefreshdemo/example_nodejs_mongo/tree/dataset){:target="_blank"} in Github. 
{{site.data.callout.end}}

{{site.data.callout.callout_warning}}
To create the folder `./data` locally you can just build and run this [docker-compose.yml](https://github.com/codefreshdemo/example_nodejs_mongo/blob/dataset/docker-compose.yml){:target="_blank"} local 
{{site.data.callout.end}}

  `YAML`
{% highlight yaml %}
 unit_test:
    type: composition
    working_directory: {% raw %}${{build_step}}{% endraw %}
    composition:
      version: '2'
      services:
        mongo:
          image: mongo
          volumes:
            - ./data:/data/db
    composition_candidates:
      test:
        image: your/image
        links:
          - mongo
        command: bash -c "/src/test-script.sh"
        environment:
          - MONGO_PORT=27017
          - MONGO_HOST=mongo
          - MONGO_DB=demo
{% endhighlight %}
