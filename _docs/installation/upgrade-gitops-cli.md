---
title: "Download/upgrade Codefresh CLI"
description: "Have the latest version of the Codefresh CLI for GitOps runtimes"
group: installation
toc: true
---

You need the Codefresh CLI to install Hybrid GitOps Runtimes, and have access to all the newest features. 
For the initial download, you need to generate an API key and create the API authentication context, which you do from the UI.  
When newer versions are available, the CLI automatically notifies you through a banner. You can use the existing API credentials for the upgrade. 


## GitOps CLI installation modes
The table lists the modes available to install the Codefresh CLI.

{: .table .table-bordered .table-hover}
| Install mode | OS       | Commands |
| -------------- | ----------| ----------|  
| `curl`         | MacOS-x64 |  `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-amd64.tar.gz | tar zx && mv ./cf-darwin-amd64 /usr/local/bin/cf && cf version`|
|             | MacOS-m1 |`curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-arm64.tar.gz | tar zx && mv ./cf-darwin-arm64 /usr/local/bin/cf && cf version` |          
|             | Linux - X64 |`curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-amd64.tar.gz | tar zx && mv ./cf-linux-amd64 /usr/local/bin/cf && cf version` |       
|              | Linux - ARM  |  `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-arm64.tar.gz | tar zx && mv ./cf-linux-arm64 /usr/local/bin/cf && cf version`|     
| `brew` | N/A| `brew tap codefresh-io/cli && brew install cf2`|````

## Install the GitOps CLI
Install the Codefresh CLI using the option that best suits you: `curl`, `brew`, or standard download.  
If you are not sure which OS to select for `curl`, simply select one, and Codefresh automatically identifies and selects the right OS for CLI installation.

1. Do one of the following:
  * For first-time installation, go to the Welcome page, select **+ Install Runtime**.
  * If you have provisioned a GitOps Runtime, in the Codefresh UI, go to [GitOps Runtimes](https://g.codefresh.io/2.0/account-settings/runtimes){:target="\_blank"}, and select **+ Add Runtime**.
1. Install the Codefresh CLI:
  * Select one of the installation modes. 
  * Generate the API key.
  * Create the authentication context:
    `cf config create-context codefresh --api-key <generatedKey>` 
  

    {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-download-cli.png" 
   url="/images/getting-started/quick-start/quick-start-download-cli.png" 
   alt="Download CLI to install runtime" 
   caption="Download CLI to install runtime"
   max-width="30%" 
   %} 


{::nomarkdown}
</br></br>
{:/}


## Upgrade the GitOps CLI

The Codefresh CLI automatically self-checks its version, and if a newer version is available, prints a banner with the notification.  

 {% include
    image.html
  lightbox="true"
  file="/images/runtime/cli-upgrade-banner.png"
  url="/images/runtime/cli-upgrade-banner.png"
  alt="Upgrade banner for Codefresh CLI"
  caption="Upgrade banner for Codefresh CLI"
  max-width="40%"
  %}


You can upgrade to a specific version if you so require, or download the latest version to an output folder to upgrade at your convenience.


* Do any of the following:
  * To upgrade to the latest version, run:
    `cf upgrade`
  * To upgrade to a specific version, even an older version, run:  
    `cf upgrade --version v<version-number>`  
    where:  
    `<version-number>` is the version you want to upgrade to.
  * To download the latest version to an output file, run:
    `cf upgrade --version v<version-number> -o <output-file>`  
    where:   
    * `<output-file>` is the path to the destination file, for example, `/cli-download`.

## Related articles
[Hosted GitOps Runtime setup]({{site.baseurl}}/docs/installation/hosted-runtime)  
[Hybrid GitOps Runtime installation]({{site.baseurl}}/docs/installation/hybrid-gitops)  
