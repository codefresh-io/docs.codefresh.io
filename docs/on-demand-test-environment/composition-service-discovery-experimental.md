---
layout: docs
title: "Composition Service Discovery (Experimental)"
description: ""
group: on-demand-test-environment
permalink: /:path/composition-service-discovery/
redirect_from:
  - /docs/composition-service-discovery
  - /docs/composition-service-discovery
toc: true
---
Codefresh enables you to launch multiple instances of the same composition utilizing Docker.
This is possible, in part, because Docker can map ports from a container to a random port on a host. Following from this are some basic questions:
  * If your container is mapped to a random port, how can you predict the URL of the application?
  * How can you configure your web application's container with a "Base URL"?
  * How can you reference other services without linking to them?

{{site.data.callout.callout_info}}
##### Availability 

This feature is available for users with a Pro subscription. <br>
Already a Pro subscriber? Contact us to opt in to this feature.
{{site.data.callout.end}}
   
Codefresh utilizes `Dynamic Composition Service Routing` to deliver seamless service discovery within a composition.

After you enable this feature for your account, Codefresh injects the URLs of every service in your composition as environment variables.

## What do these environment variables look like?
Every service URL environment variable is prefixed with `CF_URL_` and is uniquely identifiable using the service name:
`CF_URL_SERVICENAME=http://foo.cf-cd.com/unique-url`

If your service exposes multiple ports, an environment variable will be injected for every port, and will be comprised of a combination of the service name and the service's port:
`CF_URL_SERVICENAME_PORTNUMBER=http://foo.cf-cd.com/unique-url-1`

Also, every service would be have a domain that would direct to each service. The domains can be uniquely identifiable with environments variables:
`CF_DOMAIN_SERVICENAME=unique-prefix.foo.cf-cd.com`.

For services that exposes multiple ports the environment variable should have the port number as a suffix:
`CF_DOMAIN_SERVICENAME_PORTNUMBER=unique-prefix-1.foo.cf-cd.com`.

{{site.data.callout.callout_warning}}
##### Note: 

The unique identifier is the service's name, not the name of the container that was produced for the service.
{{site.data.callout.end}}
 
## Example

Consider the following composition:

  `Composition.yml`
{% highlight yaml %}
version: '3'
services:
  db:
    image: postgres
  api:
    image: myorg/api
    ports:
      - 9000
    links
      - db
  web:
    image: myorg/web
    ports:
      - 80
      - 8080
{% endhighlight %}

The `db` service does not expose any ports. The `api` service exposes port `9000`, and the `web` service exposes port `80` and port `8080`.

So every container produced by this composition will be injected with:

```
CF_URL_API=http://foo.cf-cd.com/someurl
CF_URL_WEB_80=http://foo.cf-cd.com/someurl2
CF_URL_WEB_8080=http://foo.cf-cd.com/someurl3

CF_DOMAIN_API=some-name.foo.cf-cd.com
CF_DOMAIN_WEB_80=some-name2.foo.cf-cd.com
CF_DOMAIN_WEB_8080=some-name3.foo.cf-cd.com
```

This means you can also discover these URLs within your application.
For example, within a Node.js application you can run the following routine:

  `Find all service URLs`
{% highlight javascript %}
const allVars = process.env;
const allUrls = Object.keys(allVars)
    .filter(envVarKey => envVarKey.startsWith('CF_URL_'))
    .reduce((obj, envVarKey) => {
        obj[envVarKey] = allVars[envVarKey];
        return obj;
    }, {});
{% endhighlight %}

The `allUrls` object will retain all the injected URL environment variables.
