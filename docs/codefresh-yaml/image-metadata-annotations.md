---
layout: docs
title: "Image Metadata Annotations"
description: ""
group: codefresh-yaml
permalink: /:path/metadata-annotations/
redirect_from:
  - /docs/metadata-annotations
  - /docs/metadata-annotations
toc: true
---
Images built by Codefresh can be annotated with customized metadata.
This article explains how to create advanced view of your images and enrich them with custom metadata which perfectly fits your flow and image management process.

{% include image.html lightbox="true" file="/images/72f58a8-Screen_Shot_2017-10-17_at_1.55.17_PM.png" url="/images/72f58a8-Screen_Shot_2017-10-17_at_1.55.17_PM.png" alt="Screen Shot 2017-10-17 at 1.55.17 PM.png" max-width="40%" %}

## Metadata types
Images built by Codefresh can be annotated with an array of key-value metadata.
Metadata values may be of the following types:

{: .table .table-bordered .table-hover}
| Annotation type | Guidelines                                       | Example                                                  |
| --------------- | ------------------------------------------------ | -------------------------------------------------------- |
| String          | Use string                                       | 'Example note'                                           |
| Number          | use numeric value to set this kind of annotation  | 9999                                                    |
| Boolean         | Use true / false value                           | true                                                     |
| Percentage bar  | use 0-100 value ending with %                     | 85%                                                     |
| Link            | use url                                           | {% raw %}`${{CF_COMMIT_URL}}`{% endraw %}               |
                                           
You can also use [Expression evaluations]({{ site.baseurl }}/docs/codefresh-yaml/expression-condition-syntax/) to set metadata.

## Annotate your images using codefresh YAML
You can annotate an image as part of it's builds process and also on post build steps.

{:.text-secondary}
### Build step Image Metadata Annotation
You can annotate an image as part of its build process by declaring the metadata value on the [Build step]({{ site.baseurl }}/docs/codefresh-yaml/steps/build-1/):
1. The `metadata` attribute
2. The `set` operation
3. An array of key-value metadata

  `build-metadata-annotation`
{% highlight yaml %}
build_step:
  type: build
  ...
  metadata: # Declare the metadata attribute
    set: # Specify the set operation
      - qa: pending
      - commit_message: {% raw %}${{CF_COMMIT_MESSAGE}}{% endraw %}
      - exit_code: 0
      - is_main: 
          evaluate: "{% raw %}'${{CF_BRANCH}}{% endraw %}' == 'main'"
{% endhighlight %}

{:.text-secondary}
### Adding annotations to Built images on post-build steps
Any step in the YAML workflow can annotate built images by using [Post-Step Operations]({{ site.baseurl }}/docs/codefresh-yaml/post-step-operations/).
To annotate a built image, configure any step with:
1. The post-step operation
2. The `metadata` attribute
3. The `set` operation
4. A list of target images with the variable syntax of {% raw %}`${{build_step_name.imageId}}`{% endraw %}
5. An array of key-value metadata

  `annotating-step`
{% highlight yaml %}
build_step:
  type: build
  ...

any_step:
  ...
  on_success: # Execute only once the step succeeded
    metadata: # Declare the metadata attribute
      set: # Specify the set operation
        - {% raw %}${{build_step.imageId}}{% endraw %}: # Select any number of target images
          - qa: pending
          
  on_fail: # Execute only once the step failed
    metadata: # Declare the metadata attribute
      set: # Specify the set operation
        - {% raw %}${{build_step.imageId}}{% endraw %}: # Select any number of target images
          - exit_code: 1

  on_finish: # Execute in any case
    metadata: # Declare the metadata attribute
      set: # Specify the set operation
        - {% raw %}${{build_step.imageId}}{% endraw %}: # Select any number of target images
          - is_main: 
              evaluate: "{% raw %}'${{CF_BRANCH}}'{% endraw %} == 'main'"
{% endhighlight %}

## Viewing Image Metadata Annotations
You can view an image's metadata annotation by:
1. Navigating to the `Images` view
2. Selecting the target image
3. Selecting the `Annotations` tab

{% include image.html lightbox="true" file="/images/7d4f8f7-Screen_Shot_2017-10-08_at_8.28.35_AM.png" url="/images/7d4f8f7-Screen_Shot_2017-10-08_at_8.28.35_AM.png" alt="Screen Shot 2017-10-08 at 8.28.35 AM.png" max-width="40%" %}

In addition, you can add selected annotations to the images table on images page. To display an annotation in the image table, click on the gear icon at the top right corner of image page and then select all annotations you want to display.

{% include image.html lightbox="true" file="/images/aec92e8-Screen_Shot_2017-10-17_at_3.01.26_PM.png" url="/images/aec92e8-Screen_Shot_2017-10-17_at_3.01.26_PM.png" alt="Screen Shot 2017-10-08 at 8.28.35 AM.png" max-width="40%" %}

## Example - Quality Image Metadata Annotation
You can set a quality indicator to images to show if they passed or failed tests. An image with the boolean annotation `CF_QUALITY` set to true will have a quality indicator in the 'Images' view. 

  `YAML`
{% highlight yaml %}
version: '1.0'
steps:
  build_step:
    type: build
    image_name: myrepo/imagename
    working_directory: ./
    dockerfile: Dockerfile
    
  unit_test:
    image: {% raw %}'${{build_step}}'{% endraw %}
    working_directory: IMAGE_WORK_DIR
    commands:
      - echo test
    on_success:
      metadata:
        set:
          - {% raw %}'${{build_step.imageId}}'{% endraw %}:
              - CF_QUALITY: true
    on_fail:
      metadata:
        set:
          - {% raw %}'${{build_step.imageId}}'{% endraw %}:
              - CF_QUALITY: false
{% endhighlight %}

Image quality has 3 indicators:
* true - this image is considered a quality image (ex. passed tests)
* false - this image is not considered a quality image  (ex. when tests failed but the image was already built)
* no value (nobody set the annotation) - this image has no quality indicator

{% include image.html lightbox="true" file="/images/c39a9a2-QUALI.png" url="/images/c39a9a2-QUALI.png" alt="QUALI" max-width="40%" %}
