---
layout: docs
title: "Verify cluster TLS/SSL configuration"
description: ""
group: deploy-to-kubernetes
redirect_from:
  - /docs/verify-cluster-tlsssl-configuration
  - /docs/verify-cluster-tlsssl-configuration/
  - /docs/verify-cluster-tls-ssl-configuration/
toc: true
old_url: /docs/how-to-create-gke-cluster
was_hidden: true
---

## Overview

Codefresh connects to your cluster via secure TLS channel, therefore make sure you have configured your cluster and any load balancer or reverse proxy standing in front of it to handle the connection properly.

{{site.data.callout.callout_info}}
##### We need to make sure the following conditions are met:

1. The **Load Balancer certificate** is **issued by API server CA certificate** (assumed we don't use a self-signed cert for the load balancer)
2. The **Load Balancer certificate Common Name** corresponds to the Load Balancer **hostname/IP address**
3. When adding the cluster to Codefresh we provide it with the **API Server CA certificate**, not the Load Balancer certificate 
{{site.data.callout.end}}

## The exact steps

{:start="1"}
1. Open the URL of your K8 API server, that is the Load Balancer IP (or DNS name) in Chrome using https. 
   Let it be, for example: ```https://104.198.163.162```

{:start="2"}
2. Open Chrome Developer Tools->Security. Export the certificate to a file named loadbalancer_cert.

{:start="3"}
3. See the contents of the certificate using the following command:

  `Shell`
{% highlight shell %}
{% raw %}
openssl x509 -in loadbalancer_cert -text
{% endraw %}
{% endhighlight %}

{{site.data.callout.callout_info}}
##### Pay attention:

   a. The **certificate Issuer** must be the **CN (Common Name) of Kubernetes API CA cert**<br>
   b. The **Common Name** of this certificate should **contain** the **IP or/and DNS name of the Load Balancer**)
{{site.data.callout.end}}

{:start="4"}
4. Get your default service account secret:

  `Shell`
{% highlight shell %}
{% raw %}
kubectl get secrets <the_secret_name_of_your_default_service_account> -o yaml
{% endraw %}
{% endhighlight %}

You will need the **ca.crt string** (this is actually a base64 hashed CA certificate) and the token (the service account token).

{:start="5"}
5. Copy the CA string, decode it and see the contents of the certificate:

  `Shell`
{% highlight shell %}
{% raw %}
echo <copied_string> | base64 -d > ca_cert
openssl x509 -in ca_cert -text
{% endraw %}
{% endhighlight %}

Pay attention to the **flag CA:TRUE** meaning that this is a CA cert. And **Subject: CN** should be the same as in the field **Issuer** of the **Load Balancer certificate**.

{:start="6"}
6. **Verify** that the Load Balancer certificate **is issued by the CA** of your Kubernetes API server:

  `Shell`
{% highlight shell %}
{% raw %}
openssl verify -verbose -CAfile ca_cert loadbalancer_cert
{% endraw %}
{% endhighlight %}

{:start="7"}
7. If everything is fine then try to add the cluster, giving to Codefresh the CA cert base64 hash (see {% raw %}```<copied_string>```{% endraw %} above), and the service account token.
