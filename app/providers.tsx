'use client'

import { type ReactNode } from 'react'
import { SWRConfig } from 'swr'

export function Providers ({ children }: { children: ReactNode }) {
  type FetcherArgs = [input: RequestInfo, init?: RequestInit]
  const fetcher = async (...args: FetcherArgs) =>
    await fetch(...args).then(async res => await res.json())
  return <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
}
