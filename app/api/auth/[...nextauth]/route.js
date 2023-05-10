import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import { connectDb } from '@utils/database.js'
import User from '@models/user.js'

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session }) { 
            const sessionUser = await User.findOne({
                email: session.user.email
            })


            session.user.id = sessionUser._id.toString()
            return session
        },
        async signIn({ profile }) {
            try {
                await connectDb()

                // if user already exists
                const userExits = await User.findOne({
                    email: profile.email
                })

                // if user not exists

                if (!userExits) { 
                    await User.create({
                        email: profile.email,
                        username: profile.name.replace(" ", "").toLowerCase(),
                        image: profile.picture
                    })
                }

                return true
            } catch (error) {
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST }