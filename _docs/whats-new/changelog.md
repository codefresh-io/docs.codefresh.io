---
title: "Codefresh SaaS Release Notes"
description: "New features, enhancements, bug fixes for SaaS"
redirect_from:
  - /changelog/
  - /docs/whats-new/
  - /docs/whats-new/whats-new/
  - /docs/whats-new/release-notes/
toc: true
---

This page gives you the complete list of release notes for our SaaS releases.
If you missed any of our previous online announcements, you can find the latest features, enhancements, and bug fixes, right here.

To stay up-to-date with our on-premises enhancements and features, see our [dedicated on-premises release notes]({{site.baseurl}}/docs/whats-new/on-prem-release-notes/).

> To subscribe to an RSS / Atom feed for our SaaS release notes, please [click here]({{ site.baseurl }}/changelog/feed.xml).

{% assign posts_by_year = site.posts | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year in posts_by_year %}
  <h2>{{ year.name }} Releases</h2>
  <ul>
    {% for post in year.items %}
      <li>
        <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}
