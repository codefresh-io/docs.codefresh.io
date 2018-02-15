---
layout: docs
title: "Build badges-old"
description: ""
group: configure-ci-cd-pipeline
redirect_from:
  - /docs/build-badges-old
toc: true
old_url: /docs/build-badges-old
was_hidden: true
---
## Overview

Badges are simple images that show you the last build status. They support both the pipeline and branch service status.
The badges can be embedded into your repository’s `readme.md` file.

To start using badges, simply embed: 
`https://g.codefresh.io/api/badges/build?*param1*=xxx&*param2*=yyy`\\
when *param1*, *param2*, etc... are the parameters from the table below.

{: .table .table-bordered .table-hover}
| Query parameter        | Description                                              |
| -----------------------|--------------------------------------------------------- |
| **branch** - optional  | Name of the branch<br/>If not supplied, default is master   |
| **repoName**           | Name of the repository                                   |
| **pipelineName**       | Name of the pipeline                                     |
| **accountName**        | Name of the account                                      |
| **repoOwner**          | The name of the repository owner                         |
| **key** - optional     | Token related to the account                             |
| **type** - optional    | Badge types<br/>cf-1: ![Codefresh build status]( http://g.codefresh.io/api/badges/build/template/urls/cf-1) - also the default badge.<br/>cf-2: ![Codefresh build status]( http://g.codefresh.io/api/badges/build/template/urls/cf-2)   |

**The goal is to combine two links together into a markdown format. The format looks like:**\\
`[![Codefresh build status]( BADGE_LINK )]( URL_TO_PIPELINE )`

## Step 1: Assemble Badge Link

In order to assemble a badge link you need 4 parameters.
The first are`repoName`, `repoOwner` and `pipelineName`, which can be found in the service view as shown below:

{% include image.html 
lightbox="true" 
file="/images/f79bfe1-2016-12-29_1353.png" 
url="/images/f79bfe1-2016-12-29_1353.png" 
alt="2016-12-29_1353.png" 
max-width="40%" 
%}

The last parameter you need is `accountName`, which can be found in the top right menu:

{% include image.html 
lightbox="true" 
file="/images/245d05e-2016-12-29_1237.png" 
url="/images/245d05e-2016-12-29_1237.png" 
alt="2016-12-29_1237.png" 
max-width="40%" 
%}

Then, we assemble the link:
`https://g.codefresh.io/api/badges/build?branch=master&repoName=demochat&repoOwner=Superfresh&pipelineName=demochat&accountName=Superfresh`

## Step 2: Get the URL to the Pipeline
Navigate to your service and copy the`Builds` URL.

First copy the image URL like shown below:
`https://g.codefresh.io/repositories/REPO-OWNER/REPO-NAME/builds?filter=trigger:build`

{% include image.html 
lightbox="true" 
file="/images/97f154d-2016-12-29_1219.png" 
url="/images/97f154d-2016-12-29_1219.png" 
alt="2016-12-29_1219.png" 
max-width="40%" 
%}

Then copy the link for the build that will be triggered: 
`https://g.codefresh.io/repositories/containers101/demochat/builds?filter=trigger:build`


## Step 3: Add to Repository
Combine both URLs into the format stature and get the badge snippet.
For example:

`[![Codefresh build status]( https://g.codefresh.io/api/badges/build?branch=master&repoName=demochat&repoOwner=Superfresh&pipelineName=demochat&accountName=Superfresh )]( https://g.codefresh.io/repositories/containers101/demochat/builds?filter=trigger:build )`

Add the snippet to your markdown file `readme.md`.

You can see an example of a badge showing the status of the [demochat] application here: (https://github.com/containers101/demochat)

[![Codefresh build status](https://g-staging.codefresh.io/api/badges/build?branch=master&repoName=demochat&repoOwner=containers101&pipelineName=demochat&accountName=verchol)](https://g.codefresh.io/repositories/containers101/demochat/builds?filter=trigger:build)

## Private Repository (Adding a Badge Token)
If your service is private you will need to add an additional parameter `key` to the query. The key parameter can be found in your `Account Settings` under the `Tokens` tab. (To navigate to your account settings, click on account management in the top right menu.)

Call the URL to create a badge for your private service:

`https://g.codefresh.io/api/badges/build?branch=myBranch&repoName=my-repository&repoOwner=repositoryOwner&pipelineName=name-of-my-pipeline&accountName=myAccountName&key=**myToken**`
