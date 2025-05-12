---
title: "Access control for user accounts"
description: "Define session timeouts and domain restrictions for all users"
toc: true
---

## User account access control

You can configure general access control settings that apply to all users in your Codefresh account. These include enforcing automatic logout after periods of inactivity, and restricting invitations to approved email domains. These controls help enforce organizational security policies across the platform.

## Define access controls for user accounts

Define sessions timeouts and email domain restrictions for all users in the account.

> **NOTE**  
> The maximum duration for inactivity is 30 days. Inactive users are warned 15 minutes before they are logged out.

1. In the Codefresh UI, on the toolbar, click the **Settings** icon.
1. From the sidebar, select **Access Control**.
1. **User Session**: Define the maximum duration for inactivity in minutes/hours/days before enforcing a timeout.
1. **User Invitation**:
    * To restrict invitations to specific email domains, turn on **Restrict inviting additional users..** 
    * In the **Email domains** field, type in the domains to allow, one per line.

 {% include image.html
  lightbox="true"
  file="/images/administration/access-control/security-timeout.png"
  url="/images/administration/access-control/security-timeout.png"
  alt="Security timeout"
  caption="Security timeout"
  max-width="90%"
    %}

## Related articles
[Access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)  
{% if page.collection != site.gitops_collection %}
[Access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control-pipelines/)  
{% endif %}
