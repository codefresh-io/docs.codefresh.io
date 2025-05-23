---
title: "System requirements"
description: "Review minimum requirements for GitOps Runtimes"
toc: true
---

Before installing the GitOps Runtime, ensure your environment meets the necessary system requirements, such as the Kubernetes cluster server version and minimum resource requirements needed for a smooth and successful installation. 

Depending on your installation mode, you also need to complete the [prerequisites]({{site.baseurl}}/docs/installation/gitops/runtime-prerequisites/) before installing the Runtime.

## Minimum system requirements

{: .table .table-bordered .table-hover}
| Item                     | Requirement            |
| --------------         | --------------           |
|Kubernetes cluster      | Server version 1.23 or higher {::nomarkdown}<br><b>Tip</b>: To check the server version, run:<br> <code class="highlighter-rouge">kubectl version --short</code>{:/}|
|Helm| 3.8.0 or higher|
|Argo CD | For installing with an existing Argo CD instance, Codefresh supports the current version and the previous two versions. {::nomarkdown}<ul><li>2.14</li><li>2.13</li><li>2.12</li></ul>{:/}|
|Node requirements| {::nomarkdown}<ul><li>Memory: 5000 MB</li><li>CPU: 2</li></ul>{:/}|
|Cluster permissions | Cluster admin permissions |
|Git providers    |{::nomarkdown}{% if page.collection != site.gitops_collection %}<ul><li>GitHub</li><li>GitHub Enterprise</li><li>GitLab Cloud</li><li>GitLab Server</li><li>Bitbucket Cloud</li><li>Bitbucket Data Center</li></ul>{% endif %}{% if page.collection == site.gitops_collection %}<ul><li>GitHub</li>{% endif %}{:/}|
|Git access tokens    | {::nomarkdown}Git Runtime token:<ul><li>Valid expiration date</li><li><a href="https://codefresh.io/docs/docs/security/git-tokens/#git-runtime-token-scopes">Scopes</a> </li></ul></ul>{:/}|
| |Git user token:{::nomarkdown}<ul><li>Valid expiration date</li><li><a href="https://codefresh.io/docs/docs/security/git-tokens/#git-user-access-token-scopes">Scopes</a> </li></ul>{:/}|
|Egress for air-gapped clusters |{::nomarkdown}<ul><li>Codefresh platform:<br>HTTPS egress to platform through <a href="https://codefresh.io/docs/docs/administration/platform-ip-addresses/#platform-ip">allowed list of IP addresses</a></li><li>Repository access:<br>Egress to Git, Helm, OCI repos accessed by Argo CD via HTTP, HTTPS, or SSH, as appropriate</li><li>Domains for Helm charts: <br>Access to the following domains:<br><ul><li>github.com</li><li>github.io</li><li>quay.io</li><li>ghcr.io</li><li>docker.io</li><li>ecr.aws</li></ul></li></ul>{:/}|


## Related articles
[Runtime prerequisites ]({{site.baseurl}}/docs/installation/gitops/runtime-prerequisites/)  
[Install GitOps Runtime with existing Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-existing-argo-cd/)  
[Install GitOps Runtime with new Argo CD]({{site.baseurl}}/docs/installation/gitops/runtime-install-with-new-argo-cd/)  
 


