---
layout: docs
title: "Handling commit messages with a quote character"
description: ""
group: troubleshooting
sub_group: common-issues
permalink: /:path/handling-commit-messages-with-quotes/
redirect_from:
  - /docs/handling-commit-messages-with-quotes
  - /docs/handling-commit-messages-with-quotes
toc: true
---
Sometimes it is necessary to use commit messages to decide the logical flow of a pipeline. One such example is skipping continuous integration if the commit message contains "--skip-ci".

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

However, doing this might cause the following error if the commit message contains a quote character:

      Error parsing YAML file: can not read a block mapping entry; a multiline key may not be an implicit key at line 13, column 30

As explained, this is a string quoting issue. The commit message uses a ' symbol, as does the YAML file itself to denote string. This breaks the YAML file. 
The solution is to use a multi-line string.

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
 
