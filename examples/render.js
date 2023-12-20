import createPlugin from '@extism/extism';

async function main() {
  const plugin = await createPlugin(
    'https://github.com/dylibso/reactables/releases/latest/download/reactable.core.wasm',
    { useWasi: true }
  );

  const templ = {
    name: "greeting-template",
    code: `
      function App(props) {
        return <h1>Hello, {props.customerName}!</h1>
      }
    `
  }

  await plugin.call("compileTemplate", JSON.stringify(templ));

  const invocation = {
    name: "greeting-template",
    props: { customerName: "Benjamin" },
  }

  let out = await plugin.call("render", JSON.stringify(invocation));
  console.log(out.text())
}

main()
