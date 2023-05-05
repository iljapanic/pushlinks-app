'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

import { useSupabase } from './supabase-provider'
import { Button } from '@/components/ui/button'

export default function Header() {
  const { supabase } = useSupabase()
  // const [supabase] = useState(useSupabase())
  const router = useRouter()

  // useEffect(() => {
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange(() => {
  //     // refresh data
  //     router.refresh()
  //   })

  //   return () => {
  //     subscription.unsubscribe()
  //   }
  // }, [supabase, router])

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email: 'iljapanic@gmail.com',
      password: 'helloworld',
    })
  }

  const handleLogin = async () => {
    await supabase.auth.signInWithPassword({
      email: 'iljapanic@gmail.com',
      password: 'helloworld',
    })
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <header className="lg:flex lg:items-center lg:justify-between">
      <h1 className="font-medium text-indigo-700">Pushlinks</h1>
      <div className="flex gap-2">
        <Button size="sm" onClick={handleSignUp}>
          Sign Up
        </Button>
        <Button size="sm" onClick={handleLogin}>
          Login
        </Button>
        <Button size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  )
}
