---
title: "Verifying authenticity of Codefresh artifacts"
description: "Verify integrity of Codefresh-generated container and forked Argo CD images"
group: security 
toc: true
---



Codefresh signs all artifacts it provides using Sigstore. Find more information on [Sigstore](https://www.sigstore.dev/) here.{:target="\_blank"}. You can verify the authenticity of Codefresh artifacts and forked Argo Project images.


## Verify authenticity of Codefresh artifacts

Verify the authenticity of all artifacts that Codefresh provides with this command:

`$ cosign verify --certificate-identity-regexp "https://github.com/codefresh-io/oci-sigstore/.*" --certificate-oidc-issuer "https://token.actions.githubusercontent.com" <IMAGE>`  

where: 
`<IMAGE>` is the name of the container image to verify.

## Verify authenticity of forked Argo Project images for GitOps Runtimes
Verify the authenticity of forked Argo Project images for Codefresh GitOps Runtimes with this procedure.

1. Find the release of the forked Argo Project component you want to verify.  
  For example, Argo CD images in [https://github.com/codefresh-io/argo-cd/releases](https://github.com/codefresh-io/argo-cd/releases){:target="\_blank"}. 
1. Install [Cosign](https://docs.sigstore.dev/system_config/installation/){:target="\_blank"}.
1. Run:
  `cosign verify --certificate-identity-regexp "https://github.com/codefresh-io/.*" --certificate-oidc-issuer "https://token.actions.githubusercontent.com" <REGISTRY>/<COMPONENT>:<TAG>`  

  where:  
  * `<REGISTRY>` is the registry containing the forked Argo image to verify, for example, `quay.io/codefresh`.
  * `<COMPONENT>` is the Argo CD component to verify, for example, `argocd`. 
  * `<TAG>` is the version of the forked Argo image to verify, for example, `v2.8.1-cap-CR-21281-new-reporter`.

``` 
`$ cosign verify --certificate-identity-regexp "https://github.com/codefresh-io/.*" --certificate-oidc-issuer "https://token.actions.githubusercontent.com" quay.io/codefresh/argocd:v2.8.1-cap-CR-21281-new-reporter`  


   `Verification for quay.io/codefresh/argocd:v2.8.1-cap-CR-21281-new-reporter --`
    `The following checks were performed on each of these signatures:`
      `- The cosign claims were validated`
      `- Existence of the claims in the transparency log was verified offline`
      `- The code-signing certificate was verified using trusted certificate authority certificates`
```

## Authenticity of third-party images in Codefresh
To verify the authenticity of third-party images such as  NGINX, Bitnami charts for Redis, MongoDB, and Sealed Secrets, that Codefresh uses, refer to the official documentation of each component.


## Related articles
[Secrets for GitOps]({site.baseurl}}/docs/security/secrets/)  
[Git tokens for GitOps]({site.baseurl}}/docs/security/git-tokens/)  

