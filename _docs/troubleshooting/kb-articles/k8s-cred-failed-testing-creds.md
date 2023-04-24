---
title: An error occurred while trying to test your credentials while adding Kubernetes Integration
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [Settings]
support-reviewed: 2023-04-18 LG
---

## Overview

When attempting to add a firewall protected cluster through Integrations, your test connection fails even with correct Credentials. This is even with a Codefresh runner behind the Firewall. You may see the message "an error occurred while trying to test your credentials."

## Details

We are unable to connect from the SaaS platform to your Firewall protected Cluster.

* Add the Kubernetes cluster as a `Custom Provider`. You will then be able to specify that it is behind the Firewall. Your runner will have full access to the cluster.
* You can also check [our list of IP addresses]({{site.baseurl}}/docs/administration/platform-ip-addresses/) to add to your allow list.
