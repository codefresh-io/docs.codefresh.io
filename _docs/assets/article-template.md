---
title: "Add here title of help article: Create products"
description: "Add here tagline for help article - what it does describe - Create products and tailor settings to optimize them"
toc: true - required always set to true for the article to be displayed in the sidebar
---

## Headings within articles

Help articles use Headings 2 through 5. 

**Heading 2** is the main heading level in an article. 
If it's an overview, it can include:
* Paragraphs
* Embedded video if any
* Screenshot 
* Bulleted list 

### Heading 3
Heading 3 follows Heading 2 if you want to group related content within a higher-level heading.

#### Heading 4
Heading 4 follows Heading 3. Use them sparingly.


##### Heading 5
Heading 5 is used to callout important aspects such as an embedded video or a specific item in the overview.
It is also used in procedures with prerequisites - the Before you begin and How to use Heading 5. 

##### Example of Heading 5 to callout embedded vido
<iframe width="560" height="315" src="https://www.youtube.com/embed/m3wE4OfV9xE?si=IO-SSoPPIKR8B9r0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>


## Example of bulleted or unordered lists
* Unordered - bulleted list items - in markdown are indicated by **asterisk*** or **dash-**.
* If the bulleted list includes the bullet item followed by a description:
    * Bold the bulleted item as in the example below.
    * Add two spaces or <br> at the end of the bulleted item to create a new line.
    * Indent the new line with the description two spaces to the right to align with the text of the bulleted item.
* If the bulleted list is a list of items:
    * Do not bold each item
    * If the items are fragments of sentences, do not add a period at the end of the item.
    * If an item is a complete sentence or includes more than one sentence, then add periods for all the items in the list.


### Example of lists with bullet item and description
* **No environments defined**  
  If you have not created environments, the Product Dashboard does not display any applications, even if you have assigned applications to the product.  


* **Unmapped cluster-namespace** 
  If the cluster or namespace the application is deployed to is not mapped to an environment, the application is notdisplayed in the Product Dashboard. 

### Example of lists with bullet items only 
Codefresh currently supports the following IdPs:
* GitHub
* Bitbucket
* GitLab 
* Azure
* Google 
* LDAP

## Example of ordered - numbered - lists
* Numbered lists are created in markdown using 1. for all steps in the list.
* When compiled, the numbers are automatically generated in the correct sequence.
* If you have a screenshot below a step, you must manually add the number of the subsequent step, in the syntax: {:start="2"}.


### Example of procedure with numbered list

1. In the Codefresh UI, from the sidebar, select **Products**.
1. Click **Add Product**.
1. Define the following:
    1. **Name**: A unique name for your Product, which is also unique in the cluster. 
    1. **Connect Applications**: The applications to associate with this Product. 
      Copy and paste the annotation into the application's manifest.
    1. **Tags**: Any metadata providing additional context and information about the Product, used for filtering and organization purposes.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/create-product.png" 
	url="/images/gitops-products/create-product.png" 
	alt="Add Product" 
	caption="Add Product"
  max-width="60%" 
%}

{:start="4"}
1. Click **Add**. 
   The Product is displayed on the Product page, and on drill down, in the Product Dashboard. 

### Procedure with prerequistes
If the procedure requires the user to do or be aware of issues, indicate it with a level 5 heading entitled **Before you begin** and another before the numbered steps, entitled **How to**. 

To create a product for a new or an existing application, see [Configuring applications]({{site.baseurl}}/docs/deployments/gitops/application-configuration-settings/#products).

##### Before you begin
* Create one or more [environments]({{site.baseurl}}/docs/environments/create-manage-environments/#create-environments)

##### How to
1. In the Codefresh UI, from the sidebar, select **Products**.
1. Click **Add Product**.
1. Define the following:
    1. **Name**: A unique name for your Product, which is also unique in the cluster. 
    1. **Connect Applications**: The applications to associate with this Product. 
      Copy and paste the annotation into the application's manifest.
    1. **Tags**: Any metadata providing additional context and information about the Product, used for filtering and organization purposes.

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/create-product.png" 
	url="/images/gitops-products/create-product.png" 
	alt="Add Product" 
	caption="Add Product"
  max-width="60%" 
%}

{:start="4"}
1. Click **Add**. 
   The Product is displayed on the Product page, and on drill down, in the Product Dashboard. 

## Callouts in articles
There are three types of callouts you can add to articles: Notes, tips, and warnings.

### Notes
This is an example of a note with two paragraphs. 
>**NOTE**     
For Git repositories, the login method is less important, as you can access Git repositories through Git integrations, regardless of your sign-up process. <br><br>
If you have multiple sign-up methods, as long as you use the same email address in all the sign-ups, Codefresh automatically redirects you to the account dashboard.

### Tips

Tips indicate information that is useful for the user to be aware of when performing a task, or describing a concept.

##### Markdown syntax for tips
{{site.data.callout.callout_tip}}
**TIP**  
  If [**Auto-create projects for teams**]({{site.baseurl}}/docs/pipelines/configuration/pipeline-settings/#auto-create-projects-for-teams) is enabled in global pipeline settings for your account, then creating the team also creates a project and tag for the project, both with the same name as the team name.
{{site.data.callout.end}}

### Important/warnings
Use Important to indicate issues which can result in loss of data. 

When needed, you can also use this syntax for notifications without the title of warning or important.


{{site.data.callout.callout_warning}}
**IMPORTANT**  
If you do use these IPs, we **strongly recommend** that you monitor this page on a regular basis.
{{site.data.callout.end}}


## Cross-references and external links
Cross references are links to articles within the same docsite, either to the article or to a section within the article.
Links are references to external sites. 

Cross-references open in the same browser tab/window. External links open in a new browser tab/window.

### Cross-references to articles within docsite
Unless the cross-reference is to an article only available in GitOps Cloud, the reference should always point to the article in ``_docs``.

##### Cross-reference to article shared between `_docs` and `_gitops`

**Syntax**  
`[Display text in square parentheses]({{site.baseurl}}/<relative link to topic without md extenstion>/)`  

where:  
* `{{site.baseurl}}` is fixed and points to the base domain.
* `<relative link to topic without md extension>` is the relative link to the article in `_docs`. For example, `/docs/administration/user-self-management/user-settings/`.

**Example**  
[Authorize Git access in Codefresh]({{site.baseurl}}/docs/administration/user-self-management/user-settings/)

### Cross-references to article only in GitOps 
To cross reference an article only in GitOps, use the name of the gitops collection.


**Syntax**  
`[Display text in square parentheses]({{site.baseurl}}/{{site.gitops_collection}}/<relative link to topic without md extension>/)`  

where:  
* `{{site.baseurl}}` is fixed and points to the base domain.
* `{{site.gitops_collection}}` points to the `_gitops` collection.
* `<relative link to topic without md extension>` is the relative link to the article in `_gitops`. For example, `/introduction/explore-gitops-cloud-features/`.

**Example**  

[Explore Codefresh GitOps Cloud]({{site.baseurl}}/{{site.gitops_collection}}/introduction/explore-gitops-cloud-features/)  


### Cross-references to mid-topic articles
You also add cross-references to specific sections within articles. The references are prefixed with `#`.

##### Cross-reference is to mid-article sections in _same_ article 

**Example**
These are all cross-references to sections within the article **Application configuration settings**.
* [Application definitions](#application-definitions): Basic metadata, such as the application name, GitOps Runtime, and the name of the YAML manifest. 
* [General configuration settings](#application-general-configuration-settings): Product, Group, source, destination, and sync policies for the application.

##### Cross-reference is to mid-article section in _different_ article 

To link to a specific section in a different article within the same docsite, add the title to the complete reference link:

**Example**  

Here are examples of cross-references to two different sections in **Application: General configuration settings**.  
You can see that the reference URL includes the full link to the article, then  

* [General configuration settings]({{site.baseurl}}/docs/deployments/gitops/application-configuration-settings/#application-general-configuration-settings)  
  
* [Advanced configuration settings]({{site.baseurl}}/docs/deployments/gitops/application-configuration-settings/#application-advanced-configuration-settings)  

##### Cross-reference in _HTML_ format
If you have a table or lists in HTML formats enclosed within {::nomarkdown} tags, add the HTTP/HTTPS URL in HTML syntax.

**Example**  
{::nomarkdown}
See <a href="https://codefresh.io/docs/docs/installation/gitops/manage-runtimes/#configure-ssh-for-gitops-runtimes">Configure SSH for runtimes</a>
{:/}


### Links to external sites
Links to external sites generally comprise the HTTP/HTTPS URL to the site. Also includes the target definition - `{:target="\_blank}` - to ensure that the link opens in a browser tab/window and the user remains within the docsite context. 

**Example**  
Link to a blog:  
Read more on the first of their kind dashboards for GitOps Environments and Products in this [blog](https://codefresh.io/blog/introducing-the-worlds-first-dashboard-for-gitops-environments/){:target="\_blank}.





## Screenshots in articles
Documentation uses SnagIt for screenshots.

To add a screenshot:
1. First create the image.
1. 


Screenshots are sized as thumbnails of 60%.


### Create a screenshot
Use SnagIt to create a screenshot of a region, of 

### Add to images
Save the image in the `docs.codefresh.io` repo in `images`/<subfolder> if needed.


### Add to article

1. Copy and paste this syntax where you want to add the image:

{% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-products/create-product.png" 
	url="/images/gitops-products/create-product.png" 
	alt="Add Product" 
	caption="Add Product"
  max-width="60%" 
%}

{:start="2"}
1. For `file` and `url`, change the paths to the path where the new image is saved. For example, `images/gitops-promotions/components/environments.png`. 
1. For `alt` and `caption`, change to match the new image. For example, `GitOps Environments`.  
  The updated image syntax now looks like this:  

  {% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-promotions/components/environments.png" 
	url="/images/gitops-promotions/components/environments.png" 
	alt="GitOps Environments" 
	caption="GitOps Environments"
  max-width="60%" 
%}

{:start="4"}
1. Make sure to add empty lines before and after the image as in step 3. above.

### Captions for images
Captions for images should be descriptive without being too lengthy.


## Diagrams in articles
Diagrams are useful to illustrate architecture, concepts etc.
Generally, the writer creates a rough draft in whichver appplication and then works with UX to create the final version in Figma.
The Figma version is exported to PNG and saved in the desired location in `/images`. 

1. Create the diagram, and export it if needed to PNG.
1. Save the diagram like you would save a screenshot in `docs.codefresh.io/images/<subfolder>`.
1. Use the same syntax to add the image to the article: 

   {% include 
	image.html 
	lightbox="true" 
	file="/images/gitops-promotions/components/environments.png" 
	url="/images/gitops-promotions/components/environments.png" 
	alt="GitOps Environments" 
	caption="GitOps Environments"
  max-width="60%" 
%}

{:start="4"}
1. Update the `file`, `url`, `alt` and `caption` fields as needed.
1. Increase the size if needed to `"80%"` or `"100%"`.

## Tables in articles

Tables are useful for reference information such as parameter descriptions, system requirements, dashboard data, and the like.
Here's an example of bulleted lists in markdown tables: [System requirements]({{site.baseurl}}/docs/installation/gitops/runtime-system-requirements/).

The CSS for tables are predefined and rendered on running the build.

### Markdown tables

Markdown tables have a header, a header border, columns and rows with the cells separated by `pipes |`.

##### Markdown table example

{: .table .table-bordered .table-hover}
| Table header column1    | Table header column 2     | Required/Optional/Default |
| ----------              |  --------                 | ------------------------- |
| `CF_HOST`               | _Deprecated from v 0.0.460 and higher._ Recommend using `CF_RUNTIME_NAME` instead.<br>`CF_HOST` has been deprecated because the URL is not static, and any change can fail the enrichment.<br><br>  The URL to the cluster with the Codefresh runtime to integrate with. If you have more than one runtime, select the runtime from the list. Codefresh displays the URL of the selected runtime cluster.  | _Deprecated_  |
| `CF_RUNTIME_NAME`       | The runtime to use for the integration. If you have more than one runtime, select the runtime from the list. | Required  |

##### Add HTML lists or inline images in tables
Markdown does not support bulleted or numbered lists in tables, which is at times a serious limitation.
As a workaround, you can add HTML-formatted bulleted or numbered lists by enclosing them in {::nomarkdown} and {:/} tags.


{{site.data.callout.callout_warning}}
**IMPORTANT**  
When you HTML syntax, remember to use HTML tags for text within the section. For example, <b> instead of **.  
Code samples or code must be enclosed in <span> tags. For example, <code class="highlighter-rouge">CF_RUNTIME_NAME</code> instead of `CF_RUNTIME_NAME`.
{{site.data.callout.end}}

Here's an example of HTML unordered lists within a markdown table. 

| `CF_CONTAINER_REGISTRY_INTEGRATION` | The name of the container registry integration created in Codefresh where the image is stored to reference in the CI pipeline. See [Container registry integrations]({{site.baseurl}}/docs/gitops-integrations/container-registries/).<br>Alternatively, you can use _one_ of these container registries with explicit credentials:{::nomarkdown} <ul><li>DockerHub registry with <code class="highlighter-rouge"> CF_DOCKERHUB_USERNAME</code> and <code class="highlighter-rouge">CF_DOCKERHUB_PASSWORD</code>.</li><li><a href="https://docs.docker.com/registry/spec/api/">Docker Registry Protocol v2</a> with <code class="highlighter-rouge"> CF_REGISTRY_DOMAIN</code>, <code class="highlighter-rouge"> CF_REGISTRY_USERNAME</code>, and <code class="highlighter-rouge">CF_REGISTRY_PASSWORD</code>.</li><li>Google Artifact Registry (GAR)  with <code class="highlighter-rouge"> CF_GOOGLE_JSON_KEY</code> and <code class="highlighter-rouge">CF_GOOGLE_REGISTRY_HOST</code>.</li></ul>{:/}| Optional  |

##### Inline icons in HTML format
|**Cluster**              | The local, and managed clusters if any, for the Runtime. {::nomarkdown}<ul><li><img src="../../../../images/icons/runtime-topology-in-cluster.png" display=inline-block/>

### HTML tables
If you have a complex table for which you want to control the cell/column width, and merge cells vertically or horizontally, you can format the entire table in HTML format. 

{::nomarkdown} 

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 80%;
}

td, th {
  border-bottom: 1px solid #dddddd !important;
  border-top: none;
  text-align: left;
  padding: 8px;
}

th {
  background-color: #3d7c84;
  color: #ffff;
}

tr {
  vertical-align: top;
    text-align: left;
  
}
</style>

<table>
    <tr>
       <th colspan="4">CLASSIC > NEW</th>
     </tr>
    <tr>
        <td><b>AVATAR</b></td>
        <td>></td>
        <td><b>Account Settings</b></td>
        <td>Moved to Settings icon in toolbar</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td><b>User Management</b></td>
        <td>Moved to Settings icon in toolbar</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td><b>Billing</b></td>
        <td>Moved to Settings icon in toolbar</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td><b>User Settings</b></td>
        <td>No change</td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td><b>Git Personal Access Token</b></td>
        <td>New item</td>
    </tr>
</table>

{:/}


## Related articles
Related articles are sets of links pointing to articles you determine will be most useful for the user to browse or read in the current context. 

* Each article is a cross-reference to an article within the same docsite, or very rarely to an external site.
* Each article is on a separate line, created by adding two spaces or the <br> tag at the end of the link.
* If one or more links are conditional to either Enterprise or GitOps Cloud, move them to the end of the set. This is because of a limitation of Jekyll that adds an empty <p> tag.


### Example of related articles
[Configure Product Settings]({{site.baseurl}}/docs/products/configure-product-settings/)  
[Assigning applications to Products]({{site.baseurl}}/docs/products/assign-applications/)   
[Assigning Promotion Flows and triggers to products]({{site.baseurl}}/docs/products/promotion-flow-triggers/)   
[Tracking Product releases]({{site.baseurl}}/docs/promotions/product-releases/)  

### Example of related articles with conditions

[Configuring access control for GitOps]({{site.baseurl}}/docs/administration/account-user-management/gitops-abac/)  
{% if page.collection != site.gitops_collection %}
[Setting up OAuth authentication for Git providers]({{site.baseurl}}/docs/administration/account-user-management/oauth-setup)  
[Configuring access control for pipelines]({{site.baseurl}}/docs/administration/account-user-management/access-control/) 
{% endif %}




