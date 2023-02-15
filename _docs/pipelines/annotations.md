---
title: "Annotations in pipelines"
description: "Mark your builds and projects with extra annotations"
group: pipelines
redirect_from:
  - /docs/codefresh-yaml/annotations/
toc: true
---

Codefresh supports the annotations of several entities with custom annotations. You can use these annotations to store any optional information that you wish to keep associated with each entity. Examples would be storing the test coverage for a particular build, or a special settings file for a pipeline.

Currently Codefresh supports extra annotations for:

* Projects
* Pipelines
* Builds 
* Docker images

You can view/edit annotations using the [Codefresh CLI](https://codefresh-io.github.io/cli/annotations/){:target="\_blank"} or directly in the Codefresh Web UI.

>Notice that the syntax shown in this page is deprecated but still supported. For the new syntax,
see [hooks in pipelines]({{site.baseurl}}/docs/pipelines/hooks/).


## Adding annotations 

In the most basic scenario, you can use the [post-step operations]({{site.baseurl}}/docs/pipelines/post-step-operations/) of any Codefresh [step]({{site.baseurl}}/docs/pipelines/steps/) to add annotations:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  my_custom_step:
    title: Adding annotations to a project
    image: alpine:3.9
    commands:
     - echo "Hello"
    on_success: 
      annotations:
        set:
          - entity_id: annotate-examples
            entity_type: project
            annotations:
            - my_annotation_example1: 10.45
            - my_empty_annotation
            - my_string_annotation: Hello World
{% endraw %}            
{% endhighlight %}


This pipeline adds three annotations to a project called `annotate-examples`. The name of each annotation can only contain letters (upper and lowercase), numbers and the underscore character. The name of each annotation must start with a letter.


For the `entity_id` value you can also use an actual ID instead of a name. The `entity_id` and `entity_type` are define which entity will hold the annotations. The possible entity types are:

* `project` (for a project, even a different one)
* `pipeline` (for a pipeline, even a different one)
* `build` (for a build, even a different one)
* `image` (for a docker image)

If you don't define them, then by default the current build will be used with these values:
* `entity_id` is `{% raw %}${{CF_BUILD_ID}}{% endraw %}` (i.e. the current build)
* `entity_type` is `build`

Here is another example where we add annotations to another pipeline as well as another build (instead of the current one)

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  my_custom_step:
    title: Adding annotations to multiple entities
    image: alpine:3.9
    commands:
     - echo "Hello"
    on_success: 
      annotations:
        set:
          - entity_id: my-project/my-basic-pipeline 
            entity_type: pipeline
            annotations:
            - my_annotation_example1: 10.45
            - my_empty_annotation
            - my_string_annotation: Hello World
          - entity_id: 5ce2a0e869e2ed0a60c1e203
            entity_type: build
            annotations:
            - my_coverage: 70
            - my_url_example: http://www.example.com
{% endraw %}            
{% endhighlight %}

It is therefore possible to store annotations on any Codefresh entity (and not just the ones that are connected to the build that is adding annotations).

## Viewing/editing annotations

You can view the annotations using the Codefresh CLI

```shell
codefresh get annotation project annotate-examples
```

You can also view annotations within the Codefresh UI.

For build annotations click the *Annotations* on the build details:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/annotations/view-build-annotations.png" 
url="/images/pipeline/codefresh-yaml/annotations/view-build-annotations.png"
alt="Viewing Build annotations" 
caption="Viewing Build annotations"
max-width="80%"
%}

For pipeline annotations click the *Annotations* button in the pipeline list view:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/annotations/view-pipeline-annotations.png" 
url="/images/pipeline/codefresh-yaml/annotations/view-pipeline-annotations.png"
alt="Viewing Pipeline annotations" 
caption="Viewing Pipeline annotations"
max-width="80%"
%}

For project annotations click the *Annotations* button in the project list view:

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/annotations/view-project-annotations.png" 
url="/images/pipeline/codefresh-yaml/annotations/view-build-annotations.png"
alt="Viewing project annotations" 
caption="Viewing project annotations"
max-width="80%"
%}

In all cases you will see a dialog with all existing annotations. 


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/annotations/edit-project-annotations.png" 
url="/images/pipeline/codefresh-yaml/annotations/edit-project-annotations.png"
alt="Editing annotations" 
caption="Editing annotations"
max-width="50%"
%}

You can add additional annotations manually by clicking the *Add annotation* button and entering:

* The name of the annotation
* The type of the annotation (text, number, percentage, link, boolean)
* The desired value

Click *Save* to apply your changes.

## Complex annotation values

Apart from scalar values, you can also store more complex expressions in annotations. You have access to all [Codefresh variables]({{site.baseurl}}/docs/pipelines/variables/), text files from the build and even evaluations from the [expression syntax]({{site.baseurl}}/docs/pipelines/conditional-execution-of-steps/#condition-expression-syntax).

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'kostis-codefresh/nestjs-example'
    revision: '${{CF_REVISION}}'
  my_custom_step:
    title: Complex annotations
    image: alpine:3.9
    commands:
     - echo "Hello"
     - echo "Sample content" > /tmp/my-file.txt
    on_finish: 
      annotations:
        set:
          - entity_id: annotate-examples/simple
            entity_type: pipeline
            annotations:
              - qa: pending
              - commit_message: ${{CF_COMMIT_MESSAGE}}
              - is_main_branch: 
                  evaluate: "'${{CF_BRANCH}}' == 'main'"
              - my_json_file: "file:/tmp/my-file.txt"  
              - my_docker_file: "file:Dockerfile" 
{% endraw %}            
{% endhighlight %}

>Notice that this pipeline is using dynamic git repository variables, so it must be linked to a least one [Git trigger]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/) in order to work.

The last two annotations add the text of a file as a value. You can define an absolute or relative path. No processing is done on the file before being stored. If a file is not found, the annotation will still be added verbatim.
We suggest you only store small text files in this manner as annotations values.

## Removing annotations

You can also remove annotations by mentioning their name:

`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  my_custom_step:
    title: Adding annotations to a pipeline
    image: alpine:3.9
    commands:
     - echo "Hello"
    on_success: 
      annotations:
        set:
          - entity_id: my-project/my-basic-pipeline 
            entity_type: pipeline
            annotations:
            - my_annotation_example1: 10.45
            - my_empty_annotation
            - my_string_annotation: Hello World
            - my_second_annotation: This one will stay
  my_unit_tests:
    title: Removing annotations
    image: alpine:3.9
    commands:
     - echo "Tests failed"
     - exit 1
    on_fail: 
      annotations:
        unset:
          - entity_id: my-project/my-basic-pipeline 
            entity_type: pipeline
            annotations:
            - my_annotation_example1
            - my_empty_annotation
            - my_string_annotation
{% endraw %}            
{% endhighlight %}

You can also use both `unset` and `set` block in a single `annotations` block. And of course, you can remove annotations from multiple entities.

The `unset` annotation can be used with all post-step operations (`on_success`, `on_fail`, `on_finish`).


## Adding annotations to the current build/image

As a convenience feature:

1. If your pipeline has a build step
1. If you want to add annotations to the present build or image

you can also define annotations in the root level of the build step and not mention the entity id and type. Annotations will then be added in the present build.


`codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  main_clone:
    title: Cloning main repository...
    type: git-clone
    repo: 'kostis-codefresh/nestjs-example'
    revision: 'master'
  MyAppDockerImage:
    title: Building Docker Image
    type: build
    image_name: my-app-image
    working_directory: ./
    tag: 'sample'
    dockerfile: Dockerfile
    annotations:
      set:
        - annotations:
          - my_number_annotation: 9999
          - my_empty_annotation
          - my_docker_file: "file:Dockerfile"
          - my_text_annotation: simple_text
{% endraw %}            
{% endhighlight %}

After running this pipeline at least once, you can retrieve the annotations from any previous build by using the respective id:

```shell
codefresh get annotation build 5ce26f5ff2ed0edd561fa2fc
```

You can also define `entity_type` as `image` and don't enter any `entity_id`. In this case the image created from the build step will be annotated.


Note that this syntax is optional. You can still define annotations for a build/image or any other entity using the post operations of any step by mentioning explicitly the target id and type.

## Related articles
[Image annotations]({{site.baseurl}}/docs/pipelines/docker-image-metadata/)   
[Creating pipelines]({{site.baseurl}}/docs/pipelines/pipelines/)  
[Hooks in pipelines]({{site.baseurl}}/docs/pipelines/hooks/)  
