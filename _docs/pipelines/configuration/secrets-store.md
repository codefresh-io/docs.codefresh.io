---
title: "Secrets in pipelines"
description: "Use Kubernetes secrets in Codefresh"
group: pipelines
sub_group: configuration
toc: true
---

Once you have [connected Codefresh to your secrets storage]({{site.baseurl}}/docs/integrations/secret-storage/), you can use them in any pipeline or UI screen.

> Note: This feature is for Enterprise accounts only.

## Using secrets in pipelines

The syntax for using the secret is {% raw %}`${{secrets.NAME_IN_CODEFRESH.KEY}}`{% endraw %}.

> If you did not include the resource-name as a part of your secret store context creation, the syntax for using your secret differs slightly:  
  {% raw %}${{secrets.NAME_IN_CODEFRESH.RESOURCE-NAME@KEY}}{% endraw %}  
  The previous KEY portion is now made of two parts separated using @, where the left side is the name of the resource in the namespace, and the right side the key in that resource.

To use the secret in your pipeline, you have two options:

* Define it as a pipeline variable:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/secrets/secrets-pipeline-var.png" 
url="/images/pipeline/secrets/secrets-pipeline-var.png"
alt="Secrets Pipeline Variable" 
caption="Secrets stored in Pipeline Variable" 
max-width="80%" 
%}

`codefresh.yaml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  step:
    type: freestyle
    arguments:
      image: alpine
      commands:
        - echo $SECRET
{% endraw %}
{% endhighlight %}

* Use the secret directly in your YAML

`codefresh.yaml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  step:
    type: freestyle
    arguments:
      image: alpine
      environment:
        - SECRET=${{secrets.test.key1}}
      commands:
        - echo $SECRET
{% endraw %}
{% endhighlight %}


## Using secrets in the Codefresh UI

You can also use secrets in the GUI screens that support them. Currently you can use secrets in:

* Values in [shared configuration]({{site.baseurl}}/docs/pipelines/shared-configuration/)
* Integration with [cloud storage]({{site.baseurl}}/docs/testing/test-reports/#connecting-your-storage-account)

Where secret integration is supported, click on the lock icon and enable the toggle button. You will get a list of your connected secrets:


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/shared-configuration/shared-conf-secret-integration.png" 
url="/images/pipeline/shared-configuration/shared-conf-secret-integration.png"
alt="Using external secrets in shared configuration values" 
caption="Using external secrets in shared configuration values"
max-width="50%"
%}

If you have already specified the resource field during secret definition the just enter on the text field the name of the secret directly, i.e. `my-secret-key`.
If you didn't include a resource name during secret creation then enter the full name in the field like `my-secret-resource@my-secret-key`.


## Related articles
[Shared Configuration]({{site.baseurl}}/docs/pipelines/shared-configuration/)  
[Git triggers]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/)  
[Running pipelines locally]({{site.baseurl}}/docs/pipelines/running-pipelines-locally/)  
[Debugging Pipelines]({{site.baseurl}}/docs//yaml-examples/examples/trigger-a-k8s-deployment-from-docker-registry/)  

