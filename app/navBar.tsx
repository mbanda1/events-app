'use client'
import { Skeleton } from '@/app/components';
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaClock } from "react-icons/fa6";

const NavBar = () => {
  const pathname = usePathname()
  const { status, data: session } = useSession()

  const AuthStatus = () => {
    if (status === 'loading') return <Skeleton width={'3rem'} />
    if (status === 'authenticated') {
      return <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session.user?.image!}
            fallback='?' size={'2'}
            radius='full'
            className='cursor-pointer'
            referrerPolicy='no-referrer' />
        </DropdownMenu.Trigger>

        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size={'2'}>
              {session.user?.name}
            </Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href={'api/auth/signout'}>Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    }
  }

  return (
    <div>
      <nav className='border-b mb-5 px-5 py-3'>
        <Container>
          <Flex justify={'between'}>
            <Flex align={'center'} gap={'3'}>
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
                      'hover:text-zinc-700 transition-colors': true,
                      'pl-3': true,
                    })}
                  >Events</Link>
                </li>
              </ul>
            </Flex>
            <Box>
              {AuthStatus()}
              {
                status === 'unauthenticated' && (
                  <Link href={'api/auth/signin'}>Login</Link>
                )
              }
            </Box>
          </Flex>
        </Container>
      </nav>
    </div>
  )
}

export default NavBar