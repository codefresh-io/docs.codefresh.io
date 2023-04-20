---
title: 'How To: "Export" Variables From Child Pipeline'
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines, CLI]
support-reviewed: 2023-04-18 LG
---

## Overview

Below outlines a way you can capture variables from child pipelines in the
parent pipeline.

## Details

The solution here is to use annotations [1] to capture the variables from
child pipelines. Annotations are in plain text and should be considered non-
confidential.

### Child Pipeline:

Below is a step you can add at the end of the child pipeline to "export" the
variables for the parent pipeline to access.

    
    
    setAnnotation:
      title: Set var on parent
      image: codefresh/cli
      commands:
        - PARENT=$(codefresh get -o json annotation workflow $CF_BUILD_ID cf_predecessor | jq .value)
        - echo "PARENT= $PARENT"
        - codefresh create annotation workflow $PARENT MY_VAR="my awesome value"
    

### Parent Pipeline:

Below is a step you will use after the child pipeline completes to access the
"exported" variable. This step uses the cf_export [2] to make the variable
accessible in future steps.

    
    
    displayAnnotation:
      title: setVar
      image: codefresh/cli
      commands:
        - cf_export My_VAR="$(codefresh get -o json annotation workflow $CF_BUILD_ID MY_VAR | jq .value)"
    

## Related Items

[1] <https://codefresh.io/docs/docs/codefresh-yaml/annotations/>

[2] <https://codefresh.io/docs/docs/codefresh-yaml/variables/#exporting-
environment-variables-from-a-freestyle-step>

