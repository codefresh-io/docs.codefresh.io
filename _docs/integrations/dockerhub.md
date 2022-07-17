---
title: "Docker Hub Registry"
description: "Push, Pull and Deploy images from Dockerhub"
group: integrations
toc: true
---

Codefresh has native support for interacting with Docker Hub registries.  
Adding a Docker Hub integration in Codefresh allows you to reference the integration in external tools such as GitHub Actions by the name of the integration account, instead of explicit credentials. See [Image enrichment overview]({{site.baseurl}}/docs/integrations/image-enrichment-overview/) and [GitHub Action integration]({{site.baseurl}}/docs/integrations/github-actions/).

### Prerequisites
Before you configure settings in Codefresh to integrate Docker Hub registry, do the following:

* [Create an account or sign in to your account at Docker Hub](https://hub.docker.com/signup){:target="\_blank"}
* (Optional)[Enable 2FA (Two-Factor Authentication)](https://docs.docker.com/docker-hub/2fa/){:target="\_blank"}
* [Create a personal account token](https://docs.docker.com/docker-hub/access-tokens/){:target="\_blank"}

### Configure Docker Hub integration in Codefresh
Once you have completed the prerequisites, configure the Docker Hub integration settings in Codefresh.  
 
1. In the Codefresh UI, go to [Integrations](https://g.codefresh.io/2.0/account-settings/integrations){:target="\_blank"}. 
1. Select **Docker Hub Docker Registry**, and then click **Add**.
1. Click **Add** on the top-right. 
1. Configure the Docker Hub integration settings: 
  * Enter an **Integration name**. You can have multiple Docker Hub instances connected.
  * Use this integration for **All runtimes**, or specific **Selected runtimes**.
  * **Username**: The Docker Hub username.
  * **Password**: 
    If you enabled two-factor authentication, enter the personal access token for your Docker Hub account for Codefresh to push images. Personal access tokens are more secure and can be revoked when needed. Codefresh can then push your images.  
    If two-factor authentication is not enabled, enter the password of your Docker Hub account (not recommended).

    {% include 
   image.html 
   lightbox="true" 
   file="/images/integrations/docker-registries/docker-hub.png" 
   url="/images/integrations/docker-registries/docker-hub.png" 
   alt="Docker Hub integration for image enrichment" 
   caption="Docker Hub integration for image enrichment"
   max-width="50%" 
   %}
   
{:start="5"}
1. To confirm, click **Commit**.
  It may take a few moments for the new integration to be synced to the cluster before it appears in the list.

### Integration resource in shared configuration repo
The integration resource is created in the Git repository with the shared configuration, within `resources`. The exact location depends on whether the integration is shared with all or specific runtimes:  

* All runtimes: Created in `resources/all-runtimes-all-clusters/`
* Selected runtimes: Created in `resources/runtimes/<runtime-name>/`

### Related articles
[Shared configuration repo]({{site.baseurl}}/docs/reference/shared-configuration/)  
[Images]({{site.baseurl}}/docs/deployment/images/)  
[Applications dashboard]({{site.baseurl}}/docs/deployment/applications-dashboard/)    
[Adding Git sources]({{site.baseurl}}/docs/runtime/git-sources/)  
