import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { headers, cookies } from 'next/headers'
import { notFound } from 'next/navigation'

// import {useSupabase} from './supabase-provider'
import RealtimeLinks from './links/realtime-links'
import { Database } from '@/types/supabase'

export const revalidate = 0

async function getData() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  })

  const { data } = await supabase.from('links').select()

  return data
}

export default async function Home() {
  const links = await getData()

  if (!links) {
    return notFound()
  }

  return (
    <div>
      <h1>Links</h1>
      <RealtimeLinks serverLinks={links ?? []} />
    </div>
  )
}
