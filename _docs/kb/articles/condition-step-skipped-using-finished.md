---
title: Conditional step skipped when using "finished"
description: 
group: kb
sub-group: articles
toc: true
kb: true
ht: false
common: false
categories: [Pipelines]
support-reviewed: 2023-04-18 LG
---

## Overview

A step looking for the variable "finished" is always skipped.

## Details

The `finished` variable is a short-hand for either success or failure. It canonly be used in step comparisons.

To get the same results on a condition, please follow these steps.

1. Confirm the name of the step you are using for comparison
2. Use the following condition to check for a finished state: `myCondition: stepname == 'success' || stepname == 'failure'`
