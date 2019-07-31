---
title: "Image Metadata Annotations"
description: "How to use custom metadata in your Docker images"
group: docker-registries
redirect_from:
  - /docs/metadata-annotations/
toc: true
---
Images built by Codefresh can be annotated with customized metadata.
This article explains how to create advanced view of your images and enrich them with custom metadata which perfectly fits your flow and image management process.

{% 
  include image.html 
  lightbox="true" 
  file="/images/artifacts/metadata/metadata.png" 
  url="/images/artifacts/metadata/metadata.png" 
  alt="Codefresh Docker registry metadata" 
  max-width="65%" 
%}


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
                                           
You can also use [Expression evaluations]({{site.baseurl}}/docs/codefresh-yaml/expression-condition-syntax/) to set metadata.

## Annotate your images using Codefresh YAML
You can annotate an image as part of it's builds process and also on post build steps.

{:.text-secondary}
### Build step Image Metadata Annotation
You can annotate an image as part of its build process by declaring the metadata value on the [Build step]({{site.baseurl}}/docs/codefresh-yaml/steps/build/):
1. the `metadata` attribute,
2. the `set` operation, and
3. an array of key-value metadata.

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
Any step in the YAML workflow can annotate built images by using [Post-Step Operations]({{site.baseurl}}/docs/codefresh-yaml/post-step-operations/).
To annotate a built image, configure any step with
1. the post-step operation,
2. the `metadata` attribute,
3. the `set` operation,
4. a list of target images with the variable syntax of {% raw %}`${{build_step_name.imageId}}`{% endraw %}, and
5. an array of key-value metadata.

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

### Example - Quality Image Metadata Annotation
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
* true - this image is considered a quality image (ex. passed tests),
* false - this image is not considered a quality image  (ex. when tests failed but the image was already built), and
* no value (nobody set the annotation) - this image has no quality indicator.

{% include image.html lightbox="true" file="/images/c39a9a2-QUALI.png" url="/images/c39a9a2-QUALI.png" alt="QUALI" max-width="40%" %}


## Viewing Image Metadata Annotations
You can view an image's metadata annotation by:
1. Navigating to the `Images` view
2. Selecting the target image
3. Selecting the `Annotations` tab

{% 
  include image.html 
  lightbox="true" 
  file="/images/artifacts/metadata/annotations.png" 
  url="/images/artifacts/metadata/annotations.png" 
  alt="Image annotations" 
  max-width="65%" 
%}

In addition, you can add selected annotations to the images table on images page. To display an annotation in the image table, click on the gear icon at the top right corner of image page and then select all annotations you want to display.

{% include image.html lightbox="true" file="/images/aec92e8-Screen_Shot_2017-10-17_at_3.01.26_PM.png" url="/images/aec92e8-Screen_Shot_2017-10-17_at_3.01.26_PM.png" alt="Screen Shot 2017-10-08 at 8.28.35 AM.png" max-width="40%" %}


## Annotating images programmatically

It is also possible to annotate images with the [Codefresh CLI](https://codefresh-io.github.io/cli/).

First find the id of an image that you wish to annotate with the command

```
codefresh get images
```

You can also search for a specific image by name:

```
$ codefresh get images --image-name custom
ID           NAME                   TAG CREATED          SIZE     PULL
b5f103a87856 my-custom-docker-image bla Fri Feb 01 2019  91.01 MB r.cfcr.io/kostis-codefresh/my-custom-docker-image:bla
```
Then once you have the ID of the image you can use the [annotate command](https://codefresh-io.github.io/cli/images/annotate-image/) to add extra metadata:

```
codefresh annotate image b5f103a87856 -l coverage=75
```

## Using custom metadata in Codefresh pipelines

You can also use the Codefresh CLI to fetch existing metadata from images. It is then very easy to extract and process specific fields with [yq](https://github.com/kislyuk/yq)

Here is an example
```
$ codefresh get image b5f103a87856 --output=yaml | yq -r .annotations.coverage
75
```

You can then easily process the metadata (e.g. with scripts) and take decisions according to them. Here is an example
step that will fail the build if test coverage on an image is less than 80%

  `YAML`
{% highlight yaml %}
version: '1.0'
steps:
  findLabel:
    title: Get image label for coverage
    image: codefresh/cli
    commands:
      - export MY_COVERAGE=$(codefresh get image b5f103a87856 --output=yaml | yq -r .annotations.coverage)
      - echo "Coverage is $MY_COVERAGE"
      - if [[ $MY_COVERAGE -lt "80" ]]; then exit 1 ; fi

{% endhighlight %}

The possibilities are endless as you can take any combination of image metadata and use any complex conditional
in order to process them in a Codefresh pipeline.


### See also

* [Codefresh Registry]({{site.baseurl}}/docs/docker-registries/codefresh-registry/)
* [External Docker Registries]({{site.baseurl}}/docs/docker-registries/external-docker-registries/)
* [Accessing Docker registry from your Kubernetes cluster]({{site.baseurl}}/docs/deploy-to-kubernetes/access-docker-registry-from-kubernetes/)
