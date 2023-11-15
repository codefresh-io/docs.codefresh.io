---
title: "Signed artifacts in Codefresh"
description: "Verify provenance of container images and forked Argo CD images"
group: security 
toc: true
---



Codefresh supports keyless, OIDC-based signing of OCI (Open Container Initiative) artifacts utilizing the Sigstore flow. For details, see [Codefresh OCI Sigstore](https://github.com/codefresh-io/oci-sigstore).

Codefresh signs two types of container image artifacts:
* CI pipeline artifacts using Cosign
* Forked-Argo images

### Verify CI pipeline container images

Verify the authenticity of the CI container images before running promotion pipelines with this command:

`$ cosign verify --certificate-identity-regexp "https://github.com/codefresh-io/oci-sigstore/.*" --certificate-oidc-issuer "https://token.actions.githubusercontent.com" <IMAGE>`  

where: 
`<IMAGE>` is the name of the container image to verify

### Verify forked-Argo images
???

## Related articles
[Secrets]({site.baseurl}}/docs/reference/secrets/)  
[Git tokens]({site.baseurl}}/docs/security/git-tokens/)  

