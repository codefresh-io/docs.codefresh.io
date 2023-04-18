---
title: Knowledge Base
description: ""
group: troubleshooting
toc: true
---
In this section, we offer helpful information about issues you may encounter and questions you might have.

{% for cat in site.kb-cat %}
### {{ cat }}
<ul>
  {% for page in site.docs %}
    {% if page.kb == true %}
      {% for pc in page.categories %}
        {% if pc == cat %}
          <li><a href="{{ page.url }}">{{ page.title }}</a></li>
        {% endif %}   <!-- cat-match-p -->
      {% endfor %}  <!-- page-category -->
    {% endif %}   <!-- resource-p -->
  {% endfor %}  <!-- page -->
</ul>
{% endfor %}  <!-- cat -->
