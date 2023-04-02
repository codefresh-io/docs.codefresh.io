---
title: "Annotations in pipelines"
description: "Mark your builds and projects with extra annotations"
group: pipelines
redirect_from:
  - /docs/codefresh-yaml/annotations/
toc: true
---

Codefresh supports adding custom annotations to several entities, such as projects, pipelines, builds, and Docker images.
Use custom annotations to store any optional information you wish to keep associated with an entity. Examples would be storing the test coverage for a particular build, a special settings file for a pipeline, identifying the environments for builds.

You can add, view, and manage annotations in the Codefresh UI or through the [Codefresh CLI](https://codefresh-io.github.io/cli/annotations/){:target="\_blank"}.
You can also define an annotation to be associated with and displayed for a specific build a display 




>The syntax shown in this page is deprecated but still supported. For the new syntax,
see [hooks in pipelines]({{site.baseurl}}/docs/pipelines/hooks/).


## Adding annotations 

You can add annotations to projects, pipelines, builds, and Docker images. The method is identical for all entities. 
Every annotation has a name, type, and value.

> Annotation names must start with a letter, can be alphanumeric, and include the underscore character. 


### Add annotations in the Codefresh UI

1. In the Codefresh UI, from the sidebar, select the entity for which to add annotations: [**Projects*](https://g.codefresh.io/projects/){target="\_blank"}, [**Pipelines**](https://g.codefresh.io/pipelines/all/){target="\_blank"}, or [**Builds**](https://g.codefresh.io/builds2){target="\_blank"}.
1. From the Projects/Pipelines/Builds page, select the specific project/pipeline/build.
1. Click the context menu on the right, and select **Annotations**.

{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/annotations/annotation-menu.png" 
url="/images/pipeline/codefresh-yaml/annotations/annotation-menu.png"
alt="Add annotation in Codefresh UI" 
caption="Add annotation in Codefresh UI"
max-width="60%"
%}

{:start="4"}
1. Do the following:
    1. Click **Add Annotation**.
    1. In the **Annotation Key** field, type the name of the annotation. 
    1. Select the annotation type from the **Annotation Type** dropdown.
    1. Enter the value of the annotation.
1. To confirm, click **Save**.

### Add annotations to a Codefresh step

In the most basic scenario, use the [post-step operations]({{site.baseurl}}/docs/pipelines/post-step-operations/) of any Codefresh [step]({{site.baseurl}}/docs/pipelines/steps/) to add annotations.

You can add annotations for any entity, not just the current pipeline. You can add annotations to a project,  a different pipeline and build, as shown in the examples below.

#### Example 1: Annotation for project

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


This pipeline adds three annotations to a project called `annotate-examples`. 

For the `entity_id` value you can also use an actual ID instead of a name. The `entity_id` and `entity_type` define  which entity will hold the annotations. The possible entity types are:

* `project` (for a project, even a different one)
* `pipeline` (for a pipeline, even a different one)
* `build` (for a build, even a different one)
* `image` (for a docker image)

If you don't define them, then by default the current build is used with these values:
* `entity_id` is `{% raw %}${{CF_BUILD_ID}}{% endraw %}` (i.e. the current build)
* `entity_type` is `build`

#### Example 2: Add annotation for a different pipeline and build
Here is another example where we add annotations to another pipeline as well as another build (instead of the current one).

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

## Managing annotations

Once you add an annotation to an entity, you can do the following:
Filter builds by annotations
Display an annotation for a build entry
View annotations for an entity via the UI or via the CLI
Edit/delete annotations

### Filter by annotations
Filter the Builds list by annotations to view builds that share the same annotations. This includes both the build display annotation, and other annotations.  
Combine this with the [other filters available for builds]({{site.baseurl}}/docs/pipelines/monitoring-pipelines/#applying-filters-on-the-build-view) to create a customized view of the Builds page. 

1. In the Codefresh UI, from the sidebar, select [**Builds**](https://g.codefresh.io/builds2){target="\_blank"}.
1. From the list of filters, select `annotations`, and enter the `Key=Value` pair to filter by. You can filter by multiple values for the same Key.



### Configure annotation to display for build
Configure an annotation as the display annotation for a build by adding the display attribute to the pipeline workflow. When you have large numbers of builds per pipeline, build display annotations help to group builds by shared annotations for easy viewing and filtering.  

Annotate builds by environments by configuring the display annotation for builds as `ENV = prod/dev/staging` as relevant, and then view and filter by that annotation or filter.  

1. In the Codefresh UI, from the sidebar, select [**Builds**](https://g.codefresh.io/builds2){target="\_blank"}.
1. Select the Build for which to configure the display annotation.
1. In the **Workflow** tab, scroll down to the list of annotations in the YAML.
1. At the end of the annotation list, add `display`, and set it one of the annotations defined, for example, `ENV: 'prod'`.


1. Return to the Builds page. 
  The display annotation is shown for the build. 
  The number to the right indicates that the build has additional annotations. 


1. To display all annotations available for the build, click the number.









### View annotations

#### View annotations via CLI

```shell
codefresh get annotation <entity> annotate-examples
```
where, `<entity>` can be `project`, `pipeline`, or `build`.


#### View annotations via UI

1. In the Codefresh UI, from the sidebar, select the entity for which to view annotations: [**Projects*](https://g.codefresh.io/projects/){target="\_blank"}, [**Pipelines**](https://g.codefresh.io/pipelines/all/){target="\_blank"}, or [**Builds**](https://g.codefresh.io/builds2){target="\_blank"}.
1. From the Projects/Pipelines/Builds page, select the specific project/pipeline/build.
1. From the context menu, select **Annotations**.


### Edit/delete annotations

1. From the Projects/Pipelines/Builds page, select the specific project/pipeline/build.
1. From the context menu, select **Annotations**.
1. From the list of annotations, click the context menu of the annotation to edit or delete.
1. Select **Edit** or **Delete**, and modify or delete the annotation.


{% include 
image.html 
lightbox="true" 
file="/images/pipeline/codefresh-yaml/annotations/edit-delete-annotation.png" 
url="/images/pipeline/codefresh-yaml/annotations/edit-delete-annotation.png"
alt="Edit/delete annotations" 
caption="Edit/delete annotations"
max-width="50%"
%}



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
