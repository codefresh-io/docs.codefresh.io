---
title: "Handling commit messages with a quote character"
description: ""
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: true
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Issue

Error on commit:  
`Error parsing YAML file: can not read a block mapping entry; a multiline key may not be an implicit key at line 13, column 30`

## Possible cause

Commit message that determines the logical flow of a pipeline includes quotes as part of the message.  
One example of using a commit message to decide the flow of a pipeline, is to skip continuous integration if the commit message contains `"--skip-ci"`. Since the commit message contains a quote character, it can result in the error.

Example:

  `YAML`
{% highlight yaml %}
{% raw %}
    build_step: 
      type: build 
      image_name: codefreshio/yaml-example-unit-test-compose 
      dockerfile: Dockerfile 
      tag: ${{CF_BRANCH}} 
      when: 
        condition: 
          all: 
              noSkipCiInCommitMessage: 'includes(lower("${{CF_COMMIT_MESSAGE}}"), "--skip-ci") == false' 
{% endraw %}
{% endhighlight %}

This is a string quotes issue. The commit message uses a ' symbol, as does the YAML file itself to denote string. This breaks the YAML file. 


## Solution

Use a multiline string.

  `YAML`
{% highlight yaml %}
{% raw %}
    build_step:
      type: build
      image_name: codefreshio/yaml-example-unit-test-compose
      dockerfile: Dockerfile
      tag: ${{CF_BRANCH}}
      when:
        condition:
          all:
              noSkipCiInCommitMessage: |
                  includes(lower("${{CF_COMMIT_MESSAGE}}"), "--skip-ci") == false
{% endraw %}
{% endhighlight %}
 
## Related articles
[Troubleshooting common issues]({{site.baseurl}}/docs/troubleshooting/common-issues)