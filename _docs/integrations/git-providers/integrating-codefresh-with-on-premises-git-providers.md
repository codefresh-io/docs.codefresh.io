---
title: "Integration with self-hosted (on-prem) git providers"
description: ""
group: integrations
sub_group: git-providers
redirect_from:
  - /docs/integrating-codefresh-with-on-premises-git-providers/
toc: true
---

Basically there are two scenarios of configuring Codefresh to work with On-prem git providers:

1. **Codefresh SaaS** with self-hosted git providers.
2. **Codefresh On-Prem** with self-hosted git providers.

{{site.data.callout.callout_info}}
##### May I use my existing account for a SaaS git provider?

If you already have accounts and users created for SaaS git provider types, you will need to create a **separate account and users specifically for self-hosted** type of git provider. This is related to a generic restriction – **one account per git provider**. For instance, SaaS GitHub and On-prem GitHub are considered as two different git providers in terms of integration with Codefresh 
{{site.data.callout.end}}

## Codefresh SaaS with self-hosted git providers
If you use Codefresh SaaS, you need to request Codefresh team to create an account for you. Please follow [this  guide.](https://docs.codefresh.io/docs/activate-integration-with-your-self-hosted-git-server)

If you intend to **add more users** to this account:

{:start="1"}
1. Ask Codefresh team to create the users for you, giving the emails on which you will receive activation letters.

{:start="2"}
2. When the needed users are created, you can add them into your account on the **`Account Settings` &#8594; `Collaborators`** page. 
There you can assign roles to the users and delete them from the collaborators list later if needed.

## Codefresh On-Prem with self-hosted git providers

{:start="1"}
1. Login to Codefresh with the user that has **`Admin` role** (not the `Account Admin` role)

{:start="2"}
2. Create an account with the corresponding on-prem git provider. For that go to the **`Admin Management` &#8594; `Accounts`** page, click on the *`plus`* button and select the needed on-prem git  provider (Stash, GitHub OnPrem, GitLab OnPrem):

  `Custom HTML / CSS`
{% highlight html %}
{% raw %} 
<figure align="center">
  <a href="https://files.readme.io/5f1f234-Screenshot_from_2018-02-09_14-57-21.png" class="block-display-image-parent block-display-image-size-original">
    <img src="https://files.readme.io/5f1f234-Screenshot_from_2018-02-09_14-57-21.png">
  </a>
</figure>
{% endraw %}
{% endhighlight %}

{:start="3"}
3. Create a user and link it with the account. For that go to the **`Admin Management` &#8594; `Users`** page, click on the *`Create new user`* button, fill in the username and email, select the on-prem git provider (the same as for the account), select the name of the account you created above, click the *`Add`* button.

  `Custom HTML / CSS`
{% highlight html %}
{% raw %} 
<figure align="center">
  <a href="https://files.readme.io/ffc028a-Screenshot_from_2018-02-09_15-33-09.png" class="block-display-image-parent block-display-image-size-smart">
    <img src="https://files.readme.io/ffc028a-Screenshot_from_2018-02-09_15-33-09.png">
  </a>
</figure>
{% endraw %}
{% endhighlight %}

Click on the *`Set the user as admin of this account`*.

{:start="4"}
4. On the same *`Users`* page find the created user, click on the button under *`Provider`* column, click *`plus`* in front of *`local`*, enter the password, click on the `Save` icon.

{% include image.html lightbox="true" file="/images/63a4059-Screenshot_from_2018-02-09_15-35-38.png" url="/images/63a4059-Screenshot_from_2018-02-09_15-35-38.png" alt="Screenshot from 2018-02-09 15-35-38.png" max-width="100%" %}

{:start="5"}
5. On the same *`Users`* page change the status of the user from *`Pending`* to *`Active`*.

{:start="6"}
6. Login to Codefresh with the created user. For that you should go to the login page (`https://<yourcodefreshhostname>/login`), click on the *`On Premise Codefresh`* button and enter the credentials.

{:start="7"}
7. After you have logged in you will need to integrate your git provider server with Codefresh. For that go to **`Account Settings` &#8594; `Integration`**, where you will find option to add your git provider server.

If you intend to add more users to this account repeat the steps above from 3 to 5.

{{site.data.callout.callout_info}}
##### Understanding the Users and Accounts relationships

The relationship between users and accounts is **"many-to-many"**: a user can be linked with multiple accounts and vice-versa - an account can be linked with many users. 
{{site.data.callout.end}}
