---
title: "How To: Using private git repositories as Terraform modules"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

Inside the pipeline, you want to load Terraform modules from a private git repository. You want to reuse your credentials from a git integration to allow Terraform to initialize its modules.

## Details

Your build is stuck on `terraform init` command.

In the logs you'll see:

```shell
Executing command: terraform init   
Initializing modules...   
Downloading git::https://github.com/<username>/<repository>.git for <module-name>...   
Username for 'https://github.com':
```

After some period of being hung build is terminated with the message `Build was terminated because of prolonged inactivity`.

You can reuse the token from your git integration in an automated manner. To do so, you need to add an extra freestyle step:

```yaml
version: '1.0'   
  
steps:   
  get_git_token:   
    title: "Reading GitHub token "  
    image: "codefresh/cli"  
    commands:   
      - cf_export GITHUB_TOKEN=$(codefresh get context <git-integration-name> --decrypt -o yaml | yq -r .spec.data.auth.password)
```

_❕ Please note that you have to replace `<git-integration-name>` with the name of your git integration, whose token you want to use._

Once it's done, `$GITHUB_TOKEN` variable will contain your git token across the steps.

Then you need to add an extra `git config` command to your Terraform step, to use this token while Terraform authenticated:

```yaml
terraform_init:  
    title: "Init terraform with modules from private repo"  
    image: "hashicorp/terraform:latest"  
    working_directory: "./${{CF_REPO_NAME}}"  
    commands:  
      - git config --global url."https://<username>:$GITHUB_TOKEN@github.com".insteadOf https://github.com  
      - terraform init
```

_❕ Please note that you have to replace`<username>` with the name of your git user._

Now you're able to use Terraform modules from private git repositories.

## Related Items

* [Deploy with Terraform]({{site.baseurl}}/docs/example-catalog/cd-examples/terraform)
* [Exporting environment variables from a freestyle step]({{site.baseurl}}/docs/pipelines/variables/#exporting-environment-variables-from-a-freestyle-step)
* [Reuse a Git token from Codefresh integrations]({{site.baseurl}}/docs/pipelines/steps/git-clone/#reuse-a-git-token-from-codefresh-integrations)
