---
title: "Codefresh API keys rate limiter"
description: "Understand rate limiting behavior for Codefresh API keys"
group: security
toc: true
---

## Codefresh API keys rate limiter

To ensure platform stability and fair usage across all accounts, API requests are subject to rate limiting on a per Codefresh API-key basis.

Specific rate limit thresholds may vary and are subject to change without prior notice.

If your application exceeds the allowed request rate, the API will respond with HTTP status `429 Too Many Requests`.

If access has been restricted for your API key due to unusual activity, the API will respond with HTTP status `403 Forbidden`.

Design your integrations to handle `429` responses gracefully rather than relying on a fixed request budget.
