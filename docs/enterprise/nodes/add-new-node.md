---
layout: docs
title: "Add New Node"
description: ""
group: enterprise
sub_group: nodes
redirect_from:
  - /docs/add-new-node
  - /docs/add-new-node
toc: true
old_url: /docs/add-new-node
---
This procedure launches docker-node instance and registers it in Codefresh - make it available for user's builds and runs.
{:start="1"}
1. Go to __Admin Management__

{% include image.html
lightbox="true"
file="/images/827bd1e-codefresh_admin_management.png"
url="/images/827bd1e-codefresh_admin_management.png"
alt="codefresh_admin_management.png"
max-width="40%"
%}

{:start="2"}
2. Go to tab **Nodes**

{% include image.html
lightbox="true"
file="/images/cc5b518-codefresh_admin_nodes.png"
url="/images/cc5b518-codefresh_admin_nodes.png"
alt="codefresh_admin_nodes.png"
max-width="40%"
%}

{:start="3"}
3. Click on the button **Create new service**

{% include image.html
lightbox="true"
file="/images/3319b20-codefresh_creating_node.png"
url="/images/3319b20-codefresh_creating_node.png"
alt="codefresh_creating_node.png"
max-width="40%"
%}

{: .table .table-bordered .table-hover}
| Parameter           | Selection Note                                                                                                                                            | Explanation                                                                                                                             |
|:--------------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------|
| Provider            | aws, gce                                                                                                                                                  | aws - Amazon Web Service <br> sgce - Google Compute Engine                                                                              |
| Service Type        | Select "docker-node-us-east-1"  for node in us-east-1 (virginia) regions                                                                                  | {% raw %}`docker-node-${{region}}`{% endraw %} <br> {% raw %}`${{region}}`{% endraw %} - one of regions from list of Amazon API Gateway |
| Service Role        | Runner, Builder or DIND Node                                                                                                                              |                                                                                                                                         |
| Runtime Environment | Select runtimeEnvironment of the account - "Runtime Env" column in `Admin` &#8594; `Accounts`                                                             |                                                                                                                                         |
| Machine Type        | Leave default or select by [http://www.ec2instances.info/](http://www.ec2instances.info/){:target="_blank"}                                               | [http://www.ec2instances.info/](http://www.ec2instances.info/){:target="_blank"}                                                        |
| Volume Size         | Leave blank - will create 200Gb volume (defined in chef) <br>You can enter another size in Gb here                                                        |                                                                                                                                         |
| Subnet              | Leave blank                                                                                                                                               | Amazon SubnetID , default is defined in chef                                                                                            |
| DNS CNAME           | Leave blank for dns name by machine name - like cf-aue1-docker-node-0008.cf-cd.com <br> Or enter name in .cf-cd.com. domain , Example: "codefresh-inc-25" | Use it carefully - entered CNAME should be unique in cf-cd.com domain, otherwise it will be overwritten                                 |

The node will be available for user's builds/runs once its status changed to "running". As usual, it takes 2-5 minutes
