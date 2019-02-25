---
title: "Codefresh Installation Options"
description: "How to run Codefresh in the Enterprise"
group: enterprise
toc: true
redirect_from:
  - /docs/enterprise/nodes/set-node-limits/
---
Codefresh offers 3 installation options that can cater to any size of organization. These are:

* Full cloud version that runs 100% in the cloud and is fully managed by Codefresh
* On-premise version where Codefresh runs inside the customer datacenter/cloud
* Hybrid version where the UI runs in the Codefresh cloud but builds are running on customer premises

On-premise and Hybrid versions are available to Enterprise customers that are looking for a "behind-the-firewall" solution.



### Cloud version 

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

The Cloud version has multi-account support with most git providers (Gitlab, Github, Bitbucket) as well as Azure and Google.


### Hybrid installation

For organizations that don't want their source code to leave their premises, or have other security constraints, Codefresh offers the hybrid installation.

The User Interface still runs on Codefresh infrastructure, while the actual builds happen in the location of the customer (Codefresh builders run on a Kubernetes cluster).

{% include image.html
  lightbox="true"
  file="/images/enterprise/installation/hybrid-installation.png"
  url="/images/enterprise/installation/hybrid-installation.png"
  alt="sso-diagram.png"
  max-width="70%"
    %}    


The hybrid installation strikes the perfect balance between security, flexibility and ease of use. Codefresh still does the heavy lifting for maintaining most of the platform parts. The sensitive data (such as source code and internal services) never leave the premises of the customers.

With the hybrid installation mode, Codefresh can easily connect to internal secure service that have no public presence.
The UI part is still compliant with Soc2.

{% include image.html
  lightbox="true"
  file="/images/enterprise/installation/soc2-type2-certified.png"
  url="/images/enterprise/installation/soc2-type2-certified.png"
  alt="sso-diagram.png"
  max-width="40%"
    %}    

### On-premise Installation    

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


## What to read next

* [Codefresh Pricing](https://codefresh.io/pricing/)
* [Codefresh features](https://codefresh.io/features/)
