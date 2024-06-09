'use client'

import { useEffect, type ReactNode } from 'react'
import { SWRConfig, mutate } from 'swr'

export function Providers ({ children }: { children: ReactNode }) {
  type FetcherArgs = [input: RequestInfo, init?: RequestInit]
  const fetcher = async (...args: FetcherArgs) =>
    await fetch(...args).then(async res => await res.json())
  return (
    <SWRConfig value={{ fetcher, use: [trackLiveQueries] }}>
      {children}
    </SWRConfig>
  )
}
const liveQueries: any = new Set()

function trackLiveQueries (useSWRNext: any) {
  return (key: any, fetcher: any, config: any) => {
    const swr = useSWRNext(key, fetcher, config)
    useEffect(() => {
      liveQueries.add(key)

      return () => {
        liveQueries.delete(key)
      }
    }, [key])

    return swr
  }
}

export async function revalidateLiveQueries () {
  const promises = [...liveQueries.values()].map(async key => await mutate(key))

  return await Promise.all(promises)
}
