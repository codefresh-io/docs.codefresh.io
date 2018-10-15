---
title: "Advanced Workflows with Parallel steps"
description: "Learn how to create complex workflows in Codefresh with step dependencies"
group: codefresh-yaml
toc: true
---

Codefresh is very flexible when it comes to pipeline complexity and depth. You can easily create

 * Sequential pipelines where step order is same as mention in yaml (simple)
 * Sequential pipelines that have some parallel parts (intermediate)
 * Parallel pipelines where step order is explicity defined (advanced)

With the parallel execution mode you can define complex pipelines with fan-in/out configurations capable of matching even the most complicated workflows within an organization.

## Pipeline execution modes
 
## Inserting parallel steps in a sequential pipeline

### Example: pushing multiple docker images in parallel

### Example: running multiple test suites in parallel

## Pipeline parallel mode

### Step dependencies

### Example: workflow with multiple parallel phases

### Example: workflow with complex step dependencies

## Handling error conditions in a pipeline



