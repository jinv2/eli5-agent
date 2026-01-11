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
    system: '你是一个ELI5专家。用最简单、5岁小孩能听懂的话解释用户的提问。',
    messages,
  });

  return result.toDataStreamResponse();
}
