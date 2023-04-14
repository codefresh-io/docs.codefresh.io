# How-to: migrate from cf-onprem script to kcfi installer for Codefresh On-
Prem

#

## Overview

Since cf-onprem script is getting deprecated you might want to start using our
brand new kcfi installer for upgrades of your existing codefresh onprem
installation

## Details

First of all you need to install kcfi from this repo
https://github.com/codefresh-io/kcfi

  1. Download the latest release here: https://github.com/codefresh-io/kcfi/releases
  2. Extract the file you just downloaded. Copy the file to your $PATH, i.e. cp /path/to/kcfi /usr/local/bin
  3. Run the following `kcfi init codefresh [-d /path/to/stage-dir]`  
It will create the directory containing a `config.yaml`

  4. Replace the `config.yaml` contents with the following:

    
    
    metadata:
      kind: codefresh
      installer:
        type: helm
        helm:
          chart: codefresh
          repoUrl: http://charts.codefresh.io/prod
          #version:
    
    kubernetes:
      namespace: codefresh
    
    images:
      codefreshRegistrySa: sa.json
      lists:
      - images/images-list
    
    ### <-------
    

Copy and paste your existing `values.yaml` file contents to the end of the
`config.yaml`

  5. Copy your `sa.json` file to the same directory with the `config.yaml`
  6. In case you want to upgrade your existing codefresh onprem installation to the latest version just select the context in `kubectl` and run `kcfi deploy -c /path/to/config.yaml`

_Notes_  
Specific Codefresh on-premise version can be installed by uncommenting
`metadata.installer.helm.version` and providing the version you wish to
install as a value

## Related Items

You can find full documentation about Codefresh On-premise visiting the link
below:  
https://codefresh.io/docs/docs/administration/codefresh-on-prem/

