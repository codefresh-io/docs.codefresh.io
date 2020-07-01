---
title: "Automatic preview environments"
excerpt: ""
description: ""
excerpt: ""
group: testing
redirect_from:
  - /docs/launch-composition/
  - /docs/on-demand-test-environment/launch-composition-at-the-end-of-the-build/
toc: true
old_url: /docs/launch-composition
---
If your service is one of many micro-services, after all your automatic tests on your service you would probably want to check the new service with your whole system. In this case you can launch the composition of your system as part of your build. At the end of this build you would be able to open the composition.

## Pre-Requisites

You should already have done the tutorial

## Launching The Composition

{:start="1"}
1. Open your `codefresh.yml` file and add a new step:

  `YAML`
{% highlight yaml %}
{% raw %}
launch_composition_step:
    title: "Launch full composition with latest images"
    type: launch-composition
    composition: your-composition-name
    fail_fast: false
{% endraw %}
{% endhighlight %}

{:start="2"}
2. Commit and push the changes to git repository

{:start="3"}
3. Build your service with Codefresh

{:start="4"}
4. Click on *Compositions* on the left sidebar and then choose the *Running Compositions* tab.


{:start="5"}
5. You will see the new preview environment on this page

## Launching an environment only on one branch

There is a limit to the number environments you can run concurrently. That's why it's a good practice to launch the the composition only on certain condition. Usually the most relevant condition is the branch, since you probably want your environment to be updated by you main branch.

The following instructions would explain how to launch the environment for only the `master` branch: 

{:start="1"}
1. Open your `codefresh.yml` file and add to the 'launch_composition_step` the following:

  `YAML`
{% highlight yaml %}
{% raw %}
when:
    branch:
      only:
        - master
{% endraw %}
{% endhighlight %}

{:start="2"}
2. Commit and push changes to your git repository `master` branch.

{:start="3"}
3. Build your service with codefresh on branch `master`

{:start="4"}
4. Create a new branch and push it to your git repository under a new branch

{:start="5"}
5. Build your service with codefresh on the new branch

{:start="6"}
6. When the build would finish, open the its log. You should see something like:

{% include image.html 
lightbox="true" 
file="/images/df14346-Screen_Shot_2017-01-19_at_10.29.16.png" 
url="/images/df14346-Screen_Shot_2017-01-19_at_10.29.16.png"
alt="Screen Shot 2017-01-19 at 10.29.16.png"
max-width="40%" 
%}
