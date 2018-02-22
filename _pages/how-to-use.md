---
title: "How to Use: Code snippets"
description: ""
permalink: /how-to-use.html
---

## 1. Callout snippets

You have a few option how to specify/provide callout message

### Callout as data variable

  `Example:`
{% highlight markdown %}
{% raw %}

{{site.data.callout.callout_info}}
##### Example 

Just head over to the example [__repository__](https://github.com/codefreshdemo/example-springboot-kafka){:target="_blank"} in Github and follow the instructions there.
{{site.data.callout.end}}

{% endraw %}
{% endhighlight %}

  `Result:`

{{site.data.callout.callout_info}}
##### Example

Just head over to the example [__repository__](https://github.com/codefreshdemo/example-springboot-kafka){:target="_blank"} in Github and follow the instructions there.
{{site.data.callout.end}}

#### Available styles:

* {% raw %}`{{site.data.callout.callout_info}}`{% endraw %} - callout with `info` style
* {% raw %}`{{site.data.callout.callout_success}}`{% endraw %} - callout with `success` style
* {% raw %}`{{site.data.callout.callout_warning}}`{% endraw %} - callout with `warning` style 
* {% raw %}`{{site.data.callout.callout_danger}}`{% endraw %} - callout with `danger` style 

---

### Callout as `>` (blockquote)

  `Example:`
{% highlight markdown %}
{% raw %}

> List of options:
1. Option 1
2. Option 2
3. Option 3
4. Option 4

{% endraw %}
{% endhighlight %}

  `Result:`

* Default `blockquote`
> List of options:
1. Option 1
2. Option 2
3. Option 3
4. Option 4 

#### Available styles for blockquote:

* {% raw %}`{:.bd-callout-info}`{% endraw %}
* {% raw %}`{:.bd-callout-success}`{% endraw %}
* {% raw %}`{:.bd-callout-warning}`{% endraw %}
* {% raw %}`{:.bd-callout-danger}`{% endraw %}


  `Example`
{% highlight markdown %}
{% raw %}

{:.bd-callout-success}
> Info blockquote:
1. Option 1
2. Option 2

{% endraw %}
{% endhighlight %}

Result:

{:.bd-callout-success}
> Info blockquote:
1. Option 1
2. Option 2


## 2. Syntax highlighting

### About syntax highlighting

For syntax highlighting, use fenced code blocks optionally followed by the language syntax you want:

<figure class="highlight"><pre><code class="language-md" data-lang="md">
```java
import java.util.Scanner;

public class ScannerAndKeyboard
{

	public static void main(String[] args)
	{	Scanner s = new Scanner(System.in);
		System.out.print( "Enter your name: "  );
		String name = s.nextLine();
		System.out.println( "Hello " + name + "!" );
	}
}
```
</code></pre></figure>

This looks as follows:

```java
import java.util.Scanner;

public class ScannerAndKeyboard
{

	public static void main(String[] args)
	{	Scanner s = new Scanner(System.in);
		System.out.print( "Enter your name: "  );
		String name = s.nextLine();
		System.out.println( "Hello " + name + "!" );
	}
}
```

Fenced code blocks require a blank line before and after.

If you're using an HTML file, you can also use the `highlight` command with Liquid markup.


{{site.data.callout.callout_danger}}
##### Important 

Make sure expressions like {% raw %}`${{step_id}}`{% endraw %} should be wrapped with special delimiters <code class="highlighter-rouge">&#123;% raw %&#125;</code> and <code class="highlighter-rouge">&#123;% endraw %&#125;</code> to prevent its erroneous translations.  
See more [https://shopify.github.io/liquid/tags/raw/](https://shopify.github.io/liquid/tags/raw/){:target="_blank"}
{{site.data.callout.end}}

<figure class="highlight"><pre><code class="language-yaml" data-lang="yaml">
&#123;% highlight yaml %&#125;
&#123;% raw %&#125;
step_name:
  title: Step Title
  description: Step description
  image: image/id
  working_directory: $&#123;&#123;step_id&#125;&#125;
  commands: 
    - bash-command1
    - bash-command2
&#123;% endraw %&#125;
&#123;% endhighlight %&#125;
</code></pre></figure>

Result: 

{% highlight yaml %}
{% raw %}
step_name:
  title: Step Title
  description: Step description
  image: image/id
  working_directory: ${{step_id}}
  commands: 
    - bash-command1
    - bash-command2
{% endraw %}
{% endhighlight %}

The theme has syntax highlighting specified in the configuration file as follows:

```
highlighter: rouge
```

The syntax highlighting is done via the `scss/_syntax.scss` file.

### Available lexers 

The keywords you must add to specify the highlighting (in the previous example, `ruby`) are called "lexers." You can search for "lexers." Here are some common ones I use:

* `js`
* `html`
* `yaml`
* `css`
* `json`
* `php`
* `java`
* `cpp`
* `dotnet`
* `xml`
* `http`

## 3. Permalinks

Our documentation site supports jekyll `docs` collection which has default permalink set to `/:collection/:path/`

### Default Permalink

{% highlight yaml %}
{% raw %}
collections:
  docs:
    output: true
    permalink: /:collection/:path/
{% endraw %}
{% endhighlight %}

See more in `_config.yml`

### Change permalink
Add `permalink:` property into FrontMatter section of markdown file to set custom url for a page
 
Review following **example** folder structure

{% highlight md %}
{% raw %}
_site/
├── COLLECTION_NAME //in our case will be docs
│   └── super-page
│       └── test
│           └── hello-world.md
{% endraw %}
{% endhighlight %}

Check `hello-world.md` which is a child of the following folder structure:
 
`/COLLECTION_NAME/super-page/test/` 

correspondingly the page url will be equal to
 
`http://URL_OF_SITE/COLLECTION_NAME/super-page/test/hello-world/`

Set permalink like given below to have custom file name in the url:

 `hello-world.md`
{% highlight md %}
{% raw %}
---
title: "Hello World!" 
permalink: /:collection/super-page/test/slack-integration/
---

## Hello
This is hello world file
{% endraw %}
{% endhighlight %}

where: 
* `:collection` - build-in variable in Jekyll
* `slack-integration` - new chunk of file name in url

so result will be `http://URL_OF_SITE/COLLECTION_NAME/super-page/test/slack-integration/`

Read more [Jekyll Collections](https://jekyllrb.com/docs/collections/){:target="_blank"} and [Jekyll Permalinks](https://jekyllrb.com/docs/permalinks/){:target="_blank"} 
