---
title: "Error: Context <context-name> already exists"
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Pipelines, Settings]
support-reviewed: 2023-04-18 LG
---

Creating an integration or a Shared Configuration context for pipelines displays an error message that the `Context <context-name> already exists`.

## Possible cause

The name you provided for the integration or for the Shared Configuration context is already used by another integration/Shared Configuration context in your account.

## Possible actions

1. Get all contexts created for your account or contexts by type:  
  `codefresh get contexts`  
   
_OR_ 

  `codefresh get context --type <context-type>`

   where:  
   `<context-type>` is the type of context you want to retrieve, for example, `secret`

{:start="2"}
1. Change the name to make it unique in the account. 

See [Get context](https://codefresh-io.github.io/cli/contexts/get-context/){:target="\_blank"} command description for all options.

## Related articles
[Shared configuration for pipelines]({{site.baseurl}}/docs/docs/pipelines/configuration/shared-configuration/)  
