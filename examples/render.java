import com.google.gson.Gson;
import org.extism.sdk.manifest.Manifest;
import org.extism.sdk.wasm.UrlWasmSource;
import org.extism.sdk.Plugin;

public class ReactableJava {
  static class Template {
    private String name;
    private String code;
  }

  static class Invocation {
    private String name;
    private Map<String, String> props;
  }

  public static void main(String[] args) {
    var url = "https://github.com/dylibso/reactables/releases/latest/download/reactable.core.wasm";
    var manifest = new Manifest(List.of(UrlWasmSource.fromUrl(url)));
    var reactable = new Plugin(manifest, true, null);

    Template template = new Template();
    template.setName("greeting-template");
    template.setCode(
        "function App(props) {\n" +
            "  return <h1>Hello, {props.customerName}!</h1>\n" +
            "}");

    Gson gson = new Gson();
    String templString = gson.toJson(template);
    reactable.call("compileTemplate", templString);

    Invocation invocation = new Invocation();
    invocation.setName("greeting-template");
    Map<String, String> props = new HashMap<>();
    props.put("customerName", "Benjamin");
    invocation.setProps(props);

    String invocationString = gson.toJson(invocation);
    String result = reactable.call("render", invocationString);
    System.out.println(result);
  }
}
