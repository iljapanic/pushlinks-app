'use client'

import { useEffect, useState } from 'react'

import { Database } from '@/types/supabase'
// import supabase from '@/lib/supabase'
import { useSupabase } from '@/app/supabase-provider'

type Link = Database['public']['Tables']['links']['Row']

export default function RealtimeLinks({
  serverLinks,
}: {
  serverLinks: Link[]
}) {
  const [links, setLinks] = useState<Link[]>(serverLinks)

  const { supabase } = useSupabase()

  useEffect(() => {
    setLinks(serverLinks)
  }, [serverLinks])

  useEffect(() => {
    const channel = supabase
      .channel('real-time links')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'links',
        },
        (payload) => {
          setLinks([...links, payload.new as Link])
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, links, setLinks])

  return (
    <div>
      <pre>{JSON.stringify(links, null, 2)}</pre>
    </div>
  )
}
