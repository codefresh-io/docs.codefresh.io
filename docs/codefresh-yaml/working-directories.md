---
layout: docs
title: "Working Directories"
description: ""
group: codefresh-yaml
redirect_from:
  - /docs/working-directories
toc: true
---
In the context of a step, a working directory can be of the following type:

{: .table .table-bordered .table-hover}
| Working Directory                                                                                                                             | Description                                                                                                                                                                                                                       |
| --------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Empty                                                                                                                                         | Defaults to the cloned directory of the service. Also can be available by variable {% raw %}`${{main_clone}}`{% endraw %}                                                                                                         |
| Variable that contains the ID of a [Git-Clone]({{ site.baseurl }}/docs/codefresh-yaml/steps/git-clone/) step          | Runs the step within the cloned directory.                                                                                                                                                                                        |
| Variable that contains the ID of any other step                                                                                               | Runs the step within the same working directory that the specified was executed.This option is not available for for [**Git-Clone**]({{ site.baseurl }}/docs/codefresh-yaml/steps/git-clone/)  steps.     |
| Absolute filesystem path                                                                                                                      | Treated as is within the container.                                                                                                                                                                                               |
| Relative filesystem path                                                                                                                      | Treated as relative path from the cloned directory of the service                                                                                                                                                                 |
| 'IMAGE_WORK_DIR'                                                                                                                              | When using a freestyle step, by default the working directory will be the cloned directory of the service. Use this value in-order to use the image working directoryfor example:<br> `working_directory: IMAGE_WORK_DIR`         |
