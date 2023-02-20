---
title: "Deploy to Elastic Beanstalk"
description: ""
group: example-catalog
sub_group: cd-examples
redirect_from:
  - /docs/yaml-examples/examples/elastic-beanstalk/
  - /docs/elastic-beanstalk/
  - /docs/deploy-your-containers/elastic-beanstalk/
toc: true
---


## Prerequisites

- Configured Application in Elastic Beanstalk service <br>
  See: [http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/GettingStarted.html](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/GettingStarted.html){:target="_blank"}


## Deployment with Codefresh
- Add encrypted environment variables for AWS credentials:
     * `AWS_ACCESS_KEY_ID`
     * `AWS_SECRET_ACCESS_KEY`
     
- Provide the following environment variables:
    * `AWS_REGION`
    * `AWS_ENV_NAME`
    * `AWS_VERSION`
    * `AWS_BRANCH`
    
{% include 
image.html 
lightbox="true" 
file="/images/examples/elastic-beanstalk/codefresh_eb_env_vars.png" 
url="/images/examples/elastic-beanstalk/codefresh_eb_env_vars.png"
alt="codefresh_eb_env_vars.png" 
max-width="40%"
%}

{{site.data.callout.callout_info}}
{% raw %}
The ``${{AWS_VERSION}}`` of application you can find in the Elastic Beanstalk service.
{% endraw %}
{{site.data.callout.end}}

{% include 
image.html 
lightbox="true" 
file="/images/examples/elastic-beanstalk/codefresh_eb_version_label.png" 
url="/images/examples/elastic-beanstalk/codefresh_eb_version_label.png"
alt="codefresh_eb_version_label.png" 
max-width="40%"
%}

{{site.data.callout.callout_info}}
{% raw %}
The ``${{AWS_ENV_NAME}}`` of application you can find in the Elastic Beanstalk service.
{% endraw %}
{{site.data.callout.end}}

{% include 
image.html 
lightbox="true" 
file="/images/examples/elastic-beanstalk/codefresh_eb_environment.png" 
url="/images/examples/elastic-beanstalk/codefresh_eb_environment.png"
alt="codefresh_eb_environment.png" 
max-width="40%"
%}

Add the following step to codefresh.yml:

  `deploy_step`
{% highlight yaml %}
{% raw %}
deploy-elastic-beanstalk:
    fail-fast: false
    image: garland/aws-cli-docker:latest
    commands:
     - sh -c  "aws configure set region '${{AWS_REGION}}' && aws elasticbeanstalk update-environment --environment-name '${{AWS_ENV_NAME}}' --version-label '${{AWS_VERSION}}' "
    when:
      condition:
        all:
          masterBranch: "'${{CF_BRANCH}}' == '${{AWS_BRANCH}}'"
{% endraw %}
{% endhighlight %}

{:.text-secondary}
## Deployment Flow
- Go to the Elastic Beanstalk service and create an application and environment.


{% include 
image.html 
lightbox="true" 
file="/images/examples/elastic-beanstalk/codefresh_eb_environment-deploy.png" 
url="/images/examples/elastic-beanstalk/codefresh_eb_environment-deploy.png"
alt="codefresh_eb_environment.png" 
max-width="40%"
%}

- Perform the following commands from root of your project:
    * eb init
    * eb create {% raw %}`${{AWS_ENV_NAME}}`{% endraw %}



>Note:  
  If you don't have awsebcli - install EB CLI [http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html](http://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html){:target="_blank"}.


{% include 
image.html 
lightbox="true" 
file="/images/examples/elastic-beanstalk/codefresh_eb_health.png" 
url="/images/examples/elastic-beanstalk/codefresh_eb_health.png"
alt="codefresh_eb_health.png" 
max-width="40%"
%}

- Add this repository to Codefresh, provide the necessary environments variables and build this service

{% include 
image.html 
lightbox="true" 
file="/images/examples/elastic-beanstalk/codefresh_eb_cf_step_deploy.png" 
url="/images/examples/elastic-beanstalk/codefresh_eb_cf_step_deploy.png"
alt="codefresh_eb_cf_step_deploy.png" 
max-width="40%"
%}

## Example

* [cf-example-deploy-elasticbeanstalk](https://github.com/codefreshdemo/cf-example-deploy-elasticbeanstalk){:target="_blank"}


## Related articles
[CD pipeline examples]({{site.baseurl}}/docs/example-catalog/examples/#cd-examples)
