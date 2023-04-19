---
title: 
description: 
group: troubleshooting
sub-group: kb-articles
toc: true
kb: true
common: false
categories: []
support-reviewed: 2023-04-18 LG
---

# Error when running Hawkscan freestyle step

#

## Overview

When attempting to use a Hawkscan image, it is not able to make a connection.

## Details

You must be running the container as the user `zap`. We run all containers
with the root user for the container to allow certain integrations such as
debugging.

  * Run the command as follows instead: `su -c 'zap-command-here' zap`.

