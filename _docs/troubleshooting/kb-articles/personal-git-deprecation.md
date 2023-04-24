---
title: "Deprecation of personal Git integrations"
description: "Moving Git integrations to accounts instead of individual users"
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Pipelines, Settings, General]
support-reviewed: 2023-04-18 LG
---



Codefresh supports all major Git providers, GitHub, GitLab, Bitbucket. Through [Git integrations]({{site.baseurl}}/docs/integrations/git-providers/) you can connect to the respective Git provider. Signing up with Codefresh typically requires you to use a Git provider for your basic information (and in the past, an automatic integration was created with the Git provider that you used during initial sign-up).

At Codefresh, a single user can belong to multiple *Accounts* (think GitHub organizations). Typically, a Codefresh user represents a single person, while an *Account* represents a company or team.

Until July 2019, Codefresh allowed you to create a Git integration either at the account level or at the user level. This has been problematic with several customer scenarios.

## The problem of personal Git integrations

While on paper the flexibility of adding Git integrations in different levels (account or user) looks good, in practice it has been very confusing for users/customers

* Codefresh introduced login with providers which aren’t Git based - Google, [LDAP]({{site.baseurl}}/docs/single-sign-on/ldap/), [SAML]({{site.baseurl}}/docs/single-sign-on/saml/). This was causing problems for accounts which started creating pipelines leveraging the personal git context of each user and having new users signing up  without a Git provider
* Codefresh required Git permissions from each user that signed up  instead of allowing to create a dedicated integration to your git provider of choice, allowing a company to better manage codefresh access control to their Git organization

<!--- These problems were exacerbated with the introduction of [explicit clone steps]({{site.baseurl}}/docs/troubleshooting/git-step-migration/). -->

To this end, personal Git providers (i.e. Git integration tied to a person instead of an *account*/company) were deprecated in July 2019. This change makes Git integrations much more consistent, especially for people that work within a company organization.

## How to migrate your Git integration and move away from a personal Git provider

>Note that if you created a Codefresh account in July 2019 and later, there is nothing to do. Your user doesn't have a personal git provider any more. No action is needed on your part.

Make sure that you have at least one Git integration defined in your account (if until now you only used the implicit one that was created when you signed-up with Codefresh)

Then, for all existing [pipelines]({{site.baseurl}}/docs/pipelines/introduction-to-codefresh-pipelines/):

* Make sure that they have an [explicit git clone step]({{site.baseurl}}/docs/pipelines/steps/git-clone/)
* The git clone step has an explicit `git` property that defines the provider (do not leave empty this property )
* The `git` provider has an actual value and **not** `CF-default`. This value used to represent the personal git provider of a user and is now deprecated. Use the name of an actual git integration as is defined in the [providers page]({{site.baseurl}}/docs/integrations/git-providers/)

Once that is done, contact Codefresh via [http://support.codefresh.io](http://support.codefresh.io){:target="\_blank"} or email, and we can take care of automatic migration of all your existing [triggers]({{site.baseurl}}/docs/pipelines/triggers/git-triggers/) that exist in pipelines that are still using a personal Git provider.
