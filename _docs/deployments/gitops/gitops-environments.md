



GitOps environments overview

Codefresh has several dashboards each providing different views on different aspects of GitOps appllications and deployments. The GitOps Apps dashboard is a centralized location to view, monitor, and manage application deployments, resources, and configurations. The GitOps Overview dashboard is a high-level overview of GitOps applications via key APIs. 

The GitOps Environments dashboard combines a view of applications in the context of their environments allowing you to track applications as they move across your software development lifecycles. 

What is an environment
What is special about the Gitops environment?

K8s entity - full managable


Allow you to see at any moment in time what's deployed where 
Simple drag-n-drop for left-right-shift environments  

Environments, products, applications
Codefresh allows you to define a unique relationship between applications and the environments they are deployed to or deployed in through the concept of Products.



## Create environments
Create a GitOps environment corresponding to any stage in your development and deployment cycle. Define the configuration of the environment through a unique name, it's usage designation, tags, and single or multiple cluster-namespace pairs. The configuration defines the environment as an entitry The environment is automatically populated with the GitOps applications deployed on the clusters and namespaces, matching the tags defined if any.


1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
  1. Name: A unique name for your environment, which is meaningful in the context of your development and deployment cycle. 
  1. **Kind**: The purpose of this environment, and can be either **Production** where the live versions of the applications are deployed,  or **Non-production** where development, testing, staging versions are deployed.
  1. **Tags**: Any metadata providing additional context and information about the environment, used for filtering and organization purposes.
  1. **Clusters and Namespaces**: Single or multiple cluster-namespace pairs to associate with the configuration for this environment. Adding a cluster with one or more namespaces populates the environment with all the applications deployed on it. When selecting namespaces in a cluster, use * as a wildcard for pattern-based matching. For example, you can use `prod-*` to add all namespaces with names starting with `prod-`. 
1. Click **Add**. The environment is displayed in the Environments page.  (NIMA: Bogdan - Regex only for )
SCREENSHOT OF ENVIRONMENT WITH ALL OPTIONS



## Work with environments
### Select view mode


### Edit environments
(NIMA: Bogdan - what can you edit? All except the name or even the name?)

### Delete environments
Deleting an environment only deletes the environment view. The underlying resources or configuration, including the applications, clusters and namespaces are not deleted. 

(NIMA: Ask Bogdan - names and tags are deleted?)

### Reorder environments
By default, the Environments dashboard shows the environments in the same order in which they were created. You can change the order to suit your requirements by simple drag and drop. For example, if you have two non-production and one production environment for your e-commerce application, you can order them to display first the non-production and then the production environment to reflect the corresponding stages.



