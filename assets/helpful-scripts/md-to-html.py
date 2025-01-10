import re
import markdown
from pathlib import Path

def convert_markdown_to_html(markdown_content):
    protected_blocks = []
    
    # save display math blocks ($$...$$)
    def save_display_math(match):
        protected_blocks.append(match.group(1))
        return f"DISPLAYMATH{len(protected_blocks)-1}PLACEHOLDER"
    
    content = re.sub(r'\$\$(.*?)\$\$', save_display_math, markdown_content, flags=re.DOTALL|re.MULTILINE)
    
    # save inline math blocks ($...$)
    def save_inline_math(match):
        protected_blocks.append(match.group(0))
        return f"PROTECTEDBLOCK{len(protected_blocks)-1}PLACEHOLDER"
    
    content = re.sub(r'\$((?!\$).*?)\$', save_inline_math, content)
    
    # convert ![[image.png]] to HTML img tag with styles
    def process_image(match):
        img_path = match.group(1)
        html = f'<img src="assets/images/{img_path}" style="display: block; margin: auto; width: 100%;">'
        protected_blocks.append(html)
        return f"PROTECTEDBLOCK{len(protected_blocks)-1}PLACEHOLDER"
    
    content = re.sub(r'!\[\[(.*?)\]\]', process_image, content)
    
    # preprocess nested lists to ensure proper indentation
    lines = content.split('\n')
    processed_lines = []
    for line in lines:
        # if line starts with a dash and has indentation, ensure it's properly formatted
        if re.match(r'\s*-', line):
            # count leading spaces
            indent = len(re.match(r'^\s*', line).group())
            # ensure proper markdown list indentation (4 spaces per level)
            processed_line = ' ' * (indent * 2) + line.lstrip()
            processed_lines.append(processed_line)
        else:
            processed_lines.append(line)
    content = '\n'.join(processed_lines)
    
    # handle code blocks with filenames
    def process_code_block(match):
        lang_spec = match.group(1) if match.group(1) else ''
        code = match.group(2)
        
        if ':' in lang_spec:
            lang, filename = lang_spec.split(':', 1)
            html = f'<div class="code-block-wrapper"><div class="code-filename">{filename}</div><pre class="line-numbers"><code class="language-{lang}">{code}</code></pre></div>'
        else:
            html = f'<div class="code-block-wrapper"><pre class="line-numbers"><code class="language-{lang_spec}">{code}</code></pre></div>'
        protected_blocks.append(html)
        return f"PROTECTEDBLOCK{len(protected_blocks)-1}PLACEHOLDER"
    
    content = re.sub(r'```(.*?)\n(.*?)```', process_code_block, content, flags=re.DOTALL)
    
    # convert to html using python-markdown with all necessary extensions
    html = markdown.markdown(content, extensions=['tables', 'fenced_code', 'sane_lists', 'nl2br'])
    
    # first remove p tags around display math blocks
    html = re.sub(r'<p>DISPLAYMATH(\d+)PLACEHOLDER</p>', r'DISPLAYMATH\1PLACEHOLDER', html)
    
    # restore all protected blocks (math and code)
    for i, block in enumerate(protected_blocks):
        html = html.replace(f"PROTECTEDBLOCK{i}PLACEHOLDER", block)
        html = html.replace(f"DISPLAYMATH{i}PLACEHOLDER", block)
    
    return html

def process_blog_post(markdown_path, template_path, output_path):
    try:
        # read markdown content
        md_content = Path(markdown_path).read_text(encoding='utf-8')
        
        # convert to html
        blog_html = convert_markdown_to_html(md_content)
        
        # read template
        template = Path(template_path).read_text(encoding='utf-8')
        
        # insert blog content into template - using raw string for regex pattern
        final_html = re.sub(r'<blog>\s*</blog>', lambda m: f'<blog>{blog_html}</blog>', template)
        
        # write output
        Path(output_path).write_text(final_html, encoding='utf-8')
        print(f"successfully converted {markdown_path} to {output_path}")
        
    except FileNotFoundError as e:
        print(f"error: could not find file - {e}")
    except Exception as e:
        print(f"error during conversion: {e}")


process_blog_post("raspberry-pi-server.md", "blog_posts/template.html", "blog_posts/raspberry-pi-server.html")
