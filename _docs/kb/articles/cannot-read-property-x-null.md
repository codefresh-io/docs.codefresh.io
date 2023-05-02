---
title: "TypeError: Cannot read property x of null"
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

When attempting to start a build, you receive the error `TypeError: Cannot read property 'x' of null`, where `x` is usually `title`, `stage`, or `commands`. The YAML editor shows no errors.

## Details

There is missing indentation on one of your steps in the YAML file.

1. Search through your YAML file and locate all steps.
2. Ensure that all properties are indented by the appropriate amount of spaces. This has to be consistent across your YAML.

* Incorrect YAML:

    {% raw %}

    ```yaml
            example-step:
        title: step-title
        stage: production
        image: alpine
        commands:
            - ls
    ```

    {% endraw %}

* Corrected YAML:

    {% raw %}

    ```yaml
            example-step:
            title: step-title
            stage: production
            image: alpine
            commands:
                - ls
    ```

    {% endraw %}

>_**Note**:_
>
>The reason the YAML editor does not catch this at this time is because it istechnically a valid YAML file.
