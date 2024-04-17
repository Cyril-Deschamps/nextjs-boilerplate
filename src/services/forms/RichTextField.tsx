import { FunctionComponent } from "react";
import { FieldAttributes, useField } from "formik";
import "suneditor/dist/css/suneditor.min.css";
import dynamic from "next/dynamic";

const SunEditor = dynamic(() => import("suneditor-react"), {
  ssr: false,
});

function addIdToHeaders(html: string): string {
  return html.replace(
    /<(h[1-2])([^>]*)>([\s\S]*?)<\/\1>/gi,
    function (_match, tag, attrs, content) {
      return `<${tag} id="${
        Date.now() + Math.round(Math.random() * 100000000)
      }">${content}</${tag}>`;
    },
  );
}

// Formik has wrong typing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RichTextField: FunctionComponent<FieldAttributes<any>> = (props) => {
  const [field, , helper] = useField(props);

  return (
    <div className={"mt-xxs"} onClick={(e) => e.stopPropagation()}>
      <SunEditor
        onChange={(content) => {
          helper.setValue(content === "" ? null : addIdToHeaders(content));
        }}
        setContents={
          field.value === null || field.value === undefined ? "" : field.value
        }
        setOptions={{
          imageFileInput: false,
          tagsBlacklist: "br",
          minHeight: "200px",
          buttonList: [
            ["font"],
            ["fontSize"],
            ["formatBlock"],
            ["fontColor", "hiliteColor"],
            [
              "bold",
              "underline",
              "italic",
              "strike",
              "subscript",
              "superscript",
            ],
            ["align", "horizontalRule", "list", "table"],
            ["outdent", "indent"],
            ["link", "image"],
            ["showBlocks", "codeView"],
            ["preview", "undo", "redo"],
          ],
        }}
      />
    </div>
  );
};

export default RichTextField;
