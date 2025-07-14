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

> 💡 For large-scale environments with thousands of builds, we offer a more scalable, metrics-based detection method. See [Appendix I](#appendix-i-monitor-engine-metrics) for details.

---

## Step 2: Upgrade Deprecated Docker Images

Once you’ve identified deprecated images using engine metrics, the next step is to upgrade those images to a modern format (OCI or Docker manifest v2, schema 2). This is required to ensure compatibility with docker-27 and future releases.

### How It Works

Re-pushing an image using a modern Docker client will automatically convert its manifest to a supported version.

### Sample Codefresh Pipeline to Upgrade an Image

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

```yaml
# Example:
# push:
#   title: "Re-pushing deprecated image"
#   type: push
#   candidate: docker/whalesay:latest
#   registry: docker
#   tag: new-manifest
#   image_name: codefresh/whalesay
```

This pulls the deprecated image and re-pushes it under a new name/tag with a compliant manifest format.

> 💡 You can repeat this process for each deprecated image discovered via metrics or logs.

---

## Appendix I: Monitor Engine Metrics

This method enables scalable detection of deprecated images by using real-time engine metrics. Recommended for high-volume or automated environments.

### Monitor engine metrics

Starting from Runtime v7.5.0, engine emits:

```
codefresh_engine_deprecated_images_pulled_total{ account_name, pipeline_id, workflow, image_name }
```

This metric is a counter increased by 1 each time Docker daemon pulls a deprecated image.

### How to enable

Set the following values for the Hybrid Runtime Chart:

```yaml
runtime:
  engine:
    env:
      METRICS_PROMETHEUS_ENABLED: true
podMonitor:
  main:
    enabled: true
```

To ensure that the Prometheus operator will scrape the latest metric values before the engine exits, set:

```yaml
runtime:
  engine:
    env:
      METRICS_PROMETHEUS_SCRAPE_TIMEOUT: '120000'  # Timeout in ms
```

### How to monitor

Installation of the monitoring stack is up to the customer and not covered by our support. The following is a basic setup example:

#### kube-prom-storage-class.yaml

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

#### kube-prom-values.yaml

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
  datasources:
    datasources.yaml:
      apiVersion: 1
      datasources:
        - name: Mimir API
          type: marcusolsson-json-datasource
          uid: Mimir-API
          access: proxy
          url: http://kube-prom-kube-prometheus-prometheus:9090/api/v1
  plugins:
    - marcusolsson-json-datasource
```

### Helm installation

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-prom prometheus-community/kube-prometheus-stack   --create-namespace --namespace kube-prom -f ./kube-prom-values.yaml
```

### Grafana access and verification

```bash
kubectl --namespace kube-prom get pods -l "release=kube-prom"

kubectl --namespace kube-prom get secrets kube-prom-grafana -o jsonpath="{.data.admin-password}" | base64 -d ; echo

export POD_NAME=$(kubectl --namespace kube-prom get pod -l "app.kubernetes.io/name=grafana,app.kubernetes.io/instance=kube-prom" -oname)

kubectl --namespace kube-prom port-forward $POD_NAME 3000
```

Open [http://localhost:3000](http://localhost:3000) and log in using the admin password retrieved above.

### Verifying metrics

To ensure that engine metrics are collected correctly, run a build on the monitored Runtime. In Grafana:

- Go to **Explore → Metrics**
- Search for `codefresh_`
- Make sure the time range includes a running build

---

## Appendix II: Grafana dashboard

### How to use/understand metrics

The metric `codefresh_engine_deprecated_images_pulled_total` is a counter increased by 1 each time Docker daemon pulls a deprecated image. Labels `{account_name, pipeline_id, workflow, image_name}` allow grouping results.

### Dashboard setup

1. Download Dashboard JSON in APPENDIX II  
2. Log in to Grafana  
3. Go to **Dashboards → New → Import**  
4. Upload the JSON  
5. Select `Mimir API` as data source → Click **Import**

### Dashboard overview

- Filter by account name
- Adjust time range
- View builds and deprecated image names
- Clickable links to Admin Panel

### Query Prometheus metric

You can query the metric directly:

```promql
sum(
  rate(
    codefresh_engine_deprecated_images_pulled_total[$__rate_interval]
  )
) by (account_name, pipeline_id, workflow, image_name)
```

Example deprecated images:
- `docker.io/tutum/dnsutils:latest`
- `docker.io/docker/whalesay:latest`

Pulled in Pipeline: `#67867cfe8307bd8f9b7b034e`