import * as React from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { auth } from '@/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  IconGitHub,
  IconNextChat,
  IconSeparator,
  IconVercel
} from '@/components/ui/icons'
import { UserMenu } from '@/components/user-menu'
import { SidebarMobile } from './sidebar-mobile'
import { SidebarToggle } from './sidebar-toggle'
import { ChatHistory } from './chat-history'
import { Session } from '@/lib/types'
import { ThemeToggle } from './theme-toggle'
import Image from 'next/image'

async function UserOrLogin() {
  const session = (await auth()) as Session

  return (
    <>
      {session?.user ? (
        <>
          <SidebarMobile>
            <ChatHistory userId={session.user.id} />
          </SidebarMobile>
          <SidebarToggle />
        </>
      ) : (
        <Link href="/" rel="nofollow" className="flex gap-2">
          <Image src={`/header-logo.png`} alt="logo" width={32} height={32} />
          <h2 className="text-xl">Antelope</h2>
        </Link>
      )}
      {/* <div className="flex items-center">
        <IconSeparator className="size-6 text-muted-foreground/50" />
        {session?.user ? (
          <UserMenu user={session.user} />
        ) : (
          <Button variant="link" asChild className="-ml-2">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div> */}
    </>
  )
}

export function Header() {
  return (
    <header className="flex items-center justify-between w-full h-[153px] px-12 py-20">
      <div className="flex items-center">
        <React.Suspense fallback={<div className="flex-1 overflow-auto" />}>
          <UserOrLogin />
        </React.Suspense>
      </div>
      <div className="flex items-center justify-end space-x-2 gap-4">
        <Link href={'/'}>Home</Link>
        <Link href={'/'}>Benefits</Link>
        <Link href={'/'}>Process</Link>
        <Link href={'/'}>About Us</Link>
        <Link href={'/'}>Pricing</Link>
        <Link href={'/'}>FAG</Link>
      </div>
      <div>
        <ThemeToggle />
        <Button variant="default">Get in touch</Button>
      </div>
    </header>
  )
}
