<p align="center">
  <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/reactables-wasm.png">
      <img alt="Reactables by Dylibso" width="75%" style="max-width: 600px" src=".github/assets/reactables-wasm.png">
  </picture>
</p>
<h1 style="text-align: center;">Shrinkwrapped, portable and secure React components</h1>

 ## Why Reactables?

**Reactables enable SaaS platforms to bring React and JSX to programming languages (other than JavaScript) for true templating power.**

Users need the power to customize SaaS platform offerings such as emails, PDFs and other artifacts, so vendors often turn to templating
languages to provide this capability, but most of the host-language agnostic templating languages (e.g., Handlebars.js, Mustache, Liquid, etc.) in the world today are not ideal for the following reasons:
- They lack expressivity (ie. not Turing-complete languages)
- They can be unfamiliar to many users and come with a non-zero learning curve
- They require users to leave all of their pre-built components behind and start from scratch
- They are incompatible with popular web development tools (e.g. Webpack, ESBuild, etc.)

In a more ideal world, React/JSX would be used as a general purpose template engine/language and all of the above limitiations would fade
away, however...
- The entire ecosystem is JavaScript only. What if the SaaS platform doesn't a have JavaScript backend? :sad_face:
- JSX is JavaScript and it's not very secure to run a customer script in the backend :grimace_face: 

Enter Reactables! With Reactables, you can now compile and render React/JSX safely from within your programming language of choice.
Your customer writes a React.Component, packages it up with all of their own dependencies, including any 
previously built components, and you pass in props (e.g. subscription data) and render it. Voila!

<p align="left">
 <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/reactables-diagram.png">
      <img alt="Reactables by Dylibso" width="100%" src=".github/assets/reactables-diagram.png">
  </picture>
</p>

## Features
- Run arbritrary JavaScript / JSX in your code **securely**!
- Suport for over 15 different host programming languages including Python, Go, Java, Ruby, PHP, etc.
- Incorporate all of your favorite tooling, styling, and NPM packages
- Package up a full blown JSX app using ESBuild or Webpack
- Build and distribute new Reactables. They're customizable and portable!

## Ready to Consume

Choose from three pre-built Reactables that are ready to go out-of-the-box for your immediate enjoyment. [Or create your own!](build-your-own-reactable!)

### Reactable Core
Provides a foundational module with React packaged up and ready to go. 

### Reactable Email 
Brings in components from https://github.com/resendlabs/react-email to Reactable Core for customized email renderings

 ### Reactable PDF
Brings in components from https://github.com/diegomura/react-pdf to Reactable Core for customized email renderings


## Usage
1. Include the appropriate Extism SDK into your application (Reactables are powered by a WebAssembly framework called)
2. Instantiate your Reactable of choice and compile your JSX template
4. Render the template with your data


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

## How it Works

Reactables are implemented as WebAssembly Modules that embed React and JSX along with an interface for compiling and rendering the JSX 
template.


## Build your own Reactable!

Reactable Core can be extended to create new and novel Reactables that incorporate other components, styles, packages, etc.


### Github Action
Take a look at this Github Action to aid in your building of new Reactables
