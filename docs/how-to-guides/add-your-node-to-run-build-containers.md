---
layout: docs
title: "Add your Node to run/build containers"
description: ""
group: how-to-guides
redirect_from:
  - /docs/add-your-node-to-runbuild-containers
  - /docs/add-your-node-to-runbuild-containers
toc: true
old_url: /docs/add-your-node-to-runbuild-containers
---
Codefresh lets you use your own host as a node to run/build containers.

{:start="1"} 
1. Go to the __Account Settings__

{% include image.html 
lightbox="true" 
file="/images/ba652cc-Account_Settings.png" 
url="/images/ba652cc-Account_Settings.png"
alt="Account Settings.png"
max-width="40%"
%}

{:start="2"}
2. Go to the tab __Nodes__

{{site.data.callout.callout_info}}
Require a request to expose this feature on your account. Contact with us to enable this feature. 
{{site.data.callout.end}}

{% include image.html 
lightbox="true" 
file="/images/3f37c72-codefresh_account_nodes.png" 
url="/images/3f37c72-codefresh_account_nodes.png"
alt="codefresh_account_nodes.png"
max-width="40%"
%}

{:start="3"}
3. Click on the button __ADD YOUR NODE__
Codefresh lets you use your own host as a node to run/build containers. In order to do this, you have to first install the Codefresh Agent on your machine.

The following Linux distributions are supported:
- Ubuntu 14.04, 15.04, 16.04
- Debian 8
- Centos 7+
- RedHat Linux 7
- Fedora 21, 22

In order for Codefresh to communicate with the Docker daemon running on your node port `tcp:2376` should be open on your node's firewall.

{% include image.html 
lightbox="true" 
file="/images/ad2e504-917195e-codefresh_add_private_node.png" 
url="/images/ad2e504-917195e-codefresh_add_private_node.png"
alt="917195e-codefresh_add_private_node.png"
max-width="40%"
%}

{{site.data.callout.callout_info}}
You need to provide the public IP address of the node. 
{{site.data.callout.end}}
