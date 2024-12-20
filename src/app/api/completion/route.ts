import { generateText } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export const maxDuration = 60;

export async function POST(req: Request) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    prompt,
    apiKey,
    baseURL,
    model,
    wordCount,
  }: {
    prompt: string;
    apiKey: string;
    baseURL: string;
    model: string;
    wordCount: number;
  } = await req.json();

  const openai = createOpenAI({
    apiKey,
    baseURL,
  });

  const { text } = await generateText({
    model: openai(model),
    system:
      "你是一位风格多样的总结大师，能够很好地结合预设的文风、模拟相应的人物风格，并且模拟用户的风格角度对用户输入进行总结。",
    prompt,
    maxTokens: wordCount * 2,
    temperature: 0.5,
    topP: 0.5,
  });

  return Response.json({ text });
}
