---
title: Common issues
description: ""
group: troubleshooting
redirect_from:
  - /docs/common-issues/
  - /docs/troubleshooting/
toc: true
kb: false
common: false
categories: []
support-reviewed: 2023-04-18 LG
---

These Knowledge Base Articles are common issues you may encounter and questions you might have.

{% for cat in site.kb-cat %}

### {{ cat }}

<ul>
    {% assign pages = site.docs | sort: 'title' %}
    {% for page in pages %}
        {% if page.kb == true %}
            {% if page.common == true %}
                {% for pc in page.categories %}
                    {% if pc == cat %}
                    <li><a href="{{site.baseurl}}{{page.url}}">{{ page.title }}</a></li>
                    {% endif %}   <!-- match category -->
                {% endfor %}  <!-- page-categories -->
            {% endif %}   <!-- common -->
        {% endif %}   <!-- kb -->
    {% endfor %}  <!-- page -->
</ul>
{% endfor %}  <!-- cat -->
