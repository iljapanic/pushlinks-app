import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import { headers, cookies } from 'next/headers'

import type { Database } from '@/types/supabase'

export const revalidate = 0

export async function GET(request: Request) {
  const supabase = createRouteHandlerSupabaseClient<Database>({
    headers,
    cookies,
  })
  const { data } = await supabase.from('links').select()
  return NextResponse.json(data)
}
