---
title: "Verifying authenticity of Codefresh artifacts"
description: "Verify integrity of Codefresh-generated container and forked Argo CD images"
group: security 
toc: true
---



Codefresh signs all artifacts it provides using Sigstore. Find more information on [Sigstore](https://www.sigstore.dev/) here.{:target="\_blank"}.


## Verify authenticity of Codefresh artifacts

Verify the authenticity of all artifacts that Codefresh provides with this command:

`$ cosign verify --certificate-identity-regexp "https://github.com/codefresh-io/oci-sigstore/.*" --certificate-oidc-issuer "https://token.actions.githubusercontent.com" <IMAGE>`  

where: 
`<IMAGE>` is the name of the container image to verify

## Verify forked-Argo images for Codefresh GitOps Runtimes
???

## Third-party images in Codefresh
To verify the authenticity of third-party images that Codefresh uses, such as NGINX, Bitnami charts for Redis, MongoDB, and Sealed Secrets refer to the official documentation of each component.


## Related articles
[Secrets]({site.baseurl}}/docs/security/secrets/)  
[Git tokens]({site.baseurl}}/docs/security/git-tokens/)  

