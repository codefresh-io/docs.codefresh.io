# docs.codefresh.io
This site is build with Jekyll. Documentation content is written in Markdown format located in './docs'

## Deploying
The site is automatically deployed when commits land in `master`, hosted by GitHub pages

### Running documentation locally

1. Install Ruby and `bundler`, `jekyll` and other Ruby dependencies with `bundle install`.
2. Run `npm install` to install Node.js dependencies.
3. Run `npm run css` (or a specific NPM script) to rebuild distributed CSS and JavaScript files, as well as our docs assets.
4. From the root directory, run `npm run docs-serve-dev` in the command line.
5. Open `http://localhost:19002` in your browser, and voila.
