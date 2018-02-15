---
layout: docs
title: "Voting app"
description: ""
excerpt: ""
group: learn-by-example
sub_group: python
redirect_from:
  - /docs/voting-app-1
  - /docs/python/voting-app
  - /docs/python/voting-app/
toc: true
---
This voting application is a demo with which you can build an advanced composition that uses `Python, Redis, Postgres, Node.js, and .Net`.

## Looking around
In the root of this repository you'll find a file named codefresh.yml, this is our build descriptor and it describes the different steps that comprise our process. Let's quickly review the contents of this file:

  `codefresh.yml`
{% highlight yaml %}
{% raw %}
version: '1.0'
steps:
  unit-tests:
    image: codefresh/buildpacks:nodejs-5
    working-directory : ${{initial-clone}}
    commands:
      - echo Installing NPM modules silent
      - npm install
      - gulp test
      - echo $(date)

  build-step:
    #title: Build My Image #Display name for the step
    type: build
    image-name: containers101/cf-example-result
    tag: ${{CF_BRANCH}}
    build_arguments:
      - OPTION_A=${{OPTION_A}}
      - OPTION_B=${{OPTION_B}}

  push-to-registry:
    type: push
    #candidate: the image from the build step
    candidate: ${{build-step}}
    tag: ${{CF_BRANCH}}

  integration-tests-step:
    type: composition
    #location of the compostion on the filesystem of the cloned image
    composition: './cf-compositions/voting-app-full.yml'
    #run integration only when pushing to master
    when:
      branch:
        only:
          - master #can also be regex
    composition-candidates:
    #this will be the image that we will test
      integ-test:
        image: containers101/cf-example-tests:master
        command: ./tests.sh
    composition-variables:
      - VOTING_OPTION_A=${{OPTION_A}}
      - VOTING_OPTION_B=${{OPTION_B}}

  launch-composition:
    type: launch-composition
    environment-name: 'Test composition after build'
    composition: './cf-compositions/voting-app-full.yml'
    composition-variables:
      - VOTING_OPTION_A=${{OPTION_A}}
      - VOTING_OPTION_B=${{OPTION_B}}

  deploy to ecs:
    image: codefresh/cf-deploy-ecs
    commands:
      - cfecs-update --image-name containers101/cf-example-result --image-tag ${{CF_BRANCH}} eu-west-1 vote-app result
    environment:
      - AWS_ACCESS_KEY_ID=${{AWS_ACCESS_KEY_ID}}
      - AWS_SECRET_ACCESS_KEY=${{AWS_SECRET_ACCESS_KEY}}
    when:
      condition:
        all:
          pushCommit: 'includes(lower("${{CF_COMMIT_MESSAGE}}"), "[deploy]") == true'
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [__repository__](https://github.com/containers101/cf-example-result){:target="_blank"} in Github and follow the instructions there. 
{{site.data.callout.end}}
