'use client'
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink
} from '@/components/ui/navigation-menu'
import { JSX, SVGProps } from 'react'
import { usePathname } from 'next/navigation'

export default function Navbar () {
  const pathname = usePathname()
  return (
    <header className='flex h-20 w-full shrink-0 items-center px-4 md:px-6 fixed top-0 bg-white/50 backdrop-blur-lg z-50 border-b'>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant='outline' size='icon' className='lg:hidden'>
            <MenuIcon className='h-6 w-6' />
            <span className='sr-only'>Toggle navigation menu</span>
          </Button>
        </SheetTrigger>

        <SheetContent side='left'>
          <SheetClose asChild>
            <Link href='/' prefetch={false}>
              <MountainIcon className='h-6 w-6' />
              <span className='sr-only'>Company Logo</span>
            </Link>
          </SheetClose>
          <div className='grid gap-2 py-6'>
            <SheetClose asChild>
              <Link
                href='/'
                className='flex w-full items-center py-2 text-lg font-semibold'
                prefetch={false}
              >
                Home
              </Link>
            </SheetClose>
            <SheetClose asChild>
              <Link
                href='/trainers'
                className='flex w-full items-center py-2 text-lg font-semibold'
                prefetch={false}
              >
                Trainers
              </Link>
            </SheetClose>
          </div>
        </SheetContent>
      </Sheet>

      <Link href='/' className='mr-6 hidden lg:flex' prefetch={false}>
        <MountainIcon className='h-6 w-6' />
        <span className='sr-only'>Company Logo</span>
      </Link>
      <NavigationMenu className='hidden lg:flex'>
        <NavigationMenuList>
          <NavigationMenuLink active={pathname === '/'} asChild>
            <Link
              href='/'
              className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-muted data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-mute dark:data-[state=open]:bg-gray-800/50'
              prefetch={false}
            >
              Home
            </Link>
          </NavigationMenuLink>
          <NavigationMenuLink asChild>
            <Link
              href='/trainers'
              className='group inline-flex h-9 w-max items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-mute data-[state=open]:bg-gray-100/50 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus:bg-gray-800 dark:focus:text-gray-50 dark:data-[active]:bg-mute dark:data-[state=open]:bg-gray-800/50'
              prefetch={false}
            >
              Trainers
            </Link>
          </NavigationMenuLink>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  )
}

function MenuIcon (props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='4' x2='20' y1='12' y2='12' />
      <line x1='4' x2='20' y1='6' y2='6' />
      <line x1='4' x2='20' y1='18' y2='18' />
    </svg>
  )
}

function MountainIcon (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='m8 3 4 8 5-5 5 15H2L8 3z' />
    </svg>
  )
}
