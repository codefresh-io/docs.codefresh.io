---
title: "Install CLI"
description: ""
group: clients
toc: true
---



{: .table .table-bordered .table-hover}
|  Download mode |  OS       | Command |
| -------------- | ----------| ----------|  
| `Curl`         | MacOS-x64 |  `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-amd64.tar.gz | tar zx && mv ./cf-darwin-amd64 /usr/local/bin/cf && cf version`|
|             | MacOS-m1 |`curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-darwin-arm64.tar.gz | tar zx && mv ./cf-darwin-arm64 /usr/local/bin/cf && cf version` |          
|             | Linux - X64 |`curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-amd64.tar.gz | tar zx && mv ./cf-linux-amd64 /usr/local/bin/cf && cf version` |       
|              | Linux - ARM  |  `curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-arm64.tar.gz | tar zx && mv ./cf-linux-arm64 /usr/local/bin/cf && cf version`|     
| `Brew` | N/A| `brew tap codefresh-io/cli && brew install cf2`|
