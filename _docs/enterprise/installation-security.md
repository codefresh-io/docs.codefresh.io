---
title: "Codefresh Installation Options"
description: "How to run Codefresh in the Enterprise"
group: enterprise
toc: true
redirect_from:
  - /docs/enterprise/nodes/set-node-limits/
---
Codefresh offers 3 installation options that can cater to any size of organization:

* Full cloud version that runs 100% in the cloud and is fully managed by Codefresh.
* On-premise version where Codefresh runs inside the customer datacenter/cloud.
* Hybrid version where the UI runs in the Codefresh cloud, but builds are running on customer premises.

On-premise and Hybrid versions are available to Enterprise customers that are looking for a "behind-the-firewall" solution.



## Cloud version 

The Cloud version is the easiest way to start using Codefresh as it is fully managed and runs 100% on the cloud. All maintenance and updates
are executed by the Codefresh DevOps team.

You can also create a [free account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/) on the SAAS version right away. The account is forever free with some limitations
on number of builds.

The cloud version runs on multiple clouds:

{% include image.html
  lightbox="true"
  file="/images/enterprise/installation/codefresh-saas.png"
  url="/images/enterprise/installation/codefresh-saas.png"
  alt="sso-diagram.png"
  max-width="60%"
    %}

Codefresh Cloud is also compliant with [SOC2 - Type2](https://www.aicpa.org/SOC) showing our commitment to security and availability.

{% include image.html
  lightbox="true"
  file="/images/enterprise/installation/soc2-type2-certified.png"
  url="/images/enterprise/installation/soc2-type2-certified.png"
  alt="sso-diagram.png"
  max-width="40%"
    %}    

The Cloud version has multi-account support with most git providers (GitLab, GitHub, Bitbucket) as well as Azure and Google.


## Hybrid installation

For organizations that don't want their source code to leave their premises, or have other security constraints, Codefresh offers the [hybrid installation]({{site.baseurl}}/docs/enterprise/behind-the-firewall/).

The User Interface still runs on Codefresh infrastructure, while the actual builds happen in the location of the customer (Codefresh builders run on a Kubernetes cluster).

{% include image.html
  lightbox="true"
  file="/images/enterprise/installation/hybrid-installation.png"
  url="/images/enterprise/installation/hybrid-installation.png"
  alt="sso-diagram.png"
  max-width="70%"
    %}    


The hybrid installation strikes the perfect balance between security, flexibility and ease of use. Codefresh still does the heavy lifting for maintaining most of the platform parts. The sensitive data (such as source code and internal services) never leave the premises of the customers.

With the hybrid installation mode, Codefresh can easily connect to internal [secure services]({{site.baseurl}}/docs/enterprise/behind-the-firewall/#using-secure-services-in-your-pipelines) that have no public presence.
The UI part is still compliant with Soc2.

{% include image.html
  lightbox="true"
  file="/images/enterprise/installation/soc2-type2-certified.png"
  url="/images/enterprise/installation/soc2-type2-certified.png"
  alt="sso-diagram.png"
  max-width="40%"
    %}    

Here are the security implications of the hybrid solution:

{: .table .table-bordered .table-hover}
| Company Asset          | Flow/Storage of data                 | Comments                  |
| -------------- | ---------------------------- |-------------------------|
| Source code       | Stays behind the firewall | |
| Binary artifacts  | Stay behind the firewall |   |
| Build logs        | Also sent to Codefresh Web application |  |
| Pipeline volumes   | Stay behind the firewall | |
| Pipeline variables   | Defined in Codefresh Web application | |
| Deployment docker images | Stay behind the firewall| Stored on your Docker registry |
| Development docker images | Stay behind the firewall | Stored on your Docker registry|
| Testing docker images | Stay behind the firewall|  Stored on your Docker registry |
| Inline pipeline definition | Defined in Codefresh Web application |  |
| Pipelines as YAML file | Stay behind the firewall |  |
| Test results | Stay behind the firewall | | 
| HTML Test reports | Shown on Web application |  Stored in your S3 or Google bucket or Azure storage  |
| Production database data | Stays behind the firewall | |
| Test database data | Stays behind the firewall | |
| Other services (e.g. Queue, ESB) | Stay behind the firewall | |
| Kubernetes deployment specs | Stay behind the firewall | |
| Helm charts | Stay behind the firewall | |
| Other deployment resources/script (e.g. terraform) | Stay behind the firewall | |
| Shared configuration variables | Defined in Codefresh Web application |  |
| Deployment secrets (from git/Puppet/Vault etc) | Stay behind the firewall|  |
| Audit logs | Managed via Codefresh Web application |  |
| SSO/Idp Configuration | Managed via Codefresh Web application |  |
| User emails | Managed via Codefresh Web application |  |
| Access control rules | Managed via Codefresh Web application | |



## On-premise Installation    

For customers that wish to have full control over everything, Codefresh also offers an on-premise option. In this case everything (UI and builds) are running on an environment (Kubernetes cluster) fully managed by the customer.

While Codefresh can still help with maintenance of the on-premise platform, we would recommend trying the Hybrid solution first as it offers the most flexibility while maintaining high security.

## Comparison table

{: .table .table-bordered .table-hover}
| Characteristic      | Cloud | Hybrid | On Premise                   |
| -------------- | ---------------------------- |-------------------------|
| Managed by     | Codefresh | Codefresh and Customer | Customer |
| UI runs on  | public cloud | public cloud | private cluster |
| Builds run on | public cloud | private cluster | private cluster |
| Access to secure/private services | no | yes | yes |
| Customer maintenance effort | none | some | full |
| Best for | most companies | companies with security constraints | Large scale installations |
| Available to | all customers | [enterprise plans](https://codefresh.io/contact-us/) | [enterprise plans](https://codefresh.io/contact-us/) |

## High level Architecture

The overall architecture of Codefresh is shown below:

{% include image.html
  lightbox="true"
  file="/images/enterprise/installation/architecture-high-level.png"
  url="/images/enterprise/installation/architecture-high-level.png"
  alt="High level overview"
  caption="High level overview (click to enlarge)"
  max-width="100%"
    %}  

The most important components are the following:

**The Codefresh VPC:** This is where all internal Codefresh services are running (analyzed in the next section). Codefresh is using internally Mongo and PostgreSQL for storing information such as users and authentication.

**The Pipeline execution environment**. This is where all pipelines run. The Codefresh engine component is responsible for taking pipeline definitions and running them in managed Kubernetes clusters by automatically launching the Docker containers that each pipeline needs for its steps.

**External actors**. Codefresh is offering a [public API]({{site.baseurl}}/docs/integrations/codefresh-api/) that is consumed both by the Web User interface as well as the [Codefresh CLI](https://codefresh-io.github.io/cli/). The API is also available for any custom integration with external tools or services.

**Google Firebase**. This is used for the storage of build logs. It is fully managed by Codefresh services. 

**Hybrid runtime**. This is an optional installation on a customer cluster using the [Codefresh runner]({{site.baseurl}}/docs/enterprise/codefresh-runner/). It allows customers to run the Codefresh engine inside private Kubernetes clusters. This way pipelines can be executed on customer premises instead of the Codefresh SAAS platform.

**Hybrid runtime V2**. This is the upcoming version of the Codefresh runner that allows customers to use multiple internal clusters with a single Codefresh runner. This way customers can easily split their pipelines on clusters of different capabilities or even clusters from different architectures and providers.


## Topology diagram

If we zoom into the Codefresh Services platform we will see the following:

{% include image.html
  lightbox="true"
  file="/images/enterprise/installation/topology.png"
  url="/images/enterprise/installation/topology.png"
  alt="Topology diagram"
  caption="Topology diagram (click to enlarge)"
  max-width="100%"
    %}  

Components with green color (marked as business) are only present in the Codefresh SAAS installation. Components are listed beginning from the center of the diagram and then we go clockwise (starting from the top).


**cf-api** is the central backend component. It functions as an API gateway for other services and is also responsible for authentication/authorization.

**runtime-environment-manager** is responsible for managing the different environments where pipelines can run. The Codefresh SAAS installation has runtime environment that are fully managed by the Codefresh team. In hybrid installations, customers can add their own runtime environments using private Kubernetes clusters

**onboarding-status** records and reports on the onboarding status of a user. *This component only exists in Codefresh SAAS.*

**accounts-referrals** sends invites to customers that have been refereed by existing users. *This component only exists in Codefresh SAAS.*

**segment-exporter** monitors internal system events and convert them to Segment events. *This component only exists in Codefresh SAAS.*

**mailer** is responsible for sending emails (e.g. from failed builds) to customers. *This component only exists in Codefresh SAAS.*

**salesfoce-reporter** monitors internal system events and convert them to Salesforce events. *This component only exists in Codefresh SAAS.* 

**tasker-kubernetes** provides cache storage for [Kubernetes dashboards]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/) in Codefresh

**kube-integration** provides an interface to retrieve all required information from a Kubernetes cluster, can be run either as a http server, or npm module

**charts-manager** models the [Helm chart view]({{site.baseurl}}/docs/new-helm/helm-releases-management/) in Codefresh.

**k8s-monitor** is an agent that gets installed on each Kubernetes cluster to provide information for the [Kubernetes dashboards]({{site.baseurl}}/docs/deploy-to-kubernetes/manage-kubernetes/)

**helm-repo-manager** is responsible for the Helm repository admin API and ChartMuseum proxy for managing [Helm charts it Codefresh]({{site.baseurl}}/docs/new-helm/managed-helm-repository/)

**cluster-providers** provides an interface to define clusters contexts for connecting Kubernetes clusters in Codefresh

**context-manager** manages all possible authentication/configuration that are used by Codefresh system and by Codefresh engine

**cronus** enables defining [cron like triggers]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/cron-triggers/) for pipelines

**nomios** enables [triggers from Dockerhub]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/dockerhub-triggers/) (when a new image/tag is pushed)

**hermes** controls [trigger management]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/) in Codefresh

**cf-broadcaster** stores build logs from pipelines

**pipeline-manager** manages all CRUD operations regarding pipelines

**cfsign** signs server tls certificates for docker daemons and generates client tls certificates for hybrid pipelines

**payments** handles customer payments. *This component only exists in Codefresh SAAS.*

## What to read next

* [Codefresh Pricing](https://codefresh.io/pricing/)
* [Codefresh features](https://codefresh.io/features/)
