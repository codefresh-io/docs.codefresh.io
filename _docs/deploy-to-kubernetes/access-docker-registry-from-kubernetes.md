---
title: "Accessing a Docker registry from your Kubernetes cluster"
description: "Allowing Kubernetes to pull Docker images from your registry"
group: deploy-to-kubernetes
redirect_from:
  - /docs/access-codefresh-docker-registry-from-kubernetes/
  - /docs/deploy-to-kubernetes/deploy-to-kubernetes/create-image-pull-secret/
  - /docs/deploy-to-kubernetes/access-codefresh-docker-registry-from-kubernetes/
toc: true
---

Kubernetes deployments are based on a "pull" approach. When you deploy your application to a Kubernetes
cluster you don't upload the application itself (which usually happens with traditional deployments). Instead,
Kubernetes will pull the Docker images to its nodes on its own.


 {% include 
image.html 
lightbox="true" 
file="/images/getting-started/quick-start-k8s/overview.png" 
url="/images/getting-started/quick-start-k8s/overview.png" 
alt="Kubernetes deployments" 
caption="Kubernetes deployments" 
max-width="80%" 
%}

If your Docker images are in a public repository such as DockerHub, Kubernetes can pull them right away. In most cases
however your images are in a private Docker registry and Kubernetes must be given explicit access to it.

This happens by using [Docker registry secrets](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/). This way each Kubernetes pod can pull Docker images directly when a deployment takes place.

## Giving access to a Docker Registry via the GUI

Codefresh allows you to create easily pull secrets for your cluster. The first step is to define your Docker registry
inside Codefresh. It is important to know that Codefresh can work with any [compliant Docker registry]({{site.baseurl}}/docs/docker-registries/external-docker-registries/) either on the cloud or behing the firewall.

Once your Registry is connected to Codefresh, select *Kubernetes* from the left sidebar to view your Kubernetes Dashboard. Then click
the *Add Service* Button.

At the screen that will appear select your cluster and your namespace at the top. Then at the bottom select the *Image Pull secret* dropdown.

 {% include 
image.html 
lightbox="true" 
file="/images/kubernetes/create-secret.png" 
url="/images/kubernetes/create-secret.png" 
alt="Create Pull Secret" 
caption="Create Pull Secret" 
max-width="80%" 
%}

This dropdown shows all the existing pull secrets for that namespace. You can select the *Create Registry Pull secret* Option to create a new one.

You will get a list of all the connected Docker registries in Codefresh. Select the one that you like and Codefresh will
automatically create a secret for you. 

>The creation of the secret is instant and will happen as soon as you select your Docker registry from the drop down. There is no need to actually deploy anything from this screen for the changes to take effect.

 {% include 
image.html 
lightbox="true" 
file="/images/kubernetes/secret-dropdown.png" 
url="/images/kubernetes/secret-dropdown.png" 
alt="Docker Registry Access" 
caption="Docker Registry Access" 
max-width="80%" 
%}

From now on, this cluster on this namespace will be able to deploy Docker images from the selected Registry.

From this screen you don't really need to finish the deployment in order to apply the secrets changes. Feel free to
close the screen and go to another Codefresh page.

>Note that Codefresh will automatically use the secret you defined in all deployments
that are performed via the GUI (Codefresh is dynamically creating the correct manifests for you behind the scenes in that case).
If you wish to use your own manifests, you need to include the secret yourself, as explained in the next section.


## Giving access to a Docker Registry with kubectl

You can also use the `kubectl` command directly to give access to a Docker registry.
This way is not specific to Codefresh so read the [official kubernetes documentation](https://kubernetes.io/docs/tasks/configure-pod-container/pull-image-private-registry/).


### Creating the Docker registry secret

The credentials depend upon the [type or registry you use]({{site.baseurl}}/docs/docker-registries/external-docker-registries/). 

- The Docker server to use is a domain such `gcr.io`, `azurecr.io` etc
- The username is your account username.
- The password is a speficic docker registry password or any other kind of token. You need to check the documentation of your registry provider for the exact details.

>Be sure to create the Secret in the namespace in which your application will run.
Pull secrets are specific to a namespace. If you want to deploy to multiple namespaces
you need to create a secret for each one of them.

This is an example of creating a pull secret to Azure registry. You can use the same command to any other private registry.

  `Shell`
{% highlight sh %}
{% raw %}

export DOCKER_REGISTRY_SERVER=mysampleregistry.azurecr.io
export DOCKER_USER=myregistryname
export DOCKER_PASSWORD=myregistrytoken
export DOCKER_EMAIL=YOUR_EMAIL

kubectl create secret docker-registry cfcr\
 --docker-server=$DOCKER_REGISTRY_SERVER\
 --docker-username=$DOCKER_USER\
 --docker-password=$DOCKER_PASSWORD\
 --docker-email=$DOCKER_EMAIL
{% endraw %}
{% endhighlight %}

### Using the Docker registry secret

To use the secret you just created, you need to either

* Include it in [your pod manifests](https://kubernetes.io/docs/concepts/containers/#specifying-imagepullsecrets-on-a-pod)
* Include it in [the service account level](https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/#add-imagepullsecrets-to-a-service-account)

There is nothing specific to Codefresh regarding the usage of Docker registry secrets, and therefore
following the official Kubernetes documentation is the recommended approach.

## Giving access to a Docker Registry via the Codefresh CLI

The Codefresh CLI can also create pull secrets in an automated manner.

See the Image pull Secret [documentation](https://codefresh-io.github.io/cli/more/image-pull-secret/).

## What to read next

- [Deploy to Kubernetes - quick start]({{site.baseurl}}/docs/getting-started/deployment-to-kubernetes-quick-start-guide/)
* [Managing your cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)

