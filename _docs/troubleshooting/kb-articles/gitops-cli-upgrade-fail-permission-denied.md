---
title: GitOps CLI - Upgrading CLI Fails with Permission Denied
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: [CLI, Ops, Runtimes]
support-reviewed: 2023-04-18 LG
---

## Overview

When you are upgrading the CLI and getting a permission denied error.

    
    
    $ cf upgrade
    INFO Downloading CLI version: v0.1.22...
    INFO Extracting...
    INFO Copying...
    FATAL failed to copy new binary from '/tmp/cf-v0.1.22-3967077151/cf-linux-amd64' to '/usr/local/bin/cf': rename /tmp/cf v0.1.22-3967077151/cf-linux-amd64 /usr/local/bin/cf: permission denied
    

## Details

The first option is to try running the `cf upgrade` command with sudo
privileges.

    
    
    $ sudo cf upgrade

The other option is to move the files yourself with sudo privileges.

    
    
    sudo mv / tmp/cf-v0.1.22-3967077151/cf-linux-amd64   /usr/local/bin/cf 

