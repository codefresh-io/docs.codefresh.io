---
layout: docs
title: "Kubernetes Frequently Asked Questions"
description: ""
group: integrations
redirect_from:
  - /docs/kubernetes-frequently-asked-questions
  - /docs/kubernetes-deployment-frequently-asked-questions
  - /docs/kubernetes-frequently-asked-questions/
toc: true
old_url: /docs/kubernetes-deployment-frequently-asked-questions
was_hidden: true
---
{:.text-secondary}
### Do you support deployment to Kubernetes clusters on Azure, Amazon, etc?

Yes, we do! If your master is publicly accessible you can access it through custom provider, just follow the instructions [here](https://docs.codefresh.io/docs/adding-non-gke-kubernetes-cluster).
In addition, we have native integration with GKE. 
Native Integration with major cloud providers is coming soon.

{:.text-secondary}
### I received a $500 credit to Google Cloud card. How can I use it to test out Kubernetes with Google Cloud/Codefresh?

Google Cloud has offered up to $500 in credits when you start using Google cloud with Codefresh.
In order to apply for the credits, Click [here](https://cloud.google.com/partners/partnercredit/?PCN=a0n6000000650VYAAY#contact-form). Credits are typically applied within a few days of the application. 
Meanwhile you can visit our [Kubernetes deployment page](https://codefresh.io/kubernetes-deploy/) for more information.

{:.text-secondary}
### How can I disconnect from my Google Cloud Platform? 

You can use the following link to revoke Codefresh access to your account - 
https://myaccount.google.com/permissions
After that, you will be able to connect with any google account.

{:.text-secondary}
### Can I run Codefresh pipelines on my K8s cluster?

Codefresh is running on kubernetes and running all your pipelines on kubernetes (build, test, deploy, etc...) These clusters are fully managed by Codefresh.

Codefresh can deploy to and monitor your own kubernetes clusters (hosted or on premise) by connecting to the cluster and working with the cluster deployment, replica sets, ingress, etc...  when connecting to your own cluster if by saying manage you mean, upgrading kubernetes, etc... then it is your responsibility, if you connect to clusters on GKE though, Google will make sure your kubernetes clusters always running the latest version and alive.

{:.text-secondary}
### Is there a way to have a pipeline automatically deploy to Kubernetes?

Yes, there's a dedicated deployment step. See the following links for more information:
{% highlight html %}
{% raw %}
<deployment step>
<yaml step>
{% endraw %}
{% endhighlight %}

{:.text-secondary}
### is there a way that i can update multiple k8 deployments if a repository build is successful?

You can try to use the [step of the codefresh.yml](https://docs.codefresh.io/v1.0/docs/kubernetes#section-deploy-to-gke-from-codefresh-pipeline) to update the multiple k8 deployments

it will look similar to the following ( just add the environment variables)

{% highlight yaml %}
{% raw %}
  deploy-to-kubernetes:
    image: codefresh/cf-deploy-kubernetes:latest
    working-directory: ${{main_clone}}
    commands:
      - /cf-deploy-kubernetes deployment-1.yml.tmpl
      - /cf-deploy-kubernetes deployment-2.yml.tmpl
{% endraw %}
{% endhighlight %}
