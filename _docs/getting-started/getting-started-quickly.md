---
title: "Getting started quickly"
description: ""
group: getting-started
toc: true
---

Coming soon

A quick-start for people who don’t want to read the rest of the documentation and want to have something running as fast as possible.

# Introduction

# Prerequisites

* A kubernetes cluster running at least version 1.20 with the following permissions in the runtime namespace</br>

```
      {
	      Resource:  "ServiceAccount",
				Verbs:     []string{"create", "delete"},
				Namespace: namespace,
			},
			{
				Resource:  "ConfigMap",
				Verbs:     []string{"create", "update", "delete"},
				Namespace: namespace,
			},
			{
				Resource:  "Service",
				Verbs:     []string{"create", "update", "delete"},
				Namespace: namespace,
			},
			{
				Resource:  "Role",
				Group:     "rbac.authorization.k8s.io",
				Verbs:     []string{"create", "update", "delete"},
				Namespace: namespace,
			},
			{
				Resource:  "RoleBinding",
				Group:     "rbac.authorization.k8s.io",
				Verbs:     []string{"create", "update", "delete"},
				Namespace: namespace,
			},
			{
				Resource:  "persistentvolumeclaims",
				Verbs:     []string{"create", "update", "delete"},
				Namespace: namespace,
			},
			{
				Resource:  "pods",
				Verbs:     []string{"create", "update", "delete"},
				Namespace: namespace
      }
```

* Nodes with at least:
  * 3000 MB
  * 2 CPUs
* A GitHub Personal Access Token (PAT) to create repositories and commit files. See XXX for details
* A Codefresh API Key. See XXX for details

# Installing a new runtime
Using the Command Line Interface (CLI), you will be able to install a new Runtime and start working very quickly

1. Download the new CLI to your machine using one of the following methods
   *  Mac: ```brew tap codefresh-io/cli && brew install cf2```
   * Linux x86: ```curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-amd64.tar.gz | tar zx && mv ./cf-linux-amd64 /usr/local/bin/cf && cf version```
   * Linux ARM: ```curl -L --output - https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-linux-arm64.tar.gz | tar zx && mv ./cf-linux-arm64 /usr/local/bin/cf && cf version```
   * Or for windows, download from https://github.com/codefresh-io/cli-v2/releases/latest/download/cf-windows-amd64.tar.gz
3. Run the following command
``` 
cf runtime install [runtime_name] --repo https://github.com/[repo_name] --git-token [token]
```

*Note:* a repo will be created if it does not already exist and will contain 3 folders (apps, bootstrap and projects) to manage the runtime itself with ArgoCD. In addition, a repository named [repo_name]_git-source will also be created and will contain some samples. This is where you will store your files to run your pipelines aka sources, events, workflow templates, ....

