---
title: "How to use SSH keys in freestyle steps"
description: "Running commands remotely from Codefresh Pipeline"
group: troubleshooting
sub_group: common-issues
toc: true
---

You can easily connect to external servers in Codefresh pipelines and run commands with them via SSH.

First, you need to create or find a Docker image with the SSH client. A good choice is [https://hub.docker.com/r/praqma/network-multitool] as it has several other networking tools inside.

Then create a freestyle step in your pipeline like this:


{% highlight yaml %}
{% raw %}
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
     - ssh -o "StrictHostKeyChecking no"  user@host
     - ssh user@host 'command'
{% endraw %}
{% endhighlight %}


The pipeline expects a [variable]({{site.baseurl}}/docs/codefresh-yaml/variables/) called “SSH” that you can enter directly or fetch from [shared configuration]({{site.baseurl}}/docs/configure-ci-cd-pipeline/shared-configuration/).

Replace user, host, and command with your own values.

## What to read next

* [How to use SSH keys with GIT]({{site.baseurl}}/docs/docs/integrations/git-providers/#ssh-keys)
* [How to deploy with SCP]({{site.baseurl}}/docs/docs/yaml-examples/examples/deploy-to-tomcat-via-scp/)
* [How to deploy with FTP]({{site.baseurl}}/docs/docs/yaml-examples/examples/transferring-php-ftp/)




