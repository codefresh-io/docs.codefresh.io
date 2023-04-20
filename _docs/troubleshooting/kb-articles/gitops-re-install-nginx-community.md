---
title: GitOps Hybrid Runtime - Installation with NGINX Community Ingress Controller
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [CLI, Ops, Runtimes]
support-reviewed: 2023-04-18 LG
---

## Pre-installation

ENV Variables to set on local machine

  * GIT_TOKEN - Your git provider PAT that is going to be used for the runtime

  * GIT_REPO - The repo where the runtime information is going to set.

## Installation

### Install the NGINX Community ingress controller

  * Download the YAML

    
    
    curl -O https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/aws/nlb-with-tls-termination/deploy.yaml

  * Find and update the following lines in the yaml to represents your VPC IP range and ACM Certificate 

    
    
    proxy-real-ip-cidr: 192.168.0.0/16 # or what ever your VPC CIDR is  
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:REGION:ACCOUNTID:certificate/CERTIFICATEID

  * Apply the yaml to your cluster

    
    
    kubectl apply -f deploy.yaml

### Update Route 53

Get the External Address (Load Balancer) of the Ingress Controller

    
    
    kubectl get service -n ingress-nginx ingress-nginx-controller

In Route 53 create an Host for GitOps Runtime

  1. Create a new Record

  2. Record Name to be your subdomain

  3. For Value toggle the Alias

  4. Alias for Network Load Balancer > REGION > Select the external Address from above

  5. Save record

### Install the Runtime

Verify that you can reach the Ingress Controller with the host name you
created (will return 404)

Run the following to install the runtime

    
    
    cf runtime install MY-RUNTIME \  
    --ingress-host https://HOSTNAME \  
    --ingress-class nginx \  
    --silent

