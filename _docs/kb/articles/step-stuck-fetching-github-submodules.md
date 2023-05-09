---
title: "Step stucked fetching submodules (Github)"
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

Step in the build is stucked waiting for the input with following output:

```shell
The authenticity of host 'github.com (140.82.118.4)' can't be established.                                                                                       
RSA key fingerprint is SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8.                                                                                       
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

## Details

There is no github server key added inside known_host

Add extra step with following content:

```yaml
title: Fetch submodules
working_directory: ${{main_clone}}
image: codefreshio/git-image:latest
commands:
  - mkdir ~/.ssh
  - echo ${{SSH_KEY}} > ~/.ssh/id_rsa
  - chmod 600 ~/.ssh/id_rsa
  - sudo ssh-keyscan -t rsa github.com >> ~/.ssh/known_hosts
```

Where `${{SSH_KEY}}` is your SSH private key

## Related Items

You can find more information about this topic in the following links:

* [Working with GIT submodules]({{site.baseurl}}/docs/pipelines/steps/git-clone/#working-with-git-submodules)
