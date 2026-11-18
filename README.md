# docs.codefresh.io

[![Codefresh build status](https://g.codefresh.io/api/badges/pipeline/codefresh-inc/codefresh-io%2Fdocs.codefresh.io%2Flive-docs?branch=master&key=eyJhbGciOiJIUzI1NiJ9.NTY3MmQ4ZGViNjcyNGI2ZTM1OWFkZjYy.AN2wExsAsq7FseTbVxxWls8muNx_bBUnQWQVS8IgDTI&type=cf-1)](https://g.codefresh.io/pipelines/live-docs/builds?repoOwner=codefresh-io&repoName=docs.codefresh.io&serviceName=codefresh-io%2Fdocs.codefresh.io&filter=trigger:build~Build;branch:master;pipeline:5a941be91a89c60001c3fad4~live-docs)

This site is built with Jekyll. Documentation content is written in Markdown format located in './docs'

## Deploying

The site is automatically deployed when commits are merged/pushed in `master`, hosted at https://codefresh.io/docs/

### Preview documentation locally with Docker (Recommended)

1. Install [docker-desktop](https://www.docker.com/products/docker-desktop/)
2. Run `docker compose up`
3. Open `http://localhost:3131` in your browser, and voila!

To compile scss files into css run the command `npm run css` or in the live mode `npm run watch-css`.
To compile js files into a bundle run the command `npm run js` or in the live mode `npm run watch-js`.

### Preview documentation locally (Legacy method)

1. Install Ruby, `bundler`, `jekyll` and other Ruby dependencies with `bundle install`.
2. Run `npm install` to install Node.js dependencies.
3. Run `npm run css` (or a specific npm script) to rebuild distributed CSS and JavaScript files, as well as our docs assets.
4. From the root directory, run `npm run docs-serve-dev` in the command line.
5. Open `http://localhost:19002` in your browser, and voila.

# Amplitude Resource Center Integration

Docs site integrates Amplitude Analytics and Engagement SDKs to provide user analytics and a comprehensive search solution. **Amplitude Resource Center serves as the primary search and indexing system for the documentation site**, replacing previous search implementations.

The integration includes:

- **Analytics tracking** with content segmentation (all pages are in the Enterprise segment)
- **Resource Center with Search** - Provides intelligent, contextual search capabilities accessible via keyboard shortcut (Cmd/Ctrl+K)
- **Content Indexing** - Amplitude automatically indexes documentation content to enable fast, relevant search results
- **Automatic SDK loading** with error handling

The integration is implemented in `_includes/scripts.html` and loads both the Analytics and Engagement SDKs sequentially for optimal performance.

**Important Notes:**
- The Analytics SDK must be properly initialized for the Engagement SDK (Resource Center) to function correctly
- Amplitude automatically creates and manages unique deviceIds under the hood to cache and identify users across sessions, eliminating the need for custom user identification logic

**References:**
- [Browser SDK 2 (Analytics) Documentation](https://amplitude.com/docs/sdks/analytics/browser/browser-sdk-2)
- [Guides and Surveys (Resource Center) SDK Documentation](https://amplitude.com/docs/guides-and-surveys/sdk)

