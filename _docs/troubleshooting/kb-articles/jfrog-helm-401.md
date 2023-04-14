# Helm error 401 Unauthorized when using Jfrog/Artifactory

#

## Overview

You get this error message when trying to push\install a chart with
Jfrog/Artifactory:

    
    
    Error: looks like "https://example.jfrog.io/artifactory/helm-prod/" is   
    not a valid chart repository or cannot be reached: failed to   
    fetch https://example.jfrog.io/artifactory/helm-prod/index.yaml : 401 Unauthorized

Details

Add `credentials_in_arguments: true` as an Argument in the Helm step, for
example:

    
    
    step-name:  
        title: "Pushing Helm Chart to HELM REPO"  
        type: "helm"  
        arguments:  
          helm_version: "3.0.1"  
          action: "push"  
          chart_name: "chart-name/nginx-test"  
          **credentials_in_arguments: true**

## Related Items

[Release a Helm chart official step
description](https://g.codefresh.io/steps/helm)

