---
title: "Installation options"
description: "Understand Codefresh installation options"
group: installation
redirect_from:
  - /docs/administration/installation-security/
toc: true
---

The Codefresh platform supports three different installation options, all compliant with [SOC2 - Type2](https://www.aicpa.org/SOC){:target="\_blank"}.

{% include image.html
  lightbox="true"
  file="/images/installation/soc2-type2-certified.png"
  url="/images/installation/soc2-type2-certified.png"
  alt="sso-diagram.png"
  max-width="40%"
    %} 



* **Hybrid Runner**  
  The Runner installation is the hybrid installation mode for Codefresh pipelines. The Codefresh UI runs in the Codefresh cloud, and the builds run on customer premises. The Runner combines flexibility with security, and is optimal for Enterprise customers looking for a "behind-the-firewall" solution.  
  See [Hybrid Runner](#hybrid-runner).
  

* **On-Premises**  
  On-Premises installation is for customers who want full control over their environments. Both the UI and the builds run on the Kubernetes cluster in an environment fully managed by you as our customer.  

  While Codefresh can still help with maintenance of the On-Premises platform, we would recommend the Hybrid Runner as it combines flexibility without compromising on security.  
  See [On-premises](#on-premises).


* **GitOps**  
  GitOps installation is a full-featured solution for application deployments and releases powered by the Argo Project. Codefresh uses Argo CD, Argo Workflows, Argo Events, and Argo Rollouts, extended with unique functionality and features essential for enterprise deployments.

  GitOps installations support Hosted and Hybrid options.  
  See [GitOps](#gitops).


## Note on Cloud Builds for Codefresh pipelines


Cloud Builds for Codefresh pipelines are disabled for all accounts by default. 
Account admins can request Codefresh to enable Cloud Builds for an account. There is no manual action required except to click on the Enable Cloud Builds button as shown below. The timeframe for the response is up to 24 hours.<br>

{% include image.html
  lightbox="true"
  file="/images/installation/enable-cloud-builds-request.png"
  url="/images/installation/enable-cloud-builds-request.png"
  caption="Enable Cloud Builds for pipelines"
  alt="Enable Cloud Builds for pipelines"
  max-width="70%"
    %} 

As an account admin, you can then grant access to users or have the users explicitly request access to a runtime environment to run pipelines. 

If you [create a free account]({{site.baseurl}}/docs/quick-start/create-codefresh-account/), to run pipelines, you need to configure [Build Runtime settings]({{site.baseurl}}/docs/pipelines/pipelines/#build-runtime) with a Hybrid Runner runtime environment.  




## Hybrid Runner

The Hybrid Runner installation is for organizations who want their source code to live within their premises, or have other security constraints. For implementation details, see [[Runner installation behind firewalls]({{site.baseurl}}/docs/installation/behind-the-firewall).
The UI runs on Codefresh infrastructure, while the builds happen in a Kubernetes cluster in the customer's premises.

{% include image.html
  lightbox="true"
  file="/images/installation/hybrid-installation.png"
  url="/images/installation/hybrid-installation.png"
  caption="Hybrid installation.png"
  alt="Hybrid installation.png"
  max-width="70%"
    %}    


Hybrid Runner installation strikes the perfect balance between security, flexibility, and ease of use. Codefresh still does the heavy lifting for maintaining most of the platform parts. Sensitive data such as source code and internal services never leave customer premises.  
Codefresh can easily connect to internal [secure services]({{site.baseurl}}/docs/installation/behind-the-firewall/#using-secure-services-in-your-pipelines) that have no public presence.
The UI is still compliant with Soc2.
  

The table lists the security implications of Hybrid Runner installation.

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



## On-premises   

For customers who want full control, Codefresh also offers on-premises installation. Both the UI and builds run on a Kubernetes cluster fully managed by the customer.

See [Codefresh On-Prem Installation & Configuration]({{site.baseurl}}/docs/installation/codefresh-on-prem).


## GitOps 

Codefresh GitOps also supports SaaS and hybrid installation options: 


### Hosted GitOps
The SaaS version of GitOps, Hosted GitOps has Argo CD installed in the Codefresh cluster.
Hosted GitOps Runtime is installed and provisioned in a Codefresh cluster, and managed by Codefresh.  
Hosted environments are full-cloud environments, where all updates and improvements are managed by Codefresh, with zero-maintenance overhead for you as the customer.  
Currently, you can add one Hosted GitOps Runtime per account.
For the architecture, see [Hosted GitOps Runtime architecture]({{site.baseurl}}/docs/installation/runtime-architecture/).

  
{% include
 image.html
 lightbox="true"
 file="/images/runtime/hosted-gitops-initial-view.png"
 url="/images/runtime/hosted-gitops-initial-view.png"
 alt="Hosted GitOps runtime setup"
 caption="Hosted GitOps runtime setup"
    max-width="80%"
%} 

  For more information on how to set up the hosted environment, including provisioning hosted runtimes, see [Set up Hosted GitOps]({{site.baseurl}}/docs/installation/gitops/hosted-runtime/).  

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

  For more information on Hybrid GitOps, see [Hybrid GitOps runtime requirements]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/#minimum-system-requirements) and [Installling Hybrid GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/hybrid-gitops/).  



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
|Dashboards               |Home                | Hosted runtime and deployments|Runtimes, deployments, Delivery Pipelines |
|                         |DORA metrics        | Supported                 |Supported        |
|                         |Applications        | Supported                 |Supported        |


##  Installation options comparison
Codefresh Runner and GitOps environments can co-exist giving you the best of both worlds. 

{: .table .table-bordered .table-hover}
| Characteristic | Hybrid Runner                | On Premise              | GitOps
| -------------- | ---------------------------- |-------------------------| ----------------|
| Managed by      | Codefresh and customer      | Customer                | Codefresh and customer |
| UI runs on      | Public cloud                | Private cluster          | Public cloud|
| Builds run on   | Private cluster             | Private cluster          | Private cluster (Hybrid)/Codefresh cluster (Hosted)|
| Access to secure/private services | Yes       | Yes                      | Yes |
| Customer maintenance effort | Some            | Full                     | Some |
| Best for        | Companies with security constraints  | Large scale installations | Companies with security constraints |
| Available to    |[Enterprise plans](https://codefresh.io/contact-us/){:target="\_blank"} | [Enterprise plans](https://codefresh.io/contact-us/) |[Enterprise plans](https://codefresh.io/contact-us/) |


## Related articles
[Architecture]({{site.baseurl}}/docs/installation/runtime-architecture/)  
[Add Git Sources to GitOps Runtimes]({{site.baseurl}}/docs/installation/gitops/git-sources/)   
[Shared configuration repository]({{site.baseurl}}/docs/installation/gitops/shared-configuration)  

