import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.NEXT_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: NextApiRequest) {

  //@ts-ignore
  const body  = await req.json()
  
  const prompt = body.prompt;

  if (!prompt) {
    return new Error('There was an error with you text, try again!');
  }

  const chatResponse = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt,
    max_tokens: 2048,
    temperature: 0.8,
  });

  const response =
    chatResponse.data.choices[0].text?.trim() || "I'm offline, try again later";

  return NextResponse.json({
    text: response,
  });
}
