---
title: "Codefresh GitOps Cloud Release Notes"
description: "New features, enhancements, bug fixes for GitOps Cloud"
toc: true
---

This page gives you the complete list of release notes for our GitOps Cloud releases.
If you missed any of our previous online announcements, you can find the latest features, enhancements, and bug fixes, right here.

> To subscribe to an RSS / Atom feed for our SaaS release notes, please [click here]({{ site.baseurl }}/changelog/gitops.xml).

{% assign posts_by_year = site.posts-gitops | group_by_exp: "post", "post.date | date: '%Y'" %}
{% for year in posts_by_year %}
  <h2>{{ year.name }}</h2>
  <ul>
    {% for post in year.items %}
      <li>
        <a href="{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
      </li>
    {% endfor %}
  </ul>
{% endfor %}
