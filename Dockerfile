from jekyll/jekyll:3.8.3

EXPOSE 3131



# copy gemfiles for docker caching
COPY Gemfile* /srv/jekyll/

WORKDIR /srv/jekyll

RUN chown jekyll:jekyll -R . && bundle install

COPY . /srv/jekyll 



RUN chmod 777 -R .  && ls -aFl \
      && sed -i 's|^url:.*|url: "${{JEKYLL_URL}}"|' _config.yml \
      && sed -i 's|^baseurl:.*|baseurl: "${{MY_JEKYLL_BASEURL}}"|' _config.yml 


CMD chmod 777 -R . && jekyll serve --watch --incremental
