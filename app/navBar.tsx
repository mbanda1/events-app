'use client'
import Link from 'next/link'
import React from 'react'
import { FaClock } from "react-icons/fa6";
import classNames from 'classnames';
import { usePathname } from 'next/navigation'

const NavBar = () => {
  const pathname = usePathname()

  return (
    <div>
        <nav className='flex space-x-6 border-b mb-5 px-5 h-13 items-center'>
            <Link href='/'> <FaClock/> </Link>
            <ul className='flex space-x-6'>
                <Link href={'/'} 
                className={classNames({
                  'text-zinc-400': pathname !== '/',
                  'text-zinc-800': pathname === '/',
                  'hover:text-zinc-700 transition-colors': true
                })}
                >Dashboard</Link>
                <Link href={'/events'} 
                   className={classNames({
                    'text-zinc-400': pathname !== '/events',
                    'text-zinc-800': pathname === '/events',
                    'hover:text-zinc-700 transition-colors': true
                  })}
                >Events</Link>
            </ul>
        </nav>
    </div>
  )
}

export default NavBar