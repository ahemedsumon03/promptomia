import { connectDb } from '@utils/database.js'
import Prompt from '@models/prompt';

export const POST = async (request) => {
    const { prompt, userID,tag } = await request.json()

    try {

        await connectDb();
        const newPrompt = new Prompt({
            creator: userID,
            prompt,
            tag
        })

        await newPrompt.save()
        return new Response(JSON.stringify(newPrompt), {status: 201})

    } catch (error) {
        return new Response('Failed to Create new Prompt', { status: 500 })
    }
}