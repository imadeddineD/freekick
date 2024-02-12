
import Link from 'next/link'
import React from 'react'
import logo from '@/public/freekick.png'
import Image from 'next/image'
import Searchbar from './Searchbar'
import { Team } from '@/types'
import getTeams from '@/app/getData/getTeams'

const Navbar = async () => {

    const teams : Team[] = await getTeams()
    // console.log('this is all teams : ' , teams)
  return (
    <div className='fixed top-0 right-0 w-full flex justify-center items-center p-3 bg-black/95 z-50'>
        <div className="w-1/6 flex justify-center items-center">
            <Link href={'/'} className="flex justify-center items-center">
                <Image 
                src={logo}
                alt='logo'
                width={35}
                height={35}
                />
                <div className="px-2 font-extrabold text-[23px] md:block hidden text-blue-800/80">
                    Freekick
                </div>
            </Link>
        </div>
        <div className="w-4/6 flex justify-center items-center">
            <Searchbar teams={teams} />
        </div>
        <div className="w-1/6 md:block hidden">
            <div className="w-fit px-3 py-1 bg-blue-800 text-zinc-300 font-bold text-center rounded-md ">Contact</div>
        </div>
    </div>
  )
}

export default Navbar