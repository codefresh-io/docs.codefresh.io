##---
title: "GitOps Environments"
description: ""
group: deployments
toc: true
---



GitOps environments overview

Codefresh has several dashboards each providing different views on different aspects of GitOps appllications and deployments. The GitOps Apps dashboard is a centralized location to view, monitor, and manage application deployments, resources, and configurations. The GitOps Overview dashboard is a high-level overview of GitOps applications via key APIs. 

The GitOps Environments dashboard combines a view of applications in the context of their environments allowing you to track applications as they move across your software development lifecycles. 

What is an environment
An Environment is a logical entity in Codefresh that consolidates deployment information for all the Argo CD applications linked to it. Allow you to see at any moment in time what's deployed where 

What can you see in an environment
1. Argo CD applications that are part of the environment
1. The phase of the application's deployment lifecycle
1. Git information


Characteristics of an environment

1. Account-level entity: Environments are created and managed for an account. they hav visibility into all the Runtimes and Runtime clusters in the account.
1. Types of environments: There are two broad categories 
1. Aro CD Applications: The main purpose of an environment is to show the Argo CD applications in that environment along with their current health and sync status, and Git information. This is only possible when you link an application to an environment. 
1. Destinations: 
1. Deployment destinations:

Environment views

Applications in environments
1. Same application can be assigned to more than one environments
1. 

Create an environment entity
View environment dashboard

Simple drag-n-drop for left-right-shift environments  

Environments, products, applications
Codefresh allows you to define a unique relationship between applications and the environments they are deployed to or deployed in through the concept of Products.

Environments aggregates Argo CD applications based on a common dennominator and visualizes their based on deployment destinations.

Instead of switching between each Argo CD Application to see where it is deployed, associating application with environw

## Working with GitOps environments

Once you create an environment, it is added to and displayed in the Environments page.
The Environments page is a dashboard that consolidates all the information on defined environments, the applications that belong to each environment, and the health and sync status of the applications.
When you visit the environment screen you can see consolidated information on what your environment is doing. Codefresh will pull live data from the cluster to populate the status bar of each environment entry and will automatically show the status of the last 3 builds that affected this environment.


Filters

Environments

Applications
Toggle between detailed and Compact view for applications. 
* Health status
* Product name: If the application has been assigned to a product, the product name is displayed next to the health status. A product name that is identical to the app name indicates that Codefresh has auto-assigned the application to the product.
* Application type, name, and sycn status: 
* Detailed view only: CI/CD information on the application
* Cluster and namespace where application is deployed
* Context menu: Every application has a context menu with the same options that you have for the application in the GitOps Apps dashboard giving you quick access to freqeuntly-
* Favorite: Click to tag application as 

### 

## Create environments
Create a GitOps environment corresponding to any stage in your development and deployment lifecycle.  
Define the configuration of the environment through a unique name, it's intended usage, Argo CD applications thand destination single or multiple cluster-namespace pairs. The configuration defines the environment as an entitry The environment is automatically populated with the GitOps applications deployed on the clusters and namespaces, matching the tags defined if any.

**Before yp
1. In the Codefresh UI, from the Ops in the sidebar, select **Environments**, and then click **Add Environment**.
1. Define the following:
  1. **Name**: A unique name for your environment, which is meaningful in the context of your development and deployment cycle. 
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



