import React, { useCallback, useEffect, useRef, useState } from "react";
import { v4 } from "uuid";

function Editor() {
  const [focusIdx, setFocusIdx] = useState<number>(0);
  const [editorValue, setEditorValue] = useState<
    { id: string; data: { text: string } }[]
  >([
    {
      id: v4(),
      data: { text: "" },
    },
  ]);
  const editorWrapperRef = useRef<HTMLDivElement>(null);

  const onDefaultKeyDown: React.KeyboardEventHandler<HTMLDivElement> =
    useCallback(
      (e) => {
        if (e.key === "Enter") {
          if (!e.shiftKey) {
            e.preventDefault();
            let addIdx: number;
            setFocusIdx((prev) => {
              const newFocusIdx = prev + 1;
              addIdx = newFocusIdx;
              return newFocusIdx;
            });
            setEditorValue((prev) => {
              const newEditorValue = [...prev];
              newEditorValue.splice(addIdx, 0, {
                id: v4(),
                data: { text: "" },
              });
              return newEditorValue;
            });
          }
        }
        if (e.key === "ArrowUp" && focusIdx > 0) {
          if (document.getSelection()?.anchorNode instanceof HTMLDivElement) {
            setFocusIdx((prev) => prev - 1);
          }
          //@ts-ignore
          if (document.getSelection().baseNode.previousSibling === null) {
            setFocusIdx((prev) => prev - 1);
          }
        }
        if (e.key === "ArrowDown" && editorValue.length - 1 > focusIdx) {
          if (document.getSelection()?.anchorNode instanceof HTMLDivElement) {
            setFocusIdx((prev) => prev + 1);
          }
          //@ts-ignore
          if (document.getSelection().baseNode.nextSibling === null) {
            setFocusIdx((prev) => prev + 1);
          }
        }
        if (e.key === "ArrowLeft" && focusIdx > 0) {
          console.log(document.getSelection());
          // @ts-ignore
          if (document.getSelection().baseNode.previousSibling === null) {
            setFocusIdx((prev) => prev - 1);
          }
        }
        if (e.key === "ArrowRight" && editorValue.length - 1 > focusIdx) {
          console.log(document.getSelection());
          const selection = document.getSelection();
          // @ts-ignore
          if (
            // @ts-ignore
            selection?.baseNode?.nextSibling === null &&
            // @ts-ignore
            selection?.baseOffset === selection?.focusOffset
          ) {
            setFocusIdx((prev) => prev + 1);
          }
        }
      },
      [editorValue, focusIdx]
    );

  const onFocus: (idx: number) => React.FocusEventHandler<HTMLDivElement> =
    useCallback(
      (idx) => (e) => {
        setFocusIdx(idx);
      },
      []
    );

  const onChange: React.FormEventHandler<HTMLDivElement> = useCallback((e) => {
    // @ts-ignore
    console.log(e.target.value);
  }, []);

  useEffect(() => {
    editorWrapperRef.current?.childNodes[focusIdx].focus();
  }, [focusIdx]);

  return (
    <div>
      <div ref={editorWrapperRef}>
        {editorValue.map((v, idx) => (
          <div
            key={v.id}
            contentEditable
            onKeyDown={onDefaultKeyDown}
            onFocus={onFocus(idx)}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}

export default Editor;
