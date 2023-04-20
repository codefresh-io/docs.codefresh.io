---
title: Debugger fails with node incompatible module error
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipeline]
support-reviewed: 2023-04-18 LG
---

## Overview

Override debug mode on a freestyle step fails with error like:

    
    
    error tar@6.0.5: The engine "node" is incompatible with this module. Expected version ">= 10". Got "8.14.0"
    error /cf-debugger/node_modules/cf-pty: Failed to auto-install node-gyp. Please run "yarn global add node-gyp" manually. Error: "Found incompatible module."
    

## Details

If you enable the debugger on a freestyle step with the “override” option,
Codefresh will install some extra tooling on the Docker image that is needed
for the debugger itself.

By default, the internal debugger tooling is using node.js, so if your image
is already based on Node.js, you might get version conflicts in your
application.

Use the alternative debugger, which is Python based and will not affect your
application.

You can enable an alternative debugger by passing the variable
`DEBUGGER_RUNNER = 2` on the whole pipeline

You can also enable it on a specific freestyle step by setting an environment
variable.

    
    
    version: '1.0'
    steps:
      hello_world_step:
        title: freestyle step
        image: node:11.1
        environment:
          - 'DEBUGGER_RUNNER=2'
    

## Related Items

[Debugging Pipelines](https://codefresh.io/docs/docs/configure-ci-cd-
pipeline/debugging-pipelines/)

