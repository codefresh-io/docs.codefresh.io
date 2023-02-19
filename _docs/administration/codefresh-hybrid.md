---
title: "Codefresh Hybrid Installation (Legacy)"
description: "Add your own Node to run/build containers"
group: administration
redirect_from:
  - /docs/add-your-node-to-runbuild-containers/
  - /docs/enterprise/codefresh-hybrid/
toc: true
old_url: /docs/add-your-node-to-runbuild-containers
---

>Note that this page is now describing the legacy hybrid mode. For the new version read more at [behind-the-firewall]({{site.baseurl}}/docs/administration/behind-the-firewall/).

Codefresh lets you use your own host as a node to run/build containers.

{:start="1"}
1.  Go to your account configurations by clicking on *Account Settings* on the left sidebar.

{:start="2"}
2. Select *Nodes* from the left sidebar.

> Hybrid nodes are only available to enterprise customers. [Contact us](https://codefresh.io/contact-us/) us to enable this feature.

{% include image.html
  lightbox="true"
  file="/images/administration/hybrid-node/add-hybrid-node.png"
  url="/images/administration/hybrid-node/add-hybrid-node.png"
  alt="Adding a hybrid build node"
  caption="Adding a hybrid build node"
  max-width="60%"
    %}

{:start="3"}
3. Click on *ADD YOUR NODE*
Codefresh lets you use your own host as a build agent to run/build containers. In order to do this, you have to first install the Codefresh Agent on your machine.

The following Linux distributions are supported:

- Ubuntu 14.04, 15.04, 16.04
- Debian 8
- Centos 7+
- RedHat Linux 7
- Fedora 21, 22

In order for Codefresh to communicate with the Docker daemon running on your node, port `tcp:2376` should be open on your node's firewall.

{% include image.html
lightbox="true"
file="/images/ad2e504-917195e-codefresh_add_private_node.png"
url="/images/ad2e504-917195e-codefresh_add_private_node.png"
alt="917195e-codefresh_add_private_node.png"
max-width="80%"
%}

**Note:** You need to provide the public IP address of the node.

