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

# How to: Upgrade Deprecated Docker Images in Classic Pipelines

As part of our ongoing platform upgrades, Codefresh is moving to a newer Classic runner version based on Docker v27. This version **deprecates Docker image format v1 and Docker manifest schema 1**, which may impact Classic Pipelines using these legacy image types.

This guide will help you:

- Identify deprecated Docker images in your Classic Pipelines
- Upgrade those images to a supported format

---

## Step 1: Identify Deprecated Docker Images

There are two recommended approaches:

### Option 1: Analyze Build Logs

This method scans historical build logs for deprecation warnings. The latest versions of `dind` log a warning each time the Docker daemon pulls a deprecated image.

**Example log output:**

```
[DEPRECATION NOTICE] Docker Image Format v1 and Docker Image manifest version 2, schema 1 support is disabled by default...
```

To scan logs and extract deprecated image names, use the provided script:  
➡️ **Find deprecated images used in previous builds**

> 💡 For large-scale environments with many builds, a scalable, metrics-based method is available. [See Appendix I](#appendix-i-monitor-engine-metrics) for details.

---

## Step 2: Upgrade Deprecated Docker Images

Once you’ve identified deprecated images (via logs or metrics), upgrade them to a modern format (OCI or Docker manifest v2, schema 2). This ensures compatibility with docker-27 and future runner versions.

### How it works

Re-pushing an image using a modern Docker client automatically updates its manifest to a supported version.

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

This pulls the deprecated image and re-pushes it under a new name or tag with a compliant manifest format.

> 💡 Repeat this process for each deprecated image discovered.

---

## Appendix I: Monitor Engine Metrics

For large environments, use real-time metrics emitted by the Codefresh engine to detect deprecated image usage.

### About the Metric

Starting from Runtime `v7.5.0`, the engine emits the following Prometheus metric:

```
codefresh_engine_deprecated_images_pulled_total{account_name, pipeline_id, workflow, image_name}
```

This counter increases by 1 each time a deprecated image is pulled.

### How to Enable Metrics

Set the following values in your Hybrid Runtime chart:

```yaml
runtime:
  engine:
    env:
      METRICS_PROMETHEUS_ENABLED: true
podMonitor:
  main:
    enabled: true
```

To avoid metric loss during shutdown, also configure:

```yaml
runtime:
  engine:
    env:
      METRICS_PROMETHEUS_SCRAPE_TIMEOUT: '120000'  # 120 seconds
```

### Install Monitoring Stack (Optional)

If no monitoring solution exists in your cluster, install the [kube-prometheus-stack](https://artifacthub.io/packages/helm/prometheus-community/kube-prometheus-stack) chart:

```bash
helm repo add prometheus-community https://prometheus-community.github.io/helm-charts
helm repo update
helm install kube-prom prometheus-community/kube-prometheus-stack --create-namespace --namespace kube-prom -f ./kube-prom-values.yaml
```

**Example storage configuration:**

`kube-prom-storage-class.yaml`

```yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: kube-prom
provisioner: kubernetes.io/aws-ebs
parameters:
  type: gp3
```

`kube-prom-values.yaml`

```yaml
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

### Access Grafana

```bash
kubectl --namespace kube-prom get pods -l "release=kube-prom"
kubectl --namespace kube-prom get secrets kube-prom-grafana -o jsonpath="{.data.admin-password}" | base64 -d ; echo
export POD_NAME=$(kubectl --namespace kube-prom get pod -l "app.kubernetes.io/name=grafana,app.kubernetes.io/instance=kube-prom" -oname)
kubectl --namespace kube-prom port-forward $POD_NAME 3000
```

Then access Grafana at `http://localhost:3000`.

### Verify Metrics in Grafana

- Navigate to **Explore → Metrics**
- Search for `codefresh_`
- Run a build to generate metric events

### Query Prometheus Directly

Example query:

```text
sum(
  rate(
    codefresh_engine_deprecated_images_pulled_total[$__rate_interval]
  )
) by (account_name, pipeline_id, workflow, image_name)
```

This returns the pull rate of deprecated images by account and pipeline.

### Grafana Dashboard (Optional)

- Download the provided dashboard JSON
- Go to **Dashboards → New → Import**
- Upload the file and select `Mimir API` as the data source

Done! 🎉 You can now monitor deprecated image usage at scale.

---

**Examples from monitoring:**

- `docker.io/tutum/dnsutils:latest` pulled in pipeline `#67867cfe8307bd8f9b7b034e`
- `docker.io/docker/whalesay:latest` pulled in the same pipeline
