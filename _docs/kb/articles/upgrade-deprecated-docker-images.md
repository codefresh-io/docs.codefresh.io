---
title: "How to: Upgrade Deprecated Docker Images in Classic Pipelines"
description: "Find and upgrade deprecated Docker v1 and schema 1 images to support docker-27 runner in Classic Pipelines."
group: kb
sub-group: articles
toc: true
kb: false
ht: true
common: false
categories: [Pipelines]
support-reviewed: 2025-07-14 AA
---

As part of our ongoing platform upgrades, Codefresh is moving to a newer Classic Runner version based on Docker 27. This change deprecates older Docker image formats such as Docker Image Format v1 and Docker manifest version 2, schema 1.

This guide walks you through:
- Identifying deprecated Docker images in your Classic Pipelines.
- Upgrading those images to a modern supported format (OCI or Docker manifest v2, schema 2).

## Step 1: Find Deprecated Docker Images

You can identify deprecated images using one of the following methods:

### Option A: Analyze Build Logs (Manual Method)

The latest `dind` versions output a deprecation warning in the build log each time a deprecated image is pulled.

**Pros**
- No setup required
- Works retroactively on historical builds

**Cons**
- Time-consuming for large accounts
- Requires script execution and manual review

Example warning in logs:
```
[DEPRECATION NOTICE] Docker Image Format v1 and Docker Image manifest version 2, schema 1 support is disabled by default...
```

Use the following script to scan your build logs and extract deprecated images:
👉 [Find deprecated images used in previous builds](https://gist.github.com/francisco-cocozza/6046028184cc12b5ee4513bdcb4217c5)

> 💡 For large-scale environments, see [Appendix I](#appendix-i-monitor-engine-metrics) for a metrics-based approach.

---

## Step 2: Upgrade Deprecated Docker Images

Once you've identified deprecated images, re-push them using a modern Docker client to convert the manifest format.

### Sample Codefresh Pipeline

```yaml
version: "1.0"

steps:
  push:
    title: "Re-pushing deprecated image"
    type: push
    candidate: <source-image-name>
    registry: <target-registry>
    tag: <target-tag>
    image_name: <target-image-name>
```

**Example:**
```yaml
push:
  title: "Re-pushing deprecated image"
  type: push
  candidate: docker/whalesay:latest
  registry: docker
  tag: new-manifest
  image_name: codefresh/whalesay
```

This pipeline step pulls the original image and re-pushes it with a compatible manifest.

> 🔁 Repeat this for each deprecated image.

---

## Appendix I: Monitor Engine Metrics

A scalable way to detect deprecated image pulls using Prometheus engine metrics. Requires Codefresh Runtime version `v7.5.0` or later.

### Metric Details

Metric name: `codefresh_engine_deprecated_images_pulled_total`

Labels include:
- `account_name`
- `pipeline_id`
- `workflow`
- `image_name`

This metric increments each time a deprecated image is pulled.

### How to Enable

In your Hybrid Runtime Helm values:

```yaml
runtime:
  engine:
    env:
      METRICS_PROMETHEUS_ENABLED: true
  podMonitor:
    main:
      enabled: true
```

To ensure metric collection on shutdown, configure a scrape timeout:

```yaml
runtime:
  engine:
    env:
      METRICS_PROMETHEUS_SCRAPE_TIMEOUT: '120000' # 120s
```

### Monitoring Stack Setup

You can install the [kube-prometheus-stack Helm chart](https://artifacthub.io/packages/helm/prometheus-community/kube-prometheus-stack):

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-prom prometheus-community/kube-prometheus-stack   --create-namespace --namespace kube-prom -f ./kube-prom-values.yaml
```

#### Example Storage Class (AWS EBS)

```yaml
# kube-prom-storage-class.yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: kube-prom
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
```

#### Example Helm Values

```yaml
# kube-prom-values.yaml
prometheus:
  prometheusSpec:
    podMonitorSelectorNilUsesHelmValues: false
    serviceMonitorSelectorNilUsesHelmValues: false
    storageSpec:
      volumeClaimTemplate:
        spec:
          storageClassName: kube-prom
          accessModes: ["ReadWriteOnce"]
          resources:
            requests:
              storage: 20Gi

grafana:
  persistence:
    storageClassName: kube-prom
    enabled: true
```

> 📝 Please consult the [official Helm docs](https://artifacthub.io/packages/helm/prometheus-community/kube-prometheus-stack?modal=values&path=prometheus.prometheusSpec.storageSpec) for additional configuration.

### Verifying Metrics in Grafana

After a build completes:
1. Log into Grafana (port-forward to localhost:3000 if needed).
2. Navigate to **Explore → Metrics**.
3. Search for `codefresh_engine_deprecated_images_pulled_total`.

You should see metrics if deprecated images were pulled.

---

## Appendix II: Grafana Dashboard

You can visualize deprecated image pulls using a prebuilt Grafana dashboard:

1. Download the dashboard JSON from [this gist](https://gist.github.com/francisco-cocozza/6046028184cc12b5ee4513bdcb4217c5).
2. In Grafana, go to **Dashboards → New → Import**.
3. Upload the JSON and select `Mimir API` as the data source.
4. Click **Import**.

### Dashboard View

You’ll be able to:
- Filter by account name
- View time-based pull counts
- Identify pipelines and image names involved

---

## Related Links

- [Upgrade Docker images pipeline example](https://gist.github.com/francisco-cocozza/6046028184cc12b5ee4513bdcb4217c5)
- [kube-prometheus-stack on ArtifactHub](https://artifacthub.io/packages/helm/prometheus-community/kube-prometheus-stack)