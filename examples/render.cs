using System;
using Extism.Sdk;
using System.Text.Json;

namespace SerializeBasic
{
    public class Template
    {
        public string Name { get; set; }
        public string Code { get; set; }
    }

    public class Invocation
    {
        public string Name { get; set; }
        public Dictionary<string, string> Props { get; set; }
    }

    public class Program
    {
        public static void Main()
        {
            var manifest = new Manifest(new UrlWasmSource("https://github.com/dylibso/reactables/releases/latest/download/reactable.core.wasm"));
            using var reactable = new Plugin(manifest, new HostFunction[] { }, withWasi: true);

            var template = new Template
            {
                Name = "greeting-template",
                Code = @"
                    function App(props) {
                      return <h1>Hello, {props.customerName}!</h1>
                    }
                  "
            };

            string templString = JsonSerializer.Serialize(template);
            reactable.Call("compileTemplate", templString);

            var invocation = new Invocation
            {
                Name = "greeting-template",
                Props = new Dictionary<string, string>() {
                  { "customerName", "Benjamin" }
                }
            };


            string invocationString = JsonSerializer.Serialize(invocation);
            var result = reactable.Call("render", invocationString);
            Console.WriteLine(result);
        }
    }
}

