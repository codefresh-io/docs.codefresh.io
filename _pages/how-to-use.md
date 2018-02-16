---
layout: simple
permalink: /how-to-use.html
---
## Callout snippet

{% highlight markdown %}
{% raw %}

{{site.data.callout.callout_info}}
##### Example 

Just head over to the example [__repository__](https://github.com/codefreshdemo/example-springboot-kafka){:target="_blank"} in Github and follow the instructions there.
{{site.data.callout.end}}

{% endraw %}
{% endhighlight %}

Result:

{{site.data.callout.callout_info}}
##### Example 

Just head over to the example [__repository__](https://github.com/codefreshdemo/example-springboot-kafka){:target="_blank"} in Github and follow the instructions there.
{{site.data.callout.end}}

## Syntax highlighting

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

The syntax highlighting is done via the scss/syntax.scss file.

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
