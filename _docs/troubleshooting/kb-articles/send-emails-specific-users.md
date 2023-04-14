# How To: Send emails to specific user about builds

#

## Overview

By default, the User Settings email notification is for all pipelines and
builds. This article describes how to send email notifications about builds to
specific groups or sets of email addresses.

## Details

We will be using Pipeline Hooks for type step/plugins [1]. The plugin we will
be using is the SMTP type step [2]. For the credentials/variables for the SMTP
server, you can use pipeline/project variables, but using a Shared
Configuration [3] would be easier to update if the password changes.

Below is an example pipeline hook for when a build starts, succeeds, and
fails.

    
    
    hooks:
      on_elected:
        steps:
          SendEmail:
            type: smtp
            arguments:
              TO: 'group_email@company.com'
              FROM: no-reply@company.com
              SUBJECT: 'Build for ${{CF_REPO_NAME}} has Started'
              BODY: 'Codefresh Build'
              MIME_TYPE: html
              SMTP_SERVER: ${{SMTP_SERVER}}
              SMTP_USERNAME: ${{SMTP_USERNAME}}
              SMTP_PASSWORD: ${{SMTP_PASSWORD}}
              SMTP_PORT: '587'
      
      on_success:
        steps:
          SendEmail:
            type: smtp
            arguments:
              TO: 'group_email@company.com'
              FROM: no-reply@company.com
              SUBJECT: 'Build for ${{CF_REPO_NAME}} was Sucessful'
              BODY: 'Codefresh Build'
              MIME_TYPE: html
              SMTP_SERVER: ${{SMTP_SERVER}}
              SMTP_USERNAME: ${{SMTP_USERNAME}}
              SMTP_PASSWORD: ${{SMTP_PASSWORD}}
              SMTP_PORT: '587'
    
      on_failure:
        steps:
          SendEmail:
            type: smtp
            arguments:
              TO: 'group_email@company.com'
              FROM: no-reply@company.com
              SUBJECT: 'Build for ${{CF_REPO_NAME}} has Failed'
              BODY: 'Codefresh Build'
              MIME_TYPE: html
              SMTP_SERVER: ${{SMTP_SERVER}}
              SMTP_USERNAME: ${{SMTP_USERNAME}}
              SMTP_PASSWORD: ${{SMTP_PASSWORD}}
              SMTP_PORT: '587'
    

## Related Items

[1] <https://codefresh.io/docs/docs/codefresh-yaml/hooks/#running-
stepsplugins-in-hooks>

[2] <https://codefresh.io/steps/step/smtp>

[3] <https://codefresh.io/docs/docs/configure-ci-cd-pipeline/shared-
configuration/>

