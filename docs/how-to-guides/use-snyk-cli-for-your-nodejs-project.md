---
layout: docs
title: "Use Snyk CLI for your Nodejs project"
description: ""
group: how-to-guides
redirect_from:
  - /docs/use-snyk-cli-for-your-nodejs-project
  - /docs/use-snyk-cli-for-your-nodejs-project
toc: true
old_url: /docs/use-snyk-cli-for-your-nodejs-project
was_hidden: true
---
Using Codefresh YAML and [Snyk CLI](https://snyk.io/docs/using-snyk/) you can create the freestyle step in codefresh.yml to see which vulnerabilities of dependencies should be fixed.

  `snyk freestyle step`
{% highlight yaml %}
{% raw %}
snyk-test:
    image: node:latest
    working-directory: ${{initial-clone}}
    fail-fast: false
    commands:
      - npm install
      - npm install -g snyk
      - snyk auth $SNYK_TOKEN
      - snyk test
    environment:
      - SNYK_TOKEN=${{AUTH_TOKEN}}
{% endraw %}
{% endhighlight %}
 
Snyk API Token (AUTH_TOKEN) you can take in your snyk account.

{% include image.html 
lightbox="true" 
file="/images/1322ae3-codefresh_snyk_token-1.png" 
url="/images/1322ae3-codefresh_snyk_token-1.png"
alt="codefresh_snyk_token-1.png"
max-width="40%"
%}

{{site.data.callout.callout_info}}
##### Nodejs Example with Snyk test

[Example](https://github.com/codefresh-io/cf-yml-examples/tree/snyk-freestyle-step) 
{{site.data.callout.end}}

The result of snyk test in Codefresh you can see bellow

{% include image.html 
lightbox="true" 
file="/images/9b76b4b-codefresh_snyk_test-1.png" 
url="/images/9b76b4b-codefresh_snyk_test-1.png"
alt="codefresh_snyk_test-1.png"
max-width="40%"
%}
