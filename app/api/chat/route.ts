import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages, data } = await req.json();
  const apiKey = data?.apiKey;

  if (!apiKey) return new Response('Missing API Key', { status: 401 });

  const openai = createOpenAI({ apiKey });

  const result = await streamText({
    model: openai('gpt-4o-mini'),
    // 这里是智能体的灵魂：设定它只能像给5岁小孩讲故事一样解释问题
    system: '你是一个"ELI5"专家（Explain Like I am 5）。无论用户问什么高深的概念，你都要用最简单的比喻、只有5岁小孩能听懂的语言来解释。不要使用专业术语。',
    messages,
  });

  return result.toTextStreamResponse();
}
