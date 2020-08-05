---
title: "Public logs and status badges"
description: "Embedding Status Images and viewing public logs"
group: configure-ci-cd-pipeline
toc: true
redirect_from:
  - /docs/build-status
  - /docs/build-status/
  - /docs/build-badges-1
  - /docs/build-badges-1/
---


Badges are simple images that show you the last build status. They support both the pipeline and branch service status.
The badges can be embedded into your repository’s `readme.md` file or any other website.

Here is an example:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/badges/badge.png" 
url="/images/pipeline/badges/badge.png"
alt="Build badge example" 
caption="Build badge example"
max-width="80%"
%}

Clicking the badge takes you into the build view of the pipeline.

## Finding the build badge of your project 

In the pipeline view of a project, select the *Settings* tab and then click *General*. Next to the *badges* section you will find a link to the build badge.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/badges/get-build-badge.png" 
url="/images/pipeline/badges/get-build-badge.png"
alt="Build badge setup" 
caption="Build badge setup"
max-width="80%"
%}

Click on it and you will get a new dialog where you can select

 * The graphical style of the badge (two styles are offered)
 * The syntax for the badge

{% include 
	image.html 
	lightbox="true" 
	file="/images/a0c4aed-codefresh_badges_2.png" 
	url="/images/a0c4aed-codefresh_badges_2.png" 
	alt="Codefresh badges syntax" 
	caption="Codefresh badges syntax"
	max-width="70%" 
	%}

 The following embedding options are available:

 * Markdown for usage in text files (e.g. `README.MD`)
 * Plain HTML for normal websites
 * AsciiDoc for documentation pages 
 * Image for any other document type


Copy the snippet in your clipboard.

## Using the build badge

Paste the snippet in the file/document where you want the badge to be visible (e.g. in a Readme file in GitHub).

For example, the markdown syntax is 

```
[![Codefresh build status]( BADGE_LINK )]( URL_TO_PIPELINE )
```

You can also manually change the parameters of the link by using 
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

Everybody who looks at your readme file will also see the current build status of the associated Codefresh pipeline.

## Public build logs

By default, even though the badge shows the build status for everybody, clicking the badge allows only Codefresh registered users that also have access to the pipeline to view the actual builds.

If you are working on an open-source project and wish for greater visibility, you can enable public logs (and associated badge) for your project so that any user can see the pipeline results (even if they are not logged into Codefresh).

Public logs are disabled by default and you need to explicitly enable them.

>This happens for security reasons. Make sure that the logs you are exposing to the Internet do not have any sensitive information. If you are unsure, you can still use the private badge that shows project status only as explained in the previous section.

To enable the public logs, toggle the respective switch in the pipeline settings:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/badges/toggle-public-logs.png" 
url="/images/pipeline/badges/toggle-public-logs.png"
alt="Enabling public logs" 
caption="Enabling public logs"
max-width="80%"
%}

Then click the *Save* button to apply changes for your pipeline. Once that is done you will also get a second badge (public) as well as the public URL to your project.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/badges/get-public-url.png" 
url="/images/pipeline/badges/get-public-url.png"
alt="Getting the public URL log view" 
caption="Getting the public URL log view"
max-width="70%"
%}

Now you can use this badge and/or public URL anywhere and all users can view your logs without being logged into Codefresh at all (or having access to your pipeline).

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/badges/view-public-logs.png" 
url="/images/pipeline/badges/view-public-logs.png"
alt="Public logs" 
caption="Public logs"
max-width="90%"
%}

Your visitors can also click on each individual pipeline step and see the logs for that step only.

If you are using Codefresh to manage a public project, you should also use the capability to [trigger builds from external forks]({{site.baseurl}}/docs/configure-ci-cd-pipeline/triggers/git-triggers/#support-for-building-pull-requests-from-forks).

## What to read next

* [Introduction to Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines)
* [Creating pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/pipelines/)
* [Monitoring pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/monitoring-pipelines/)
