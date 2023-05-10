import { connectDb } from '@utils/database.js'
import Prompt from '@models/prompt'

export const GET = async (request, { params }) => {
    try {

        await connectDb()

        const prompt = await Prompt.findById(params.id).populate('creator')

        if (!prompt) return new Response('prompt not found', { status: 404 })
        

        return new Response(JSON.stringify(prompt), { status: 200 })

    } catch (error) {
        console.log(error)
        return new Response('Internal server error', { status: 500 })
    }
}

export const PATCH = async (request, { params }) => { 
    const { prompt, tag } = await request.json()

    try {

        await connectDb()
        const existsprompt = await Prompt.findById(params.id);
        if (!existsprompt) { 
            return new Response('prompt not found', {status:404})
        }

        existsprompt.prompt = prompt
        existsprompt.tag = tag

        await existsprompt.save()
        return new Response("Successfully updated the Prompts", { status: 200 });
        
    } catch (error) {
        console.log(error)
        return new Response('Internal server error', { status: 500 })
    }
}

export const DELETE = async (request, { params }) => { 
    try {

        await connectDb()
        await Prompt.findByIdAndRemove(params.id)
        return new Response("Prompt deleted successfully", { status: 200 });
        
    } catch (error) {
        console.log(error)
        return new Response('Server side problem', {status:500})
    }
}