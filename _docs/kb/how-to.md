---
title: How To's
description: ""
group: kb
toc: true
kb: false
ht: false
common: false
categories: []
support-reviewed: 2023-04-18 LG
---

These articles are how-to guides for tasks you may encounter.

{% for cat in site.kb-cat %}

### {{ cat }}

<ul>
    {% assign pages = site.docs | sort: 'title' %}
    {% for page in pages %}
        {% if page.ht == true %}
            {% for pc in page.categories %}
                {% if pc == cat %}
                <li><a href="{{site.baseurl}}{{page.url}}">{{ page.title }}</a></li>
                {% endif %}   <!-- match category -->
            {% endfor %}  <!-- page-categories -->
        {% endif %}   <!-- kb -->
    {% endfor %}  <!-- page -->
</ul>
{% endfor %}  <!-- cat -->
