---
title: GitOps Hybrid Runtime - Installation with ALB Ingress Controller
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [CLI, Ops, Runtimes]
support-reviewed: 2023-04-18 LG
---

## Pre-Installation

Install the ALB Ingress Controller.

  * <https://docs.aws.amazon.com/eks/latest/userguide/aws-load-balancer-controller.html>

  * <https://kubernetes-sigs.github.io/aws-load-balancer-controller/v2.4/deploy/installation/>

Local Env Variables to set

  * GIT_TOKEN - Your git provider PAT that is going to be used for the runtime

  * GIT_REPO - The repo where the runtime information is going to set

## Installation

Run the following command to install the hybrid runtime with GitHub. Make sure
to replace the ALL CAPS words with the correct items.

    
    
    cf runtime install RUNTIME_NAME \
    --provider github \
    --ingress-host https://URL.COM \
    --ingress-class alb \
    --skip-cluster-checks \
    --silent

The installation will mention that it has failed near the end but this is
expected.

    
    
    Creating a default git integration -> Failed

After the installation, we need to update the Ingress via Git. In the Runtime
Repo, navigate to `apps/internal-router/overlays/RUNTIME_NAME/ingress.yaml`
and make sure to add the following annotations.

    
    
    alb.ingress.kubernetes.io/certificate-arn: ACM_CERTIFICTE_ARN
    alb.ingress.kubernetes.io/actions.ssl-redirect: '{"Type": "redirect", "RedirectConfig": { "Protocol": "HTTPS", "Port": "443", "StatusCode": "HTTP_301"}}'

Now we need to update the workflows URL to make it work (this is optional). In
the runtime repo, navigate to `apps/workflows/overlays/RUNTIME_NAME/` and
create a file called `route-patch.json` with the contents below.

    
    
    [
      {
        "op": "add",
        "path": "/spec/template/spec/containers/0/env",
        "value": [
          {
            "name": "BASE_HREF",
            "value": "/workflows/"
          }
        ]
      }
    ]

Then edit the `apps/workflows/overlays/RUNTIME_NAME/kustomization.yaml` to
include the following between the namespace / resources properties.

    
    
    patches:
    - path: route-patch.json
      target:
        group: apps
        kind: Deployment
        name: argo-server
        version: v1

Once the change has been updated in Kubernetes, we need to set the Route53
Host to point to the load balancer.

Run `kubectl get ingress -n RUNTIME_NAMESPACE` to get the ALB address

Go to Route53 and add an A Record that is an Alias to an Application and
Classic Load Balancer and point to the ALB from the kubectl command. This may
start with “dualstack”.

Wait a few moments for the dns records to update. If it doe snot update flush
your dns on your local machine and try again. You should be able to get an OK
from `https://RUNTIMEURL/app-proxy/api/healthz`

Once everything is running, add the git integration for this runtime

    
    
    cf integration git add default --runtime RUNTIME_NAME --provider github --api-url https://api.github.com

Then register the PAT to the Runtime

    
    
    cf integration git register default --runtime RUNTIME-NAME --token GIT_TOKEN

Once those are successful, you should be able to access the runtime without
any issues via the UI.

