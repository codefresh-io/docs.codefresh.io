---
layout: docs
title: "Create a Codefresh Account"
description: "Welcome to Codefresh! To get started, create a Codefresh account."
group: getting-started
redirect_from:
  - /docs/
  - /docs/create-an-account
  - /docs/getting-started/
  - /docs/getting-started//introduction/
  - /docs/
  - /docs/getting-started/
  - /docs/getting-started/introduction/
toc: true
---
Welcome to Codefresh! 

To get started, create a Codefresh account.

### 1. Create Your Account

Navigate to the [Sign Up page](https://g.codefresh.io).  
Sign up with Codefresh by linking your account to your Git provider.  
We currently support Github and Bitbucket.

{{site.data.callout.callout_info}}
Codefresh also supports Stash. Check out our [documentation]({{ site.baseurl }}/docs/integrations/stash/) for more information. 
{{site.data.callout.end}}

{% include 
image.html 
lightbox="true" 
file="/images/6a22e1e-screenshot-g.codefresh.io-2017-11-21-14-57-20.png" 
url="/images/6a22e1e-screenshot-g.codefresh.io-2017-11-21-14-57-20.png"
alt="Github authorization page (click image to enlarge)" 
max-width="30%" 
%}

{{site.data.callout.callout_info}}
##### Accounts behind a firewall

If you have a private account for your source control management (SCM) that lies behind a firewall, or simply has no access to the internet, we can help you. We can establish a VPN / tunnel to your network, or discuss options of an on-premises Codefresh deployment. Please contact us to get started. [https://codefresh.io/contact-us/](https://codefresh.io/contact-us/){:target="_blank"} 
{{site.data.callout.end}}

### 2. Accept the Permissions Request
After you select which Git provider to link to, Codefresh requests permission to access your Git provider account.

#### **Github**{:.text-secondary}
{::comment}
{:/comment}
{% include 
image.html 
lightbox="true" 
file="/images/782b804-Screen_Shot_2016-09-28_at_4.36.01_PM.png" 
url="/images/782b804-Screen_Shot_2016-09-28_at_4.36.01_PM.png"
alt="Github authorization page (click image to enlarge)" 
caption="Github authorization page (click image to enlarge)" 
max-width="40%" 
%}

#### **Bitbucket**{:.text-secondary}
{% include 
image.html 
lightbox="true" 
file="/images/11802db-imageedit_3_2860379237.gif" 
url="/images/11802db-imageedit_3_2860379237.gif"
alt="Bitbucket authorization page (click image to enlarge)" 
caption="Bitbucket authorization page (click image to enlarge)" 
max-width="40%" 
%}

### 3. Verify Your Account Details
After you grant permission to access your Git provider account, you will be redirected to the Codefresh platform to verify your account details. Review your account details, make the relevant changes, and click **SIGN UP**. 

{% include 
image.html 
lightbox="true" 
file="/images/8756a0b-Screen_Shot_2016-09-28_at_4.40.20_PM.png" 
url="/images/8756a0b-Screen_Shot_2016-09-28_at_4.40.20_PM.png" 
caption="Verify new account page (click image to enlarge)" 
max-width="40%" 
%}

<div class="bd-callout bd-callout-info" markdown="1">
##### Multiple repositories / git providers with one account

Currently, it is possible to have only one git provider per account. You have to create a separate Codefresh account for each of your git providers.
</div>
