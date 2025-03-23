---
title: "Runtime values file validation"
description: "Review how Codefresh GitOps validates Runtime's values file"
toc: true
---


## `values.yaml` file validation
The Codefresh `values.yaml` file available [here](https://github.com/codefresh-io/gitops-runtime-helm/blob/main/charts/installation/gitops/){:target="\_blank"}, contains all the arguments you can configure, including optional ones. 

Before initiating the installation, Codefresh automatically validates the `values.yaml` file to verify that the supplied values are correct.
A validation error will automatically terminate the installation.

You can disable automated validation globally for all installation settings, or for only the ingress controller for example, and run validation manually. 

## Validated settings
The table below lists the settings validated in the `values` file.

{: .table .table-bordered .table-hover}
|**Setting**              |**Validation**            | 
| --------------         | --------------           |  
|**userToken**            |If explicitly defined, or defined as a `secretKeyRef` which exists in the current K8s context and the defined namespace.|
|**Account permissions**  |If the user has admin permissions for the account in which they are installing the runtime. |
| **Runtime name**        |If defined, and is unique to the account. |
|**Access mode**          |{::nomarkdown}<ul><li>For tunnel-based (the default), if <code class="highlighter-rouge">accountId</code> is defined, and matches the account of the <code class="highlighter-rouge">userToken</code> defined in the file.</li><li>For ingress-based, if the hosts array contains at least one entry that is a valid URL (successful HTTP GET).</li><li>If both tunnel-based and ingress-based access modes are disabled, if <code class="highlighter-rouge">runtime.ingressUrl</code> is defined.</li></ul>{:/} |
|**gitCredentials**      |{::nomarkdown}<ul><li>When defined, if includes a Git password either explicitly, or as a <code class="highlighter-rouge">secretKeyRef</code>, similar to <code class="highlighter-rouge">userToken</code>.</li><li>The password or token has the required permissions in the Git provider.</li></ul>{:/} |

## Validation failures
If validation failes, Codefresh terminates the installation with the error:  
`Job has reached the specified backoff limit`  

For detailed information on the reason for the validation failure, run:  
`kubectl logs jobs/validate-values -n ${NAMESPACE}`  
where:  
* `{NAMESPACE}` must be replaced with the namespace of the Hybrid GitOps Runtime.

## Disable installation validation globally
You may want to disable automated validation globally for specific scenarios, such as to address false-negatives.

To disable validation globally, use either of these methods:
* Add the `--set installer.skipValidation=true` flag to the Helm install command
* Add `installer.skipValidation: true` to the `values.yaml` file

##### In install command 
`--set installer.skipValidation=true` 

##### In values file 
{% highlight yaml %}
{% raw %} 
...
installer: skipValidation: true
... 
{% endraw %}
{% endhighlight %}

## Disable ingress validation
Ingress validation checks if the ingress URL exists and responds to web requests. 
During a GitOps Runtime installation, the ingress might not be active yet, causing DNS errors despite correct configuration. Disabling ingress validation allows the installation to proceed, assuming the ingress will work once the Runtime is fully operational.

To disable only ingress validation, use either of these methods:
* Add the `--set global.runtime.ingress.skipValidation=true` flag to the Helm install command
* Add `global.runtime.ingress.skipValidation: true` to the `values.yaml` file.

##### In install command

`--set global.runtime.ingress.skipValidation=true`

##### In values file 

{% highlight yaml %}
{% raw %} 
...
global:
  runtime:
    ingress:
      skipValidation: true
... 
{% endraw %}
{% endhighlight %}

## Disable validation for custom/fine-grained Git tokens
When using token with custom scopes, or GitHub's fine-grained tokens (currently not officially supported by Codefresh), _skip token validation_ to avoid validation failures during installation.  

Add the `skipGitPermissionValidation` flag to your `values.yaml` file: 

```yaml
app-proxy:
  config:
    skipGitPermissionValidation: "true"
```

If you set this flag, make sure that:
1. The Git user token defined for the GitOps Runtime (the token defined for `runtime-repo-creds-secret`), has read and write access to the Shared Configuration Repository.
1. The Git user tokens for the different Git repositories associated with the Runtimes have read and write permissions to those Git repositories they expect to write to and read from.  
  For details on using multiple `repo-creds` secrets, see [Argo CD Repositories](https://argo-cd.readthedocs.io/en/stable/operator-manual/declarative-setup/#repositories).

For details on Git token usage, see [Git tokens]({{site.baseurl}}/docs/security/git-tokens/).

## Manually validate values.yaml file
To manually validate the values file, run:  
`cf helm validate --values <values_file> --namespace <namespace> --version <version>`  
where:  
* `<values_file>` is the name of the `values.yaml` file used by the Helm installation.
* `<namespace>` is the namespace in which to install the Hybrid GitOps runtime, either the default `codefresh`, or the custom name you intend to use for the installation. The Namespace must conform to the naming conventions for Kubernetes objects.
* `<version>` is the version of the runtime to install.


## Install first GitOps Runtime in account
If you are installing the first GitOps Runtime in your Codefresh account, follow the installation wizard for guided instructions.

