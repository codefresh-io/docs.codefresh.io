# Search with Typesense

This folder holds configuration for the search engine used in the documentation.

Search is powered by the [Typesense cloud](https://typesense.org/)


## Requirements

There are 3 components needed for the search

* A typesense cluster. This is hosted in the Typesense cloud (codefresh-io account)
* A [scrapper](https://typesense.org/docs/guide/docsearch.html#step-1-set-up-docsearch-scraper). This runs by Codefresh everytime we update the docs. It parses all documentation pages and creates an index in the Typesense cluster. 
* The [search Filed](https://typesense.org/docs/guide/docsearch.html#step-2-add-a-search-bar-to-your-documentation-site). This is using the docsearch API to query the cluster
for search results.

## Configuration

The scrapper needs the file [config.json] and also an "Admin API key" to access
the Typesense cluster. Currently the same Codefresh pipeline that deploys the documentation, also runs the scrapper and uploads the results at the Typesense cluster.

The search field needs just a "Search API" key to query the cluster.

To get/rotate the API keys you need to login with your Github account in the typesense cloud.
