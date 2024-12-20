"use client";
import { Toaster } from "react-hot-toast";
import "../styles/blocknote.css";
import dynamic from "next/dynamic";

const BlockNote = dynamic(() => import("~/components/block-note"), {
  ssr: false,
});

export default function App() {
  return (
    <div className="flex h-screen w-screen flex-row overflow-x-hidden bg-stone-50">
      <BlockNote />
      <Toaster />
    </div>
  );
}
