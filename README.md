<p align="center">
  <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/reactables-wasm.png">
      <img alt="Reactables by Dylibso" width="75%" style="max-width: 600px" src=".github/assets/reactables-wasm.png">
  </picture>
</p>
<h1 style="text-align: center;">Shrinkwrapped, Portable, <span>&#38;</span> Secure React Components</h1>

**Reactables enable you to bring the power of React and JSX outside of the JavaScript ecosystem. Compile and render JSX templates
securly from over 15 different programming languages including Python, Go, Java, Ruby, PHP, and more!**

<p align="left">
 <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/reactables-diagram.png">
      <img alt="Reactables by Dylibso" width="100%" src=".github/assets/reactables-diagram.png">
  </picture>
</p>

## Why Reactables?
There are many host-language agnostic templating languages (e.g., Handlebars.js, Mustache, Liquid, etc.) in the world today, but most are not ideal for the following reasons:

- They lack expressivity (ie. not Turing-complete languages)
- They can be unfamiliar to many users and come with a non-zero learning curve
- They require users to leave all of their pre-built components behind and start from scratch
- They are incompatible with popular web development tools (e.g. Webpack, ESBuild, etc.)

In an ideal world, React/JSX could be used as a general purpose template engine/language and all of the above limitiations would fade
away, but alas:
- The entire ecosystem is JavaScript only. What if your code base is written in something else?
- What if you need to render arbitrary JSX provide by a third party? That's not very secure...

Enter Reactables! With Reactables, you can now compile and render React/JSX **safely** from within your programming language of choice via the power of WebAssembly (Wasm).

### Use Cases

1. Your entire codebase is written in `<any_language_other_than_JavaScript>` but you really want/need to render templates with JSX

2. You're a SaaS platform and you want to give your customers the ability to customize various artifacts and touch points such as hosted pages, emails, and PDFs. 

## Features
- Run arbritrary JavaScript / JSX in your code **securely**!
- Suport for over 15 different host programming languages
- Incorporate all of your favorite tooling, styling, and NPM packages
- Package up a full blown JSX app using ESBuild or Webpack
- Build and distribute new Reactables. They're customizable and portable!

## Ready to Consume

Choose from three pre-built Reactables that are ready to go out-of-the-box for your immediate enjoyment. [Or create your own!](#build-your-own-reactable!)

### Reactable Core
Provides a foundational module with React packaged

### Reactable Email 
Brings in components from https://github.com/resendlabs/react-email to Reactable Core for customized email renderings

 ### Reactable PDF
Brings in components from https://github.com/diegomura/react-pdf to Reactable Core for customized email renderings


## Usage

Reactables are implemented as WebAssembly Modules that embed React and JSX along with an interface for compiling and rendering the JSX 
template.

1. Include the appropriate Extism SDK into your application (Reactables are powered by a WebAssembly framework called)
2. Instantiate your Reactable of choice and compile your JSX template
4. Render the template with your data

Your customer writes a React.Component, packages it up with all of their own dependencies, including any 
previously built components, and you pass in props (e.g. subscription data) and render it. Voila!


## Example (Render Components from Python)

The following example embeds Reactable Core in a Python program to render a simple a JSX template with a customer name property. 


```python
import extism
import json

plugin_url = "https://github.com/dylibso/reactables/releases/latest/download/reactable.core.wasm"
manifest = { "wasm": [ { "url": plugin_url } ] }
reactable = extism.Plugin(manifest, wasi=True)

# Take our JSX code as a string
jsx_code = """
function App(props) {
  return <h1>Hello, {props.customerName}!</h1>
}
"""

# Compile the template and register it by name
reactable.call('compileTemplate', json.dumps({
            "name": "greeting-template",
            "code": code,
            }))

# Render template by name, passing in some props
props = { "customerName": "Benjamin" }
html = reactable.call('render', json.dumps({
            "name": "greeting-template",
            "props": props,
            }))

print(html)
# <h1>Hello, Benjamin!</h1>
```

## Build your own 

Reactable Core can be extended to create new and novel Reactables that incorporate other components, styles, packages, etc.

