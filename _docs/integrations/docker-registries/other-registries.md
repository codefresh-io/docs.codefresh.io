---
title: "Other Registries"
description: "Connect any Docker registry for pipeline integration"
group: integrations
sub_group: docker-registries
redirect_from:
  - /docs/integrations/docker-registries/other-registries/
  - /docs/other-registries/
  - /docs/docker-registries/external-docker-registries/other-registries/
toc: true
---
Codefresh provides an option to configure a Docker Registry not in the list of Docker registry providers.  
Use this option for any cloud or hosted registry that follows the V2 Docker registry protocol.  

Some examples of self-hosted registries are:
* The [official registry](https://github.com/docker/distribution){:target="\_blank"} by Docker
* [Nexus](https://www.sonatype.com/nexus-repository-sonatype){:target="\_blank"} by Sonatype
* [Harbor](https://goharbor.io/){:target="\_blank"} by VMware
* [Portus](http://port.us.org/){:target="\_blank"} by Suse
* [Container Registry](https://www.alibabacloud.com/product/container-registry){:target="\_blank"} by Alibaba
* [Openshift registry](https://www.openshift.com/){:target="\_blank"} by Redhat
* [Kraken](https://github.com/uber/kraken){:target="\_blank"} by Uber
* [Proget](https://inedo.com/proget){:target="\_blank"} by Inedo

## Set up Other Registry integration

1. In the Codefresh UI, on the toolbar, click the **Settings** icon, and then from the sidebar, select [**Pipeline Integrations**](https://g.codefresh.io/account-admin/account-conf/integration){:target="\_blank"}. 
1. Select **Docker Registries** and then click **Configure**.
1. From the **Add Registry Provider** dropdown, select **Other Registries**.
1. Define the following:  
  * **Registry name**: A unique name for this configuration.
  * **Username**: Your registry username..
  * **Password**: Your registry encrypted password.
  * **Domain**: Your registry address, `mydomain.com`.  

{% include 
	image.html 
	lightbox="true" 
	file="/images/integrations/docker-registries/add-other-docker-registry.png" 
	url="/images/integrations/docker-registries/add-other-docker-registry.png" 
	alt="Other Registry settings" 
	caption="Other Registry settings" 
	max-width="60%" %}

{:start="5"}
1. To verify the connection details, click **Test Connection**.
1. To apply the changes, click **Save**.


## Heroku Registries

To authenticate to the Heroku registry, instead of using your password, you will need to use the authorization token.  You can find that by running:

{% highlight bash %}
heroku auth:token
{% endhighlight %}

## Related articles
[Docker registries for pipeline integrations]({{site.baseurl}}/docs/integrations/docker-registries)  
[Working with Docker Registries]({{site.baseurl}}/docs/ci-cd-guides/working-with-docker-registries/)  
[Push step]({{site.baseurl}}/docs/pipelines/steps/push/)  
[Building and pushing an image]({{site.baseurl}}/docs/example-catalog/ci-examples/build-and-push-an-image/)  
