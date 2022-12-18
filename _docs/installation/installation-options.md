---
title: "Installation environments"
description: ""
group: installation
toc: true
---
To be changed and updated for ProjectOne

The Codefresh platform supports two different installation environments, each with different installation options.

* CI/CD installation environment  
  The CI/CD installation environment is optimized for Continuous Integration/Delivery with Codefresh pipelines. CI pipelines created in Codefresh fetch code from your Git repository, packages/compiles the code, and deploys the final artifact to a target environment.

  The CI/CD installation environment supports these installation options:  
  * Hybrid, where the Codefresh CI/CD UI runs in the Codefresh cloud, and the builds run on customer premises
  * SaaS, a full cloud version that is fully managed by Codefresh
  * On-premises, where Codefresh CI/CD runs within the customer datacenter/cloud

  On-premises and Hybrid CI/CD options are available to Enterprise customers looking for a "behind-the-firewall" solution.

* GitOps installation environment  
  The GitOps installation environment is a full-featured solution for application deployments and releases. Powered by the Argo Project, Codefresh uses Argo CD, Argo Workflows, Argo Events, and Argo Rollouts, extended with unique functionality and features essential for enterprise deployments.

  GitOps installations support Hosted and Hybrid options. 

##  Comparison
Both environments can co-exist giving you the best of both worlds. For 

TBD


## Codefresh CI/CD installation options









### Codefresh Cloud CI/CD - likely to be removed

The Codefresh CI/CD Cloud version is the easiest way to start using Codefresh as it is fully managed and runs 100% on the cloud. Codefresh DevOps handles the maintenance and updates.

You can also create a [free account]({{site.baseurl}}/docs/getting-started/create-a-codefresh-account/) on the SAAS version right away. The account is forever free with some limitations
on number of builds.

The cloud version runs on multiple clouds:

{% include image.html
  lightbox="true"
  file="/images/installation/codefresh-saas.png"
  url="/images/installation/codefresh-saas.png"
  alt="sso-diagram.png"
  max-width="60%"
    %}

Codefresh Cloud is also compliant with [SOC2 - Type2](https://www.aicpa.org/SOC) showing our commitment to security and availability.

{% include image.html
  lightbox="true"
  file="/images/installation/soc2-type2-certified.png"
  url="/images/installation/soc2-type2-certified.png"
  alt="sso-diagram.png"
  max-width="40%"
    %}    

The Cloud version has multi-account support with most git providers (GitLab, GitHub, Bitbucket) as well as Azure and Google.


### Codefresh Hybrid CI/CD 

The Hybrid CI/CD  installation option is for organizations who want their source code to live within their premises, or have other security constraints. For more about the theory and implementation, see [CI/CD behind the firewall installation]({{site.baseurl}}/docs/administration/behind-the-firewall/).

The UI runs on Codefresh infrastructure, while the builds happen in a Kubernetes cluster in the customer's premises.

{% include image.html
  lightbox="true"
  file="/images/installation/hybrid-installation.png"
  url="/images/installation/hybrid-installation.png"
  alt="sso-diagram.png"
  max-width="70%"
    %}    


CI/CD Hybrid  installation strikes the perfect balance between security, flexibility, and ease of use. Codefresh still does the heavy lifting for maintaining most of the platform parts. The sensitive data (such as source code and internal services) never leave the premises of the customers.

With Hybrid CI/CD installation, Codefresh can easily connect to internal [secure services]({{site.baseurl}}/docs/reference/behind-the-firewall/#using-secure-services-in-your-pipelines) that have no public presence.
The UI part is still compliant with Soc2.
  

Here are the security implications of CI/CD Hybrid installation:

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



### Codefresh On-premises CI/CD    

For customers who want full control, Codefresh also offers an on-premises option for CI/CD installation. Both the UI and builds run on a Kubernetes cluster fully managed by the customer.

While Codefresh can still help with maintenance of the CI/CD On-premises, we would recommend the Hybrid CI/CD option first as it offers the most flexibility while maintaining high security.

### CI/CD installation comparison 

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


## Codefresh GitOps installation options 

Similar to CI/CD installation options, Codefresh GitOps also supports SaaS and hybrid installation options: 


### Hosted GitOps
The SaaS version of GitOps, has Argo CD installed in the Codefresh cluster.
Hosted GitOps Runtime is installed and provisioned in a Codefresh cluster, and managed by Codefresh.  
Hosted enviroments are full-cloud environments, where all updates and improvements are managed by Codefresh, with zero-maintenance overhead for you as the customer. Currently, you can add one Hosted GitOps Runtime per account.
For the architecture, see [Hosted GitOps Runtime architecture]({{site.baseurl}}/docs/installation/architecture/#hosted-gitops-runtime-architecture).

  
{% include
 image.html
 lightbox="true"
 file="/images/runtime/intro-hosted-hosted-initial-view.png"
 url="/images/runtime/intro-hosted-hosted-initial-view.png"
 alt="Hosted runtime setup"
 caption="Hosted runtime setup"
    max-width="80%"
%} 

  For more information on how to set up the hosted environment, including provisioning hosted runtimes, see [Set up Hosted GitOps]({{site.baseurl}}/docs/installation/hosted-runtime/).  

### Hybrid GitOps
The hybrid version of GitOps, has Argo CD installed in the customer's cluster.    
Hybrid GitOps is installed in the customer's cluster, and managed by the customer.  
The Hybrid GitOps Runtime is optimal for organizations with security constraints, wanting to manage CI/CD operations within their premises. Hybrid GitOps strikes the perfect balance between security, flexibility, and ease of use. Codefresh maintains and manages most aspects of the platform, apart from installing and upgrading Hybrid GitOps Runtimes which are managed by the customer.  

 
{% include
   image.html
   lightbox="true"
   file="/images/runtime/runtime-list-view.png"
 url="/images/runtime/runtime-list-view.png"
  alt="Runtime List View"
  caption="Runtime List View"
  max-width="70%"
%}

  For more information on hybrid environments, see [Hybrid GitOps runtime requirements]({{site.baseurl}}/docs/installation/hybrid-gitops/#minimum-system-requirements) and [Installling Hybrid GitOps Runtimes]({{site.baseurl}}/docs/installation/hybrid-gitops/).  



<!--- #### Git provider repos
Codefresh Runtime creates three repositories in your organization's Git provider account:

* Codefresh runtime installation repository
* Codefresh Git Sources
* Codefresh shared configuration repository

**Codefresh Runtime functionality**
The runtime:
* Ensures that the installation repository and the Git Sources are always in sync, and applies Git changes back to the cluster
* Receives events and information from the user's organization systems to execute workflows
   By default, the ingress controller directs all requests and events to the Codefresh Application Proxy. When internal and an external ingress hosts are configured, the ingress comtroller directs webhook events to the relevant Event Source and then to Argo Events (not via the Codefresh Application Proxy). -->

### Hosted vs.Hybrid GitOps

The table below highlights the main differences between Hosted and Hybrid GitOps.

{: .table .table-bordered .table-hover}
| GitOps Functionality           |Feature             |  Hosted                    | Hybrid |
| --------------          | --------------     |---------------             | --------------- |
| Runtime                 | Installation       | Provisioned by Codefresh   | Provisioned by customer       |
|                         | Runtime cluster    | Managed by Codefresh       | Managed by customer       |
|                         | Number per account | One runtime                | Multiple runtimes            |
|                         | External cluster   | Managed by customer        | Managed by customer         |
|                         | Upgrade            | Managed by Codefresh       | Managed by customer |
|                         | Uninstall          | Managed by customer        | Managed by customer |
| Argo CD                 |                    | Codefresh cluster          | Customer cluster  |
| CI Ops                  | Delivery Pipelines |Not supported               | Supported  |
|                         |Workflows           | Not supported              | Supported  |
|                         |Workflow Templates  | Not supported              | Supported  |
| CD  Ops                 |Applications        | Supported                  | Supported |
|                         |Image enrichment    | Supported                  | Supported  |
|                         | Rollouts           | Supported                  |  Supported  |
|Integrations             |                    | Supported                  | Supported  |
|Dashboards               |Home Analytics      | Hosted runtime and deployments|Runtimes, deployments, Delivery Pipelines |
|                         |DORA metrics        | Supported                 |Supported        |
|                         |Applications        | Supported                 |Supported        |

### Related articles
[Architecture]({{site.baseurl}}/docs/installation/runtime-architecture/)  
[Add Git Sources to GitOps Runtimes]({{site.baseurl}}/docs/installation/git-sources/)   
[Shared configuration repository]({{site.baseurl}}/docs/reference/shared-configuration)  

