---
title: "Enterprise Account Management Overview"
description: ""
group: administration
redirect_from:
  - /docs/enterprise-account-mng/ent-account-mng/
  - /docs/enterprise/ent-account-mng/
toc: true
---

  Enterprise account management allows customers in Codefresh **enterprise plan** (please [contact sales](https://codefresh.io/contact-sales/) to learn more) to manage multiple Codefresh accounts and control resource allocation between them.
  
  
  By creating different accounts for different teams within the same company a customer can achieve complete segregation of assets between the teams. For example:
  
  - Grant developers access to developer only assets (e.g. Kubernetes dev cluster) and production operation team access to production only assets.
  - Segregate different product teams within your organization.
  
  In addition, the customer admin can easily manage multiple Codefresh resources, based on license, between different accounts any time they see fit and set limits for different teams based on their expected usage.

  The resources allocation refers to the following:

  - Concurrent builds
  - On-demand environments

{:.text-secondary}
## Customer Admin Console

The customer admin will see a new **CUSTOMERS** item under its profile menu. From there you are able to access the customer admin console which allows you to create and manage Codefresh accounts, users and billing.

{% include image.html
  lightbox="true"
  file="/images/customer-admin-console.png"
  url="/images/customer-admin-console.png"
  alt="sso-diagram.png"
  max-width="100%"
    %}

{:.text-secondary}
## Accounts

As a customer admin you’re able to create multiple accounts, according to the license you purchased from Codefresh. Each account is fully segregated from the other.
  When creating an account, you’ll be required to choose the account name, GIT provider and limits based on your Codefresh license.
  
  For example, if you purchased 6 concurrent builds, you’re able to set one account with all 6 concurrent builds or balance it between different accounts (2 accounts, each having 3 concurrent builds).

{% include image.html
  lightbox="true"
  file="/images/accounts.png"
  url="/images/accounts.png"
  alt="sso-diagram.png"
  max-width="100%"
    %}

Codefresh also allow you to edit the account limit configurations after the creation of an account so you aren’t locked to the limits you set initially and can always be flexible according to your team's usage.

{% include image.html
  lightbox="true"
  file="/images/limits.png"
  url="/images/limits.png"
  alt="sso-diagram.png"
  max-width="100%"
    %}

{:.text-secondary}
## Users

From the users page you’re able to manage users in different accounts, invite new ones and choose their role within each account.

{% include image.html
  lightbox="true"
  file="/images/users.png"
  url="/images/users.png"
  alt="sso-diagram.png"
  max-width="100%"
    %}

{:.text-secondary}

## Billing

From the billing page you’re able to view your Codefresh plan and usage. The plan will update dynamically based on the customer admin allocation of resources between accounts.

{% include image.html
  lightbox="true"
  file="/images/billing.png"
  url="/images/billing.png"
  alt="sso-diagram.png"
  max-width="100%"
    %}

## What to read next

* [Codefresh installation options]({{site.baseurl}}/docs/administration/installation-security/)
* [Access control]({{site.baseurl}}/docs/administration/access-control/)



