import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
//@ts-ignore
import Link from "@editorjs/link";
//@ts-ignore
import Table from "@editorjs/table";
//@ts-ignore
import Checklist from "@editorjs/checklist";
//@ts-ignore
import List from "@editorjs/list";
//@ts-ignore
import Quote from "@editorjs/quote";
//@ts-ignore
import Embed from "@editorjs/embed";
//@ts-ignore
import Image from "@editorjs/image";
//@ts-ignore
import Code from "@editorjs/code";
//@ts-ignore
import InlineCode from "@editorjs/inline-code";
//@ts-ignore
import DragDrop from "editorjs-drag-drop";

function EditorJs() {
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    const editor = new EditorJS({
      holder: "editorjs",
      tools: {
        header: Header,
        link: Link,
        table: Table,
        checklist: Checklist,
        list: List,
        quote: Quote,
        embed: Embed,
        image: Image,
        code: Code,
        inlineCode: InlineCode,
      },
      onReady: () => {
        new DragDrop(editor);
      },
    });
    editorRef.current = editor;
  }, []);
  return (
    <div>
      <button
        className="hover:bg-purple-500 rounded-full border-purple-500 border px-2 py-1"
        onClick={() => {
          editorRef.current?.save().then((outputData) => {
            console.log(outputData);
          });
        }}
      >
        save
      </button>
      <label htmlFor="editor">
        <div title="edtior" id="editorjs"></div>
      </label>
    </div>
  );
}

export default EditorJs;
