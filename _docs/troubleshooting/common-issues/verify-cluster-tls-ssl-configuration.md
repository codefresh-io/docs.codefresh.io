---
title: "Verify cluster TLS/SSL configuration"
description: "Connecting Codefresh to an on-premises Kubernetes cluster"
group: troubleshooting
sub_group: common-issues
redirect_from:
  - /docs/verify-cluster-tlsssl-configuration/
  - /docs/verify-cluster-tls-ssl-configuration/
  - /docs/deploy-to-kubernetes/verify-cluster-tls-ssl-configuration/
toc: true
---

Read this page if you are adding in Codefresh a custom (e.g. on-premises) cluster.

## Overview

Codefresh connects to your cluster via secure TLS channel, therefore make sure you have configured your cluster and any load balancer or reverse proxy standing in front of it to handle the connection properly.

{{site.data.callout.callout_info}}
##### We need to make sure the following conditions are met:

1. The Load Balancer certificate *Common Name corresponds* to the Load Balancer hostname/IP address
2. When adding the cluster to Codefresh, we provide it with the base64 encoded *CA issuer certificate*, not the Load Balancer server certificate, unless it is a self-signed one
3. If there is *more than one CA* in the certificate chain, you need to provide the *whole CA bundle file* to Codefresh, not a single CA certificate
{{site.data.callout.end}}

## The exact steps

{:start="1"}
1. Open the URL of your K8 API server, that is the Load Balancer IP (or DNS name) in Chrome using https. 
   Let it be, for example: ```https://104.198.163.162```

{:start="2"}
2. Open Chrome Developer Tools->Security. Export the server and the CA certificates to file named `loadbalancer_cert` and `ca_cert`. If there is more than one CA, export all of them and combine them into a single bundle file using the following command:

{% highlight shell %}
{% raw %}
cat intermediateCA.crt rootCA.crt > ca-cert
{% endraw %}
{% endhighlight %}

{:start="3"}
3. See the contents of the certificate using the following command:

  `Shell`
{% highlight shell %}
{% raw %}
openssl x509 -in loadbalancer_cert -text
{% endraw %}
{% endhighlight %}


{:start="4"}
4. See the contents of the CA certificate:

  `Shell`
{% highlight shell %}
{% raw %}
openssl x509 -in ca_cert -text
{% endraw %}
{% endhighlight %}

Pay attention to the **flag CA:TRUE** meaning that this is a CA cert. And **Subject: CN** should be the same as in the field **Issuer** of the **Load Balancer certificate**.

{:start="5"}
6. **Verify** that the Load Balancer certificate **is issued by the CA**:

  `Shell`
{% highlight shell %}
{% raw %}
openssl verify -verbose -CAfile ca_cert loadbalancer_cert
{% endraw %}
{% endhighlight %}

{:start="6"}
6. If everything is fine then add the cluster, giving to Codefresh the CA cert base64 encoded and the service account token. 
