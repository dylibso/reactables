import extism
import json

manifest = {
    "wasm": [
        { "url": "https://github.com/dylibso/reactables/releases/download/latest/reactable.core.wasm" }
    ]
}
reactable = extism.Plugin(manifest, wasi=True)

# Take our JSX code as a string
templ = {
        "name": "greeting-template",
        "code": """
            function App(props) {
              return <h1>Hello, {props.customerName}!</h1>
            }
        """
}

# Compile the template and register it by name
reactable.call('compileTemplate', json.dumps(templ))

# Render template by name passing in some props
props = { "customerName": "Benjamin" }
html = reactable.call('render', json.dumps({ "props": props, "name": "greeting-template" }))

print(html)
