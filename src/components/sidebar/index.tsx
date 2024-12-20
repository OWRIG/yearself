"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { CircularProgress } from "@nextui-org/progress";
import { useState, useEffect } from "react";
import { type Character, getCharacterPrompt } from "~/const/prompt";
import toast from "react-hot-toast";

const Sidebar = ({
  content,
  summaryFn,
}: {
  content: string;
  summaryFn: (content: string) => void;
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [style, setStyle] = useState<Character>("王小波");
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [model, setModel] = useState("");
  const [wordCount, setWordCount] = useState<number>(1000);
  const prompt = getCharacterPrompt(style);
  const [promptText, setPromptText] = useState<string>(prompt);

  const ableToSubmit = url && token && model && wordCount > 0;

  useEffect(() => {
    setPromptText(prompt);
  }, [prompt]);

  const handleSubmit = async () => {
    setLoading(true);
    await fetch("/api/completion", {
      method: "POST",
      body: JSON.stringify({
        prompt:
          promptText +
          `\n\n 用户输入为：${content} 输出字数限制为 ${wordCount} 字左右`,
        apiKey: token,
        baseURL: url,
        model: model,
        wordCount: wordCount,
      }),
    })
      .then((response) => {
        void response.json().then((json: { text: string }) => {
          console.log(json);
          summaryFn(json.text);
          toast.success("总结生成成功");
        });
      })
      .catch((error) => {
        toast.error(`总结生成失败: ${error}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex h-full w-1/2 flex-col gap-4 bg-stone-50 p-8">
      <Select
        label="总结风格"
        placeholder="请选择总结风格"
        variant="bordered"
        className="w-full"
        defaultSelectedKeys={[style]}
        onSelectionChange={(e) => {
          setStyle(e.currentKey as Character);
        }}
      >
        <SelectItem key="鲁迅" value="鲁迅">
          鲁迅
        </SelectItem>
        <SelectItem key="张爱玲" value="张爱玲">
          张爱玲
        </SelectItem>
        <SelectItem key="王小波" value="王小波">
          王小波
        </SelectItem>
      </Select>

      <Textarea
        label="提示词"
        placeholder="这里将展示对应风格的提示词"
        variant="bordered"
        className="w-full"
        minRows={6}
        maxRows={12}
        value={promptText}
        onValueChange={(e) => setPromptText(e)}
      />
      <Input
        label="代理地址"
        placeholder="请输入OpenAI API代理地址"
        variant="bordered"
        className="w-full"
        value={url}
        onValueChange={(e) => setUrl(e)}
      />
      <Input
        label="API Token"
        placeholder="请输入OpenAI API Token"
        variant="bordered"
        type="password"
        className="w-full"
        value={token}
        onValueChange={(e) => setToken(e)}
      />
      <Input
        label="模型名称"
        placeholder="例如: gpt-3.5-turbo"
        variant="bordered"
        className="w-full"
        value={model}
        onValueChange={(e) => setModel(e)}
      />
      <Input
        label="字数"
        placeholder="请输入大致字数"
        variant="bordered"
        className="w-full"
        value={wordCount.toString()}
        onValueChange={(e) => setWordCount(Number(e))}
        // 数字小于 3000
        maxLength={4}
      />

      <Button
        color="default"
        className="w-full"
        onClick={handleSubmit}
        isDisabled={loading || !ableToSubmit}
      >
        {loading ? (
          <CircularProgress size="sm" aria-label="Loading..." color="default" />
        ) : (
          "生成总结"
        )}
      </Button>
    </div>
  );
};

export default Sidebar;
