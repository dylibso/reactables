require 'extism'

url = 'https://github.com/extism/reactables/releases/latest/download/reactable.core.wasm'
manifest = Extism::Manifest.from_url url
reactable = Extism::Plugin.new(manifest)

jsx_code = <<~JSX
  export function App(props) {
    return <h1>Hello {props.customerName}!</h1>
  }
JSX

# Compile our JSX template and register by name
reactable.call('compileTemplate',
               JSON.generate(
                 name: 'greeting-template',
                 code: jsx_code
               ))

# Render with customer specific props
props = { customerName: 'Benjamin' }
html = reactable.call('render',
                      JSON.generate(
                        templateName: 'greeting-template',
                        props: props
                      ))

puts html
# => <h1>Hello Benjamin!</h1>
