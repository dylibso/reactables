<p align="center">
  <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/reactables-wasm.png">
      <img alt="Reactables by Dylibso" width="75%" style="max-width: 600px" src=".github/assets/reactables-wasm.png">
  </picture>
</p>
<h1 style="text-align: center;">Shrinkwrapped, portable and secure React components</h1>

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
**Choose from three pre-built Reactables that are ready to go out-of-the-box for your immediate enjoyment.** Each Reactable is implemented as 
a WebAssembly Module in the form of an [Extism Plugin](https://extism.org/docs/concepts/plug-in) that embeds React and other dependencies along with an interface to compile JSX templates and render them with supplied props. 

- **Reactable Core** provides a foundational plugin with React securely embedded to provide the core JSX compilation and rendering capabilities.
- **Reactable Email** extends Reactable Core with components from [react-email](https://github.com/resendlabs/react-email) 
- **Reactable PDF** extends Reactable Core  with components from [react-pdf](https://github.com/diegomura/react-pdf) 

## Basic Usage
1. Include the appropriate [Extism SDK](https://extism.org/docs/quickstart/host-quickstart) into your application 
2. Instantiate your Reactable of choice as a new Extism Plugin 
3. Call the `compileTemplate` function with your JSX template
4. Call the `render` function with your props
5. Voila!

## Example

The following example embeds Reactable Core in a Ruby program to render a simple a JSX template with a customer name property. 

```ruby
require "extism"

url = "https://github.com/extism/reactables/releases/latest/download/reactable.core.wasm"
manifest = Extism::Manifest.from_url url
reactable = Extism::Plugin.new(manifest)

jsx_code = <<-JSX
export function App(props) {
  return <h1>Hello {props.customerName}!</h1>
}
JSX

# compile our JSX template
reactables.call('compileTemplate',
  JSON.generate(
    name: "greeting-template",
    code: jsx_code,
    isJSX: true
  )
)

# Render with customer specific props
html = reactables.call('render',
  JSON.generate(
    templateName: "greeting-template",
    props: { customerName: "Benjamin" },
  )
)

puts html
# => <h1>Hello Benjamin!</h1>
```


## Build your own 

Reactable Core can be extended to create new and novel Reactables that incorporate other components, styles, packages, etc.

