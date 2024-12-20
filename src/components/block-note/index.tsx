"use client";
import { useEffect, useState } from "react";
import { type Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { BlockNoteView } from "@blocknote/mantine";
import { useCreateBlockNote } from "@blocknote/react";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

import initialContent from "~/const/initical-content";

const Sidebar = dynamic(() => import("~/components/sidebar"), { ssr: false });

export default function BlockNote() {
  // 优化 useState 初始值，减少无效类型转换
  const [blocks, setBlocks] = useState<Block[]>(() => {
    if (typeof window !== "undefined") {
      const savedBlocks = localStorage.getItem("yearself-blocks");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return savedBlocks ? JSON.parse(savedBlocks) : initialContent;
    }
    return initialContent;
  });

  // 创建编辑器实例
  const editor = useCreateBlockNote({
    initialContent: blocks,
    animations: true,
  });

  // 自动保存
  useEffect(() => {
    const saveInterval = setInterval(() => {
      if (blocks.length > 0) {
        localStorage.setItem("yearself-blocks", JSON.stringify(blocks));
        toast("自动保存成功", { position: "bottom-right" });
      }
    }, 30000);

    return () => clearInterval(saveInterval);
  }, [blocks]);

  // 提取内容生成逻辑
  const content = blocks
    .slice(4, blocks.length - 2)
    .map((block) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      return `<${block.type}>${block?.content?.[0]?.text || ""}</${block.type}>`;
    })
    .join("\n");

  // 总结功能函数
  const summaryFn = (content: string) => {
    const lastBlock = editor.document[editor.document.length - 1];
    if (lastBlock) {
      editor.updateBlock(lastBlock.id, {
        type: "paragraph",
        content: content,
      });
      editor.setTextCursorPosition(lastBlock.id, "start");
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  return (
    <>
      <div className="mx-auto h-full w-full">
        <BlockNoteView
          editor={editor}
          onChange={() => setBlocks(editor.document)}
          data-theming-css-demo
        />
      </div>
      <Sidebar content={content} summaryFn={summaryFn} />
    </>
  );
}
