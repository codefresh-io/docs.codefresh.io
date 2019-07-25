---
title: "Working Directories"
description: ""
group: codefresh-yaml
redirect_from:
  - /docs/working-directories/
toc: true
---
In the context of a step, a working directory can be of the following type:

{: .table .table-bordered .table-hover}
| Working Directory                                                                                                                             | Description                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Empty                                                                                                                                         | Defaults to the [Codefresh volume]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#sharing-the-workspace-between-build-steps) (found at `/codefresh/volume`). If there is a [git clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) with the special name `main_clone` then the default working directory is now the [project folder]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/#cloning-the-source-code) that was checked out.                                               |
| Variable that contains the ID of a [Git-Clone]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/) step          | Runs the step within the cloned directory. If you name your clone step as `main_clone` then all subsequent pipeline steps will automatically use that cloned directory as working directory.                                                                                                                                                                                        |
| Variable that contains the ID of any other step                                                                                               | Runs the step within the same working directory that the specified was executed.This option is not available for for [**Git-Clone**]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)  steps.     |
| Absolute filesystem path                                                                                                                      | Treated as is within the container.                                                                                                                                                                                               |
| Relative filesystem path                                                                                                                      | Treated as relative path from the cloned directory of the service                                                                                                                                                                 |
| 'IMAGE_WORK_DIR'                                                                                                                              | When using a freestyle step, by default the working directory will be the cloned directory of the service. Use this value in-order to use the image working directory for example:<br> `working_directory: IMAGE_WORK_DIR`         |


## What to read next

* [Introduction to Codefresh pipelines]({{site.baseurl}}/docs/configure-ci-cd-pipeline/introduction-to-codefresh-pipelines/)
* [Codefresh YAML]({{site.baseurl}}/docs/codefresh-yaml/what-is-the-codefresh-yaml/)
* [Clone step]({{site.baseurl}}/docs/codefresh-yaml/steps/git-clone/)
* [Codefresh Variables]({{site.baseurl}}/docs/codefresh-yaml/variables/)
