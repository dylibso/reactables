url = "https://github.com/dylibso/reactables/releases/latest/download/reactble.core.wasm"
manifest = %{wasm: [%{url: url}]}
{:ok, reactable} = Extism.Plugin.new(manifest, true)

# Define the JSX template
templ = %{
  "name" => "greeting-template",
  "code" => """
    function App(props) {
      return <h1>Hello, {props.customerName}!</h1>
    }
  """
}

# Compile the template and register it by name
reactable.call("compileTemplate", Jason.encode!(templ))

# Define props and render the template
props = %{ "customerName" => "Benjamin" }
html = reactable.call("render", Jason.encode!(%{ "props" => props, "name" => "greeting-template" }))

IO.puts(html)

