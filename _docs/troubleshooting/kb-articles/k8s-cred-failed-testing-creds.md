# An error occurred while trying to test your credentials while adding
Kubernetes Integration

#

## Overview

When attempting to add a firewall protected cluster through Integrations, your
test connection fails even with correct Credentials. This is even with a
Codefresh runner behind the Firewall. You may see the message "an error
occurred while trying to test your credentials."

## Details

We are unable to connect from the SaaS platform to your Firewall protected
Cluster.

  * Add the Kubernetes cluster as a `Custom Provider`. You will then be able to specify that it is behind the Firewall. Your runner will have full access to the cluster.
  * You can also check [our list of IP addresses](https://support.codefresh.io/hc/en-us/articles/360015251020-IP-Addresses-of-Codefresh-to-add-to-Firewall) to add to your allow list.

