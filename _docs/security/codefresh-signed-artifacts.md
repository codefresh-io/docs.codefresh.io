---
title: "Signed artifacts in Codefresh"
description: "Verify container images and forked Argo CD images"
group: security 
toc: true
---



Codefresh supports keyless, OIDC-based signing of OCI (Open Container Initiative) artifacts with the Sigstore flow, signing container images from CI pipelines with Cosign. For details, see [Codefresh OCI Sigstore](https://github.com/codefresh-io/oci-sigstore).

Codefresh signs two types of container image artifacts:
* CI pipeline artifacts
* Forked-Argo images

### Verify CI pipeline artifacts

Verify the authenticity of the container image before promotion with this command:

`$ cosign verify --certificate-identity-regexp "https://github.com/codefresh-io/oci-sigstore/.*" --certificate-oidc-issuer "https://token.actions.githubusercontent.com" <IMAGE>`  

where: 
`<IMAGE>` is the name of the container image to verify

### Verify forked-Argo images
???

## Related articles
[Secrets]({site.baseurl}}/docs/reference/secrets/)  
[Git tokens]({site.baseurl}}/docs/security/git-tokens/)  

