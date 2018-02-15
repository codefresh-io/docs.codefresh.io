---
layout: docs
title: "Integration Test"
description: ""
group: codefresh-yaml
sub_group: steps
redirect_from:
  - /docs/integration-test
toc: true
old_url: /docs/integration-test
was_hidden: true
---

The integration test step can help you run an integration using popular services, such as Redis, MySQL and MongoDB, and also using a Docker Composition as a means to execute finite commands in a more complex interaction of services.

  `YAML`
{% highlight yaml %}
{% raw %}
integration_test_step:
    type: integration-test
    preconfigured_services: [  redis, postgresql, mongodb, mysql, couchdb, rabbitmq, memcached ]
    services:
      cassandra:
        image: cassandra:2.1.17
        ports:
          - 7000
          - 7001
          - 9042
          - 7199
        environment:
          - CASSANDRA_RACK="test_rack"
    test:
      image: node:7-onbuild
      working_directory: ${{some_other_step}}
      commands:
        - npm install
        - npm run prepare-db
        - npm test full
{% endraw %}
{% endhighlight %}

{: .table .table-bordered .table-hover}
| Field                                   | Description                                                                                                                                                                                                                                                                                                                                                                    | Required/Optional/Default |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:--------------------------|
| `title`                                 | The free-text display name of the step.                                                                                                                                                                                                                                                                                                                                        | Optional                  |
| `description`                           | A basic, free-text description of the step.                                                                                                                                                                                                                                                                                                                                    | Optional                  |
| `working_directory`                     | The directory in which to search for the composition file. It can be an explicit path in the container's file system, or a variable that references another step. <br>The default is {% raw %} `${{main_clone}}` {% endraw %}.                                                                                                                                                 | Default                   |
| `preconfigured_services`                | This is a list containing the names of preconfigured services that will be executed in the context in the context of the composition.                                                                                                                                                                                                                                          | Optional                  |
| `services`                              | This is a minimal composition that will be run. It should be an inline YAML definition, containing services. Each service can including its image, ports and environment variables.                                                                                                                                                                                            | Optional                  |
| `test`                                  | The definition of the service to monitor, including the commands to execute and its working directory.                                                                                                                                                                                                                                                                         | Required                  |
| `fail_fast`                             | If a step fails, and the process is halted. The default value is `true`.                                                                                                                                                                                                                                                                                                       | Default                   |
| `when`                                  | Define a set of conditions that need to be satisfied in order to execute this step.<br>You can find more information in the [Conditional Execution of Steps]({{ site.baseurl }}/docs/codefresh-yaml/conditional-execution-of-steps/) article.                                                                                                          | Optional                  |
| `on_success`, `on_fail` and `on_finish` | Define operations to perform upon step completion using a set of predefined [Post-Step Operations]({{ site.baseurl }}/docs/codefresh-yaml/post-step-operations/).                                                                                                                                                                                      | Optional                  |

For more information about `services` and `test`, please check out the [Composition step]({{ site.baseurl }}/docs/codefresh-yaml/steps/composition-1).

Following are the supported services:

{: .table .table-bordered .table-hover}
| Service Name  | Default Version | Exposed Ports                | Comments                                                                                          |
|:--------------|:----------------|:-----------------------------|:--------------------------------------------------------------------------------------------------|
| mysql         | 5.7             | 3306                         | MYSQL_ROOT_PASSWORD=""                                                                            |
| postgresql    | 9.6             | 5432                         | POSTGRES_PASSWORD=""                                                                              |
| mariadb       | 10.1            | 3306                         | MYSQL_ROOT_PASSWORD=""                                                                            |
| mongodb       | 3.4             | 27017                        |                                                                                                   |
| couchdb       | 1.6             | 5984                         |                                                                                                   |
| rabbitmq      | 3.6             | 15672                        | RABBITMQ_DEFAULT_USER='guest' <br> RABBITMQ_DEFAULT_PASS='guest' <br> RABBITMQ_DEFAULT_VHOST='/'= |
| memcached     | 1.4             | 11211                        |                                                                                                   |
| redis         | 3.2             | 6379                         | Comments                                                                                          |
| cassandra     | 3.10            | 7000, 7001, 9042, 7199, 9160 |                                                                                                   |
| neo4j         | 3.1             | 7474, 7687                   |                                                                                                   |
| elasticsearch | 5.2             | 9200, 9300                   |                                                                                                   |
| rethinkdb     | 2.3             | 28015, 8080                  |                                                                                                   |
