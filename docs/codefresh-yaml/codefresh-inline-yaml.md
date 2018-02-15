---
layout: docs
title: "Codefresh inline YAML"
description: ""
group: codefresh-yaml
permalink: /:path/codefresh-inline-yaml/
redirect_from:
  - /docs/inline-yaml-editing
toc: true
---
Codefresh allows you to select between several options for YAML origin. You can use a codefresh YAML from your repository or  Create and edit a new YAML inline.
Inline yaml, allows you to work on your yaml file, apply changes to your pipeline and test it without committing to the source code for each change.

## Configure pipeline using YAML
To build your pipeline using a codefresh YAML file, in the workflow section, toggle the configuration method to  ```YAML``` position.
{% include image.html lightbox="true" file="/images/788b512-Screen_Shot_2017-10-16_at_9.50.48_PM.png" url="/images/788b512-Screen_Shot_2017-10-16_at_9.50.48_PM.png" alt="Screen Shot 2017-10-16 at 9.50.48 PM.png" max-width="40%" %}

## Create advanced workflows by editing codefresh YAML inline
Use our inline YAML option to create and edit a codefresh YAML inline.

{:.text-secondary}
### Create Codefresh YAML from scratch
{:start="1"}
1. Select *'Inline YAML'* option.

{:start="2"}
2. Type in your YAML
{% include image.html lightbox="true" file="/images/4a82e02-Screen_Shot_2017-10-16_at_10.17.17_PM.png" url="/images/4a82e02-Screen_Shot_2017-10-16_at_10.17.17_PM.png" alt="Screen Shot 2017-10-16 at 10.17.17 PM.png" max-width="40%" %}

{:.text-secondary}
### Enrich basic workflow with advanced settings
After defining basic workflow using codefresh UI, you can enrich it with some advanced settings using *'inline YAML'* option.

{:start="1"}
1. Define workflow steps using basic workflow configuration
{% include image.html lightbox="true" file="/images/5efdffc-Screen_Shot_2017-10-16_at_10.23.50_PM.png" url="/images/5efdffc-Screen_Shot_2017-10-16_at_10.23.50_PM.png" alt="Screen Shot 2017-10-16 at 10.23.50 PM.png" max-width="40%" %}

{:start="2"}
2. Switch workflow to YAML mode and select inline YAML option

{:start="3"}
3. Your workflow will be translated to codefresh YAML

{:start="4"}
4. Add advanced settings (for example - add image annotations) by editing the basic YAML
{% include image.html lightbox="true" file="/images/318b88b-Screen_Shot_2017-10-16_at_10.37.56_PM.png" url="/images/318b88b-Screen_Shot_2017-10-16_at_10.37.56_PM.png" alt="Screen Shot 2017-10-16 at 10.37.56 PM.png" max-width="40%" %}

## Use a codefresh.yml from your repo
if you have a codefresh YAML in your repository, select *"Use YAML from Repository"* option. 
Enter path to your codefresh.YML file. The path must be relative to the repository root directory.
{% include image.html lightbox="true" file="/images/4035af3-Screen_Shot_2017-10-16_at_10.10.15_PM.png" url="/images/4035af3-Screen_Shot_2017-10-16_at_10.10.15_PM.png" alt="Screen Shot 2017-10-16 at 10.10.15 PM.png" max-width="40%" %} 

## Share single codefresh YAML across different pipelines
If you use the same YAML file for different repositories, you can use this option to point to a public url where the yaml resides. This way you can use the same yaml for multiple pipeline and update once when needed.

{% include image.html lightbox="true" file="/images/e6a4188-Screen_Shot_2017-10-23_at_6.58.06_PM.png" url="/images/e6a4188-Screen_Shot_2017-10-23_at_6.58.06_PM.png" alt="Screen Shot 2017-10-23 at 6.58.06 PM.png" max-width="40%" %}

The url that you enter must be a public url of a raw YAML file. For example, if you want to add a link to a yaml file located in a public Github repo, you can use the 'Raw' option from the editor menu:
{% include image.html lightbox="true" file="/images/b4edbf2-Screen_Shot_2017-10-25_at_11.31.21_AM.png" url="/images/b4edbf2-Screen_Shot_2017-10-25_at_11.31.21_AM.png" alt="Screen Shot 2017-10-25 at 11.31.21 AM.png" max-width="40%" %}
