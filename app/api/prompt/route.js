import { connectDb } from '@utils/database.js'
import Prompt from '@models/prompt'

export const GET = async (request) => { 
    try {
        
        await connectDb()

        const prompts = await Prompt.find({}).populate('creator')

        return new Response(JSON.stringify(prompts), {status:200})

    } catch (error) {
        return new Response('prompts not found', { status: 500 })
    }
}