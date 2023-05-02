---
title: Knowledge Base
description: 
group: kb
redirect_from:
  - /docs/troubleshooting/
toc: true
kb: false
ht: false
common: false
categories: []
support-reviewed: 2023-04-18 LG
---


Here, we offer helpful information about issues you may encounter and questions you might have.

{% for cat in site.kb-cat %}

### {{ cat }}

<ul>
    {% assign pages = site.docs | sort: 'title' %}
    {% for page in pages %}
        {% if page.kb == true %}
                {% for pc in page.categories %}
                    {% if pc == cat %}
                        <li><a href="{{site.baseurl}}{{page.url}}">{{ page.title }}</a></li>
                    {% endif %}   <!-- cat-match-p -->
                {% endfor %}  <!-- page-category -->
        {% endif %}   <!-- resource-p -->
    {% endfor %}  <!-- page -->
</ul>

{% endfor %}  <!-- cat -->
