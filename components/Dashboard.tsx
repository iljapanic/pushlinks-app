import { useState, useEffect, useCallback } from 'react'
import { User } from '@supabase/supabase-js'
import Image from 'next/image'

import supabase from '@/lib/supabase'
import Layout from '@/components/Layout'

interface Link {
  id: number
  url: string
  user_id: string
  date_added: string
  archived: boolean
  date_archived: string | null
}

interface DashboardProps {
  user: User
}

const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  const [links, setLinks] = useState<Link[]>([])

  const fetchLinks = useCallback(async () => {
    const { data, error } = await supabase
      .from('links')
      .select('id, url, user_id, date_added, archived, date_archived')
      .eq('user_id', user.id)
      .eq('archived', false)
      .order('date_added', { ascending: true })
    if (!error && data) {
      setLinks(data)
    }
  }, [user.id])

  useEffect(() => {
    fetchLinks()
  }, [fetchLinks])

  const openLink = async (id: number, url: string) => {
    window.open(url, '_blank')
    const { error } = await supabase
      .from('links')
      .update({ archived: true })
      .eq('id', id)
    if (!error) {
      fetchLinks()
    }
  }

  return (
    <div>
      {links.map((link) => (
        <div key={link.id}>
          <Image
            src={`https://www.google.com/s2/favicons?domain=${link.url}`}
            alt="favicon"
            width={16}
            height={16}
          />
          <a onClick={() => openLink(link.id, link.url)}>{link.url}</a>
        </div>
      ))}
    </div>
  )
}

export default Dashboard
