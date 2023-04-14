# No response from GCP cluster

#

## Overview

When going to your Kubernetes Integration page or your DevOps insight pages,
you see no response from the cluster. It is otherwise working.

You may see the following or similar messages in your build logs:

`Error from server (Forbidden): pods is forbidden. User "system:anonymous"
cannot list resource "pods" in API group "" at the cluster scope`

## Details

Basic auth may have been disabled, or the account used has been revoked.

Basic auth is no longer available for GCP clusters running [GKE
1.19](https://cloud.google.com/kubernetes-engine/docs/release-notes#119_ga)
and later.

### GKE 1.19 and later:

Please use the [Custom Providers](https://codefresh.io/docs/docs/deploy-to-
kubernetes/add-kubernetes-cluster/#adding-gke-cluster) integration option.

### Pre-GKE 1.19:

  1. Log into your GCP console.
  2. Confirm that Basic authentication is enabled
  3. Ensure that the user you have in place exists and has access

