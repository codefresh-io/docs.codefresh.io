---
title: "Populate database with existing data"
description: "Preload test data before integration tests"
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/populate-a-database-with-existing-data-copied/
toc: true
old_url: /docs/populate-a-database-with-existing-data-copied
was_hidden: true
---
In another example, we saw how to run [integration tests with a database]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-postgres/) such as PostgreSQL. Sometimes however, the integration tests require the database to already have some test data beforehand. With Codefresh you can use the [setup block]({{site.baseurl}}/docs/pipelines/service-containers/#preloading-data-to-databases) in service containers to preload data to a database.


{% include image.html 
lightbox="true" 
file="/images/examples/integration-tests/preload-data-to-db.png"
url="/images/examples/integration-tests/preload-data-to-db.png"
alt="Preloading test data to a DB"
caption="Preloading test data to a DB"
max-width="90%"
%}

In this pipeline the database is populated with data from an SQL file.

## Example PostgreSQL project

You can see the example project at [https://github.com/codefresh-contrib/preload-db-integration-tests](https://github.com/codefresh-contrib/preload-db-integration-tests){:target="\_blank"}. The repository contains a simple integration test and an SQL file that inserts test data.

The SQL file creates a single table in the database:

 `preload.sql`
{% highlight sql %}
{% raw %}
CREATE TABLE link (
   ID serial PRIMARY KEY,
   url VARCHAR (255) NOT NULL,
   name VARCHAR (255) NOT NULL,
   description VARCHAR (255),
   rel VARCHAR (50)
);

INSERT INTO link (url, name)
VALUES
 ('http://www.google.com','Google'),
 ('http://www.azure.microsoft.com','Azure'),
 ('http://www.codefresh.io','Codefresh');
{% endraw %}
{% endhighlight %}


To work with the project locally, you need to have `docker`, `golang` and `postgres-client` installed on your workstation first.

```
$ docker run -p 5432:5432 postgres:11.5
```

Then open another terminal and load the test data:

```
$ psql -h localhost -U postgres < testdata/preload.sql
```

A Postgres instance is now running at `localhost:5432` and you can run the tests with:

```
$ go test -v
```


## Create a pipeline the preloads test data to PostgreSQL

Here is the whole pipeline:

 `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: "1.0"
stages:
- prepare
- package
- test
steps:
  main_clone:
    type: "git-clone"
    description: "Cloning main repository..."
    repo: "codefresh-contrib/preload-db-integration-tests"
    revision: "master"
    title: "Checking out source code"
    git: github
    stage: prepare
  package_my_app:
    stage: package
    image: 'golang:1.13'
    title: "Compile code"
    commands:
      - 'go build'
  run_my_db_tests:
    stage: test
    image: 'golang:1.13'
    title: "Running integration tests"
    commands:
      - 'go test -v'
    environment:
    - POSTGRES_HOST=my_postgresql_db
    services:
      composition:
        my_postgresql_db:
          image: postgres:11.5
          ports:
            - 5432 
      readiness:
        timeoutSeconds: 30
        initialDelaySeconds: 10
        periodSeconds: 15
        image: 'postgres:11.5'
        commands:
          - "pg_isready -h my_postgresql_db -U postgres"
      setup:
        image: 'postgres:11.5'
        commands:
          - "psql -h my_postgresql_db -U postgres < /codefresh/volume/preload-db-integration-tests/testdata/preload.sql"
{% endraw %}
{% endhighlight %}

This pipeline does the following:

1. Clones the source code through a [Git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/).
1. Compiles the code that runs `go build` through a [freestyle step]({{site.baseurl}}/docs/pipelines/steps/freestyle/). 
1. Runs the tests while launching a [service container]({{site.baseurl}}/docs/pipelines/service-containers/) for an active PostgreSQL instance. Before tests are run, we launch another container with the `psql` executable to load database data.


> In this simple example, we use `psql` to preload the database. In a production application you might also use dedicated db tools such as [liquibase](https://hub.docker.com/r/liquibase/liquibase){:target="\_blank"} or [flyway](https://hub.docker.com/r/flyway/flyway){:target="\_blank"} or other command line tools that communicate with your database.

Notice that we also use the `readiness` property in the testing phase so that we can verify PostgreSQL is ready and listening, before running the tests. The exact order of events is:

1. Codefresh launches `postgres:11.5` at port 5432. 
1. It then launches another container in the same network with `pg_isready` in order to wait for the DB to be up. 
1. Then it launches a third container with `psql` to preload data. 
1. Finally, it launches a container with `golang:1.13` to run the actual tests.

All containers are discarded after the pipeline has finished.

## Related articles
[CI pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  
[Integration test example]({{site.baseurl}}/docs/example-catalog/ci-examples/run-integration-tests/)  
[Integration tests with Postgres]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-postgres/)  
[Integration tests with MySQL]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-mysql/)  
[Integration tests with Mongo]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-mongo/)  
[Integration tests with Redis]({{site.baseurl}}/docs/example-catalog/ci-examples/integration-tests-with-redis/)  



