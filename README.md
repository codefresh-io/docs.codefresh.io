# docs.codefresh.io
[![Codefresh build status]( https://g.codefresh.io/api/badges/pipeline/codefresh-inc/codefresh-io%2Fdocs.codefresh.io%2Flive-docs?branch=master&key=eyJhbGciOiJIUzI1NiJ9.NTY3MmQ4ZGViNjcyNGI2ZTM1OWFkZjYy.AN2wExsAsq7FseTbVxxWls8muNx_bBUnQWQVS8IgDTI&type=cf-1)]( https://g.codefresh.io/pipelines/live-docs/builds?repoOwner=codefresh-io&repoName=docs.codefresh.io&serviceName=codefresh-io%2Fdocs.codefresh.io&filter=trigger:build~Build;branch:master;pipeline:5a941be91a89c60001c3fad4~live-docs)

This site is build with Jekyll. Documentation content is written in Markdown format located in './docs'

## Deploying
The site is automatically deployed when commits land in `master`, hosted by at https://codefresh.io/docs/

### Running documentation locally

1. Install Ruby and `bundler`, `jekyll` and other Ruby dependencies with `bundle install`.
2. Run `npm install` to install Node.js dependencies.
3. Run `npm run css` (or a specific npm script) to rebuild distributed CSS and JavaScript files, as well as our docs assets.
4. From the root directory, run `npm run docs-serve-dev` in the command line.
5. Open `http://localhost:19002` in your browser, and voila.

### Running documentation locally with Docker

1. Install [docker-compose](https://docs.docker.com/compose/)
1. Run `docker-compose up`
1. Open `http://localhost:3131` in your browser, and voila!
