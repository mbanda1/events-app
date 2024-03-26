'use client'
import { Box } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaClock } from "react-icons/fa6";

const NavBar = () => {
  const pathname = usePathname()
  const { status, data: session } = useSession()

  return (
    <div>
      <nav className='flex space-x-6 border-b mb-5 px-5 h-13 items-center'>
        <Link href='/'> <FaClock /> </Link>
        <ul className='flex space-x-6'>
          <li>
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
          </li>
        </ul>
        <Box>
          {
            status === 'authenticated' && (
              <Link href={'api/auth/signout'}>Log out</Link>
            )
          }
               {
            status === 'unauthenticated' && (
              <Link href={'api/auth/signin'}>Login</Link>
            )
          }
        </Box>
      </nav>
    </div>
  )
}

export default NavBar