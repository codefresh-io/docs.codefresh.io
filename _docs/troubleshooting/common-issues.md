---
title: Common issues
description: ""
group: troubleshooting
redirect_from:
  - /docs/common-issues/
  - /docs/troubleshooting/
toc: true
---

In this section, we offer helpful information about issues you may encounter and questions you might have.

{% for cat in site.kb-cat %}
### {{ cat }}
<ul>
    {% for page in site.docs %}
        {% if page.kb == true %}
            {% if page.common == true %}
                {% for pc in page.categories %}
                    {% if pc == cat %}
                    <li><a href="{{ page.url }}">{{ page.title }}</a></li>
                    {% endif %}   <!-- match category -->
                {% endfor %}  <!-- page-categories -->
            {% endif %}   <!-- common -->
        {% endif %}   <!-- kb -->
    {% endfor %}  <!-- page -->
</ul>
{% endfor %}  <!-- cat -->
