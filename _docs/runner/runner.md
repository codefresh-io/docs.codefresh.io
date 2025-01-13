---
title: "Codefresh Runner for pipelines"
description: "Run Codefresh pipelines on your private Kubernetes cluster"
group: runner
redirect_from:
  - /docs/administration/codefresh-runner/
  - /docs/enterprise/codefresh-runner/
  - /docs/administration/codefresh-hybrid/
  - /docs/installation/
toc: true
---



The Hybrid Runner installation for Codefresh pipelines is for organizations who want their source code to live within their premises, or have other security constraints. For implementation details, see [Runner installation behind firewalls]({{site.baseurl}}/docs/installation/runner/behind-the-firewall).  
The UI runs on Codefresh infrastructure, while the builds happen on a Kubernetes cluster in the customer's premises.

{% include image.html
  lightbox="true"
  file="/images/installation/hybrid-installation.png"
  url="/images/installation/hybrid-installation.png"
  caption="Hybrid Runner installation.png"
  alt="Hybrid Runner installation.png"
  max-width="70%"
    %}    


Hybrid Runner strikes the perfect balance between security, flexibility, and ease of use. Codefresh still does the heavy lifting for maintaining most of the platform parts. Sensitive data such as source code and internal services never leave customer premises.  
Codefresh can easily connect to internal [secure services]({{site.baseurl}}/docs/installation/behind-the-firewall/#using-secure-services-in-your-pipelines) that have no public presence.
The UI is compliant with Soc2.
  

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
| Deployment secrets (from Git/Puppet/Vault etc) | Stay behind the firewall|  |
| Audit logs | Managed via Codefresh Web application |  |
| SSO/Idp Configuration | Managed via Codefresh Web application |  |
| User emails | Managed via Codefresh Web application |  |
| Access control rules | Managed via Codefresh Web application | |


## Related articles
[Codefresh pricing](https://codefresh.io/pricing/){:target="\_blank"}  
[Codefresh features](https://codefresh.io/features/){:target="\_blank"}  