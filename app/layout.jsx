import '@styles/global.css'
import React from 'react'
import Nav from '@components/Nav.jsx'
import Provider from '@components/Provider'

export const metadata = {
    title: "Promitia",
    description: "Discover share ai proamt"
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>
                    <main className='app'>
                        <Nav />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout