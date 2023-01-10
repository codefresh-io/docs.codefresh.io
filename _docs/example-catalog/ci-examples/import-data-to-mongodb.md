---

title: "Import data to MongoDB"
description: ""
group: example-catalog
sub_group: ci-examples
redirect_from:
  - /docs/import-data-to-mongodb-in-composition/
  - /docs/on-demand-test-environment/example-compositions/import-data-to-mongodb/   
toc: true
---

To import, restore, or for any operation before using MongoDB in your application, look at the following example.

You just need to create Dockerfile for Mongo seed service and provide the command to prepare MongoDB. In this case,  the command is `mongoimport`.

  `Dockerfile mongo_seed`
{% highlight docker %}
FROM mongo
COPY init.json /init.json
CMD mongoimport --host mongodb --db exampleDb --collection contacts --type json --file /init.json --jsonArray
{% endhighlight %}

## Looking around
In the root of this repository you'll find a file named `docker-compose.yml`.
Let's quickly review the contents of this file:

  `docker-compose.yml`
{% highlight yaml %}
{% raw %}
version: '3'
services:
  mongodb:
    image: mongo
    command: mongod --smallfiles
    ports:
      - 27017

  mongo_seed:
    image: ${{mongo_seed}}
    links:
      - mongodb

  client:
    image: ${{build_prj}}
    links:
      - mongodb
    ports:
      - 9000
    environment:
      - MONGO_URI=mongodb:27017/exampleDb
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
You can add the following example to your GitHub or Bitbucket account, and build the [example](https://github.com/codefreshdemo/cf-example-manage-mongodb){:target="_blank"}.
{{site.data.callout.end}}

## Related articles
[CI/CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#ci-examples)  