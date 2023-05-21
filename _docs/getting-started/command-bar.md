---
title: "Quick search in Codefresh"
description: "How to perform actions, search for entities, find features, and more with Quick Search"
group: getting-started
toc: true
---



Stay where you are in Codefresh and get to what you want without extra clicks! Be it navigation, actions such as switching accounts, finding entities such as pipelines or builds, Codefresh Universal Search & Navigation is your answer. 

## About Universal Search & Navigation

Universal Search & Navigation is always available in the toolbar, displayed on the top-left.
When you click the Quick Search field, you can see the predefined categories to jump-start your search for **Pipelines** **Projects**, or **Documentation**. 

To start the search, click a category or directly type in the first letters of what you're looking for.
Select the option or use the shortcut keys.

> TIP:   
The results are synced to your permissions and account settings. 


 {% include 
image.html 
lightbox="true" 
file="/images/administration/command-bar/quick-search-options.png" 
url="/images/administration/command-bar/quick-search-options.png" 
alt="Universal Navigation & Search in Codefresh" 
caption="Universal Navigation & Search in Codefresh" 
max-width="60%" 
%}


We are always adding more options, so stay tuned to our online announcements.

>**NOTE**:
>The Universal Search & Navigation feature establishes an initial handshake request with the data source API on inital loading. The outcome of this request does not impact functionality, even in on-premises or air-gapped environments where it will fail.  
>Although your monitoring or alerting systems may flag it as a failure, you can safely disregard the failure notification.


## Find entities/features/settings
In addition to finding projects and pipelines, you can also get to account or user settings, and installation pages.



 {% include 
image.html 
lightbox="true" 
file="/images/administration/command-bar/quick-search-builds.png" 
url="/images/administration/command-bar/quick-search-builds.png" 
alt="Example: Finding Builds list with Universal Navigation & Search" 
caption="Example: Finding Builds list with Universal Navigation & Search" 
max-width="60%" 
%}

## Switch accounts
Use Universal Search & Navigation to switch between Codefresh accounts. 
Instead of selecting the account to sign in to from your avatar, stay where you are, and use our built-in action to switch accounts.

* In the Quick Search, start typing `accounts` to get to the Switch Account action.
* Select it to see the list of accounts, and then either select or use auto-complete to select the account.

 {% include 
image.html 
lightbox="true" 
file="/images/administration/command-bar/switch-account.png" 
url="/images/administration/command-bar/switch-account.png" 
alt="Switch accounts with Universal Navigation & Search" 
caption="Switch accounts with Universal Navigation & Search" 
max-width="60%" 
%}



## Related articles
[Account and user settings]({{site.baseurl}}/docs/administration/account-user-management)