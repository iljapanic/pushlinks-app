import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { GetServerSidePropsContext } from 'next'
import { Auth } from '@supabase/auth-ui-react'
import {
  useUser,
  useSession,
  useSupabaseClient,
  Session,
} from '@supabase/auth-helpers-react'

import { Database } from '@/types/supabase'
type Link = Database['public']['Tables']['links']['Row']

import supabaseClient from '@/lib/supabase'
import Layout from '@/components/Layout'
import Account from '@/components/Account'

interface HomeProps {
  links: Link[]
}

export default function Home({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>()
  const user = useUser()

  const [loading, setLoading] = useState(false)
  const [links, setLinks] = useState<Link[]>([])
  const [link, setLink] = useState<Link['url']>(null)

  // const user = useUser()
  // const session = useSession()
  // const supabase = useSupabaseClient()

  // console.log(links)

  useEffect(() => {
    getLinks()
  }, [session])

  async function getLinks() {
    try {
      setLoading(true)
      if (!user) throw new Error('No user')

      let { data, error, status } = await supabase
        .from('links')
        .select()
        .eq('user_id', user.id)

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setLinks(data)
        console.log(data)
      }
    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  async function addLink({ link }: { link: Link['url'] }) {
    try {
      setLoading(true)

      if (!user) throw new Error('No user')

      const newLink = {
        user_id: user.id,
        url: link,
      }

      let { error } = await supabase.from('links').insert(newLink).single()
      if (error) throw error
      alert('Link added!')
    } catch (error) {
      alert('Error adding the link!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="container">
        {!session ? (
          <div className="mx-auto max-w-xl">
            <Auth supabaseClient={supabase} />
          </div>
        ) : (
          <div>
            <div>
              <ul>
                {links.length > 0 ??
                  links.map((link) => <li key={link.id}>{link.url}</li>)}
              </ul>
            </div>

            <div>
              <label htmlFor="linkInput">Add link</label>
              <input
                id="linkInput"
                type="url"
                value={link || ''}
                onChange={(e) => setLink(e.target.value)}
              />
              <button
                className=""
                onClick={() => addLink({ link })}
                disabled={loading}
              >
                {loading ? 'Loading ...' : 'Update'}
              </button>
            </div>
            <div className="mt-64">
              <Account session={session} />
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

// export default Home

// export async function getServerSideProps(
//   context: GetServerSidePropsContext<{
//     providerID: string
//   }>,
// ) {
//   // Create authenticated Supabase Client
//   const supabase = createServerSupabaseClient(context)

//   // Check if we have a session
//   const {
//     data: { session },
//   } = await supabase.auth.getSession()

//   if (!session)
//     return {
//       props: {
//         initialSession: null,
//         user: null,
//         links: null,
//       },
//     }

//   let { data } = await supabase
//     .from('links')
//     .select()
//     .eq('user_id', session.user.id)

//   console.log(data)

//   return {
//     props: {
//       initialSession: session,
//       user: session.user,
//       links: data,
//     },
//   }
// }
