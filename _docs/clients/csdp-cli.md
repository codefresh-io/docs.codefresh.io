---
title: "Download CLI"
description: ""
group: clients
toc: true
---

You need the CSDP CLI to install CSDP runtimes. For the initial download, you also need to generate the API key and create the API authentication context, all from the CSDP UI.  

Subsequent downloads for upgrade purposes require you to only run the download command, using existing API credentials. 

### Download CSDP CLI
Downloading the CSDP CLI requires you to select the download mode and OS, generate an API key, and authentication context.
1. In the Welcome page, select **+ Install Runtime**.
1. Download the Codefresh CLI:
  * Select one of the methods. 
  * Generate the API key and create the authentication context. 
    {% include 
   image.html 
   lightbox="true" 
   file="/images/getting-started/quick-start/quick-start-download-cli.png" 
   url="/images/getting-started/quick-start/quick-start-download-cli.png" 
   alt="Download CLI to install runtime" 
   caption="Download CLI to install runtime"
   max-width="30%" 
   %} 

### Upgrade CSDP CLI
* To upgrade the CLI, select and run the appropriate command:

{: .table .table-bordered .table-hover}
| Download mode | OS       | Commands |
| -------------- | ----------| ----------|  
| `curl`         | MacOS-x64 |  `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-amd64.tar.gz | tar zx && mv ./cf-darwin-amd64 /usr/local/bin/cf && cf version`|
|             | MacOS-m1 |`curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-arm64.tar.gz | tar zx && mv ./cf-darwin-arm64 /usr/local/bin/cf && cf version` |          
|             | Linux - X64 |`curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-amd64.tar.gz | tar zx && mv ./cf-linux-amd64 /usr/local/bin/cf && cf version` |       
|              | Linux - ARM  |  `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-arm64.tar.gz | tar zx && mv ./cf-linux-arm64 /usr/local/bin/cf && cf version`|     
| `brew` | N/A| `brew tap codefresh-io/cli && brew install cf2`|

