# TypeError: Cannot read property x of null

#

## Overview

When attempting to start a build, you receive the error `TypeError: Cannot
read property 'x' of null`, where `x` is usually `title`, `stage`, or
`commands`. The YAML editor shows no errors.

## Details

There is missing indentation on one of your steps in the YAML file.

  1. Search through your YAML file and locate all steps.
  2. Ensure that all properties are indented by the appropriate amount of spaces. This has to be consistent across your YAML.

  * Incorrect YAML:
    
        example-step:
    title: step-title
    stage: production
    image: alpine
    commands:
        - ls
    

  * Corrected YAML:
    
        example-step:
        title: step-title
        stage: production
        image: alpine
        commands:
            - ls
    

_**Note** :_

The reason the YAML editor does not catch this at this time is because it is
technically a valid YAML file.

