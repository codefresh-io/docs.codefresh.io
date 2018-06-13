from jekyll/jekyll:3.7.2

EXPOSE 3131

# copy gemfiles for docker caching
COPY Gemfile* /srv/jekyll/

WORKDIR /srv/jekyll

RUN bundle install

COPY . /srv/jekyll 



RUN chmod 777 -R . \
      && sed -i 's|^url:.*|url: "${{JEKYLL_URL}}"|' _config.yml \
      && sed -i 's|^baseurl:.*|baseurl: "${{MY_JEKYLL_BASEURL}}"|' _config.yml 


CMD jekyll serve --watch --incremental
