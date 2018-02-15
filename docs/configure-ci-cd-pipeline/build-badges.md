---
layout: docs
title: "Build badges"
description: ""
group: configure-ci-cd-pipeline
permalink: /:path/build-status/
redirect_from:
  - /docs/build-status
toc: true
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

**The goal is to combine two links together into a markdown format. The format looks like:**  
`[![Codefresh build status]( BADGE_LINK )]( URL_TO_PIPELINE )`

## Step 1: Assemble Badge Link

{:start="1"}
1. Go to the **Pipelines** of your service

{:start="2"}
2. Click on the badges icon
{% include image.html lightbox="true" file="/images/495e01c-codefresh_badges_1.png" url="/images/495e01c-codefresh_badges_1.png" alt="Codefresh badges" max-width="40%" %}

{:start="3"}
3. Select the branch, choose the type
{% include image.html lightbox="true" file="/images/a0c4aed-codefresh_badges_2.png" url="/images/a0c4aed-codefresh_badges_2.png" alt="Codefresh badges" max-width="40%" %}

{:start="4"}
4. Copy badge in one of the formats
  - Markdown
  - Image URL
  - HTML
  - AsciiDoc
  
## Step 2: Add to repository
Copy the markdown badge snippet.\\
For example:

`[![Codefresh build status]( https://g.codefresh.io/api/badges/build?branch=master&repoName=demochat&repoOwner=Superfresh&pipelineName=demochat&accountName=Superfresh )]( https://g.codefresh.io/repositories/containers101/demochat/builds?filter=trigger:build;branch:master;service:58920dc51c892f0100682b62~demochat  )`

Add the snippet to your markdown file `readme.md`.

You can see an example of a badge showing the status of the [demochat] application here: [https://github.com/containers101/demochat](https://github.com/containers101/demochat)

[![Codefresh build status]( https://g-staging.codefresh.io/api/badges/build?branch=master&repoName=demochat&repoOwner=containers101&pipelineName=demochat&accountName=verchol )]( https://g.codefresh.io/repositories/containers101/demochat/builds?filter=trigger:build )
