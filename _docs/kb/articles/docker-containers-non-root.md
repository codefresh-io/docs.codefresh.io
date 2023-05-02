---
title: "How To: Run docker containers as non root user"
description: 
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

You need to run a docker container in a freestyle step, but not as the 'root' user.

## Details

* Add the command `su -c 'commands here' username`, replacing username with the appropriate value, to the appropriate point in your Script.

We run all containers with the root user for the container to allow for certain key features - including mounting the shared volume.
