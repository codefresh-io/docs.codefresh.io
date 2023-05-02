---
title: 'Postgres: Role "rolename" does not exist after setting POSTGRES_DB to rolename'
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

You are seeing the error `Role "rolename" does not exist.` when attempting to connect to a Postgres database. You have set `POSTGRES_DB` to `rolename`

## Details

* You need to set the property `POSTGRES_USER` as well as `POSTGRES_DB`.
* Incorrect YAML:
  
    ```yaml
    services:
      name: database_test
      composition:
          postgres:
          image: 'postgres:11'
          environment:
              POSTGRES_HOST_AUTH_METHOD: trust
              POSTGRES_DB: rolename
      readiness:
          timeoutSeconds: 30
          periodSeconds: 15
          image: 'postgres:11'
          commands:
          - pg_isready -h postgres -p 5432 -U rolename
    ```

* Corrected YAML:

    ```yaml
    services:
      name: database_test
      composition:
          postgres:
          image: 'postgres:11'
          environment:
              POSTGRES_HOST_AUTH_METHOD: trust
              POSTGRES_DB: rolename
              POSTGRES_USER: rolename
      readiness:
          timeoutSeconds: 30
          periodSeconds: 15
          image: 'postgres:11'
          commands:
          - pg_isready -h postgres -p 5432 -U rolename
    ```

>_**Note** :_
>
>* **IMPORTANT** `POSTGRES_HOST_AUTH_METHOD: trust` gives permission to everyone on the Host to access the database. This is good for testing, but should not be used otherwise. [Read more here](https://www.postgresql.org/docs/9.1/auth-methods.html).
>* By default, if `POSTGRES_DB` is not set, it will automatically equal `POSTGRES_USER`. However, `POSTGRES_USER` defaults to `postgres` if not set.
>* If you are specifically using pg_isready as in the examples above, you do not have to use a correct user name or password to obtain the server status. However, it will return an exit code that is not 0, meaning Codefresh will read it as a failure.
