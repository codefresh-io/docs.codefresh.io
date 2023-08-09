---
title: "How To: use SSH keys in freestyle steps"
description: "Running commands remotely from Codefresh Pipeline"
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: true
categories: [Pipelines, Settings]
support-reviewed: 2023-04-18 LG
---

You can easily connect to external servers in Codefresh pipelines and run commands with them via SSH.

First, you need to create or find a Docker image with the SSH client. A good choice is [https://hub.docker.com/r/praqma/network-multitool](https://hub.docker.com/r/praqma/network-multitool){:target="\_blank"} as it has several other networking tools inside.

Then create a freestyle step in your pipeline like this:

{% raw %}

```yaml
 ssh:
   title: "Executing command over SSH"
   type: "freestyle"
   image: "praqma/network-multitool"
   commands:
     - mkdir /root/.ssh
     - echo ${{SSH_KEY}} | base64 -d > /root/.ssh/id_rsa ## Value of ${{SSH_KEY}} is base64 encoded
     - chmod 600 ~/.ssh/id_rsa
     - eval $(ssh-agent -s)
     - ssh-add ~/.ssh/id_rsa
     - ssh -o "StrictHostKeyChecking no"  ${{MY_USER}}@${{MY_HOST}}
     - ssh ${{MY_USER}}@${{MY_HOST}} 'uptime'
```

{% endraw %}

The pipeline expects some [variables]({{site.baseurl}}/docs/pipelines/variables/) called `SSH_KEY, MY_USER, MY_HOST` that you can enter directly in the pipeline or fetch from [shared configuration]({{site.baseurl}}/docs/pipelines/configuration/shared-configuration/).  

Replace `uptime`, with your own command that you want executed on the remote host.

## Related articles

[Troubleshooting common issues]({{site.baseurl}}/docs/kb/common-issues/)

[How to use SSH keys with GIT]({{site.baseurl}}/docs/integrations/git-providers/#ssh-keys)

[How to deploy with SCP]({{site.baseurl}}/docs/example-catalog/cd-examples/deploy-to-tomcat-via-scp/)

[How to deploy with FTP]({{site.baseurl}}/docs/example-catalog/cd-examples/transferring-php-ftp/)  
