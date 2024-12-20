"use client";
import { useEffect, useState } from "react";
import { type Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

import initialContent from "~/const/initical-content";
import "../styles/blocknote.css";
import Sidebar from "~/components/sidebar";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const [blocks, setBlocks] = useState<Block[]>(() => {
    if (typeof window !== "undefined") {
      const savedBlocks = localStorage.getItem("yearself-blocks");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return savedBlocks
        ? JSON.parse(savedBlocks)
        : (initialContent as unknown as Block[]);
    }
    return initialContent as unknown as Block[];
  });

  // 创建编辑器实例
  const editor = useCreateBlockNote({
    initialContent: blocks,
    animations: true,
  });

  // 每分钟自动保存
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (blocks.length > 0) {
        localStorage.setItem("yearself-blocks", JSON.stringify(blocks));
        toast("自动保存成功", { position: "bottom-right" });
      }
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [blocks]);

  // content 是blocks 的第 4 个到倒数第二个元素的.content[0]?.text || " "
  const content = blocks
    .slice(4, blocks.length - 2)
    .map((block: Block) => {
      // @ts-expect-error  @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return `<${block.type}>${block?.content?.[0]?.text || ""}</${block.type}>`;
    })
    .join("\n");

  // 生成总结后的文本，并展示在 blocks 的最后 （函数）
  const summaryFn = (content: string) => {
    const lastBlock = editor.document[editor.document.length - 1];
    if (lastBlock) {
      editor.updateBlock(lastBlock?.id, {
        type: "paragraph",
        content: content,
      });
      editor.setTextCursorPosition(lastBlock?.id, "start");
      // 滚动到最底部
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-row overflow-x-hidden bg-stone-50">
      <div className="mx-auto h-full w-full">
        <BlockNoteView
          editor={editor}
          onChange={() => {
            setBlocks(editor.document);
          }}
          data-theming-css-demo
        />
      </div>
      <Sidebar content={content} summaryFn={summaryFn} />
      <Toaster />
    </div>
  );
}
