import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Image from 'next/image'
import logo from '@/public/stadium.jpg'
import Navbar from './components/Nav/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Freekick',
  description: 'Freekick is a football app that provide for you todays matches and football news around the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className='relative bg-black'>
            <div className=' fixed top-0 left-0 w-full h-full'>
              <Image
                src={logo}
                alt='backgroundImage'
                className='h-screen w-full object-cover'
              />
            </div>
        </div>
        <div className=' fixed top-0 left-0 w-full h-screen bg-gradient-to-b
                            from-black/10 to-black'/>
        <div className='relative'>
          <Navbar/>
          {children}
        </div> 
      </body>
    </html>
  )
}
