package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/extism/go-sdk"
	"os"
)

type Template struct {
	Name string `json:"name"`
	Code string `json:"code"`
}

type Invocation struct {
	Name  string                 `json:"name"`
	Props map[string]interface{} `json:"props"`
}

func main() {
	manifest := extism.Manifest{
		Wasm: []extism.Wasm{
			extism.WasmUrl{
				Url: "https://github.com/dylibso/reactables/releases/latest/download/reactable.core.wasm",
			},
		},
	}

	ctx := context.Background()
	config := extism.PluginConfig{
		EnableWasi: true,
	}
	reactable, err := extism.NewPlugin(ctx, manifest, config, []extism.HostFunction{})

	if err != nil {
		fmt.Printf("Failed to initialize plugin: %v\n", err)
		os.Exit(1)
	}

	jsx_code := `
    function App(props) {
      return <h1>Hello, {props.customerName}!</h1>
    }
  `

	templ := Template{
		Name: "greeting-template",
		Code: jsx_code,
	}

	templJson, err := json.Marshal(templ)
	if err != nil {
		fmt.Printf("Failed to initialize plugin: %v\n", err)
		os.Exit(1)
	}

	exit, _, err := reactable.Call("compileTemplate", templJson)
	if err != nil {
		fmt.Println(err)
		os.Exit(int(exit))
	}

	var props map[string]interface{}
	props["customerName"] = "Benjamin"

	inv := Invocation{
		Name:  "greeting-template",
		Props: props,
	}

	invJson, err := json.Marshal(inv)
	if err != nil {
		fmt.Printf("Failed to marshal invocation: %v\n", err)
		os.Exit(1)
	}

	exit, out, err := reactable.Call("render", invJson)
	if err != nil {
		fmt.Println(err)
		os.Exit(int(exit))
	}

	fmt.Println(string(out))
}
