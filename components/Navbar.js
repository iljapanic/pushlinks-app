import Link from 'next/link'
import { useRouter } from 'next/router'
import { ExitIcon, PlusIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

export default function Navbar() {
  return (
    <header className="container mx-auto py-6">
      <div className="flex justify-between">
        {/* home */}
        <Link href="/">Pushlinks</Link>
      </div>
    </header>
  )
}

const NavLink = ({ href, children }) => {
  const router = useRouter()
  let isActive = router.pathname.startsWith(href)

  return (
    <li className="inline-flex items-center leading-none">
      <Link
        href={href}
        className={cn(
          'inline-flex items-center leading-none text-secondary no-underline',
          isActive && 'border-ocean-400 border-b-2 font-medium no-underline',
        )}
      >
        {children}
      </Link>
    </li>
  )
}
