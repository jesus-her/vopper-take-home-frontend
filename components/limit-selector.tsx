'use client'
import React from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import { Label } from './ui/label'

const LimitSelector: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const limit = searchParams.get('limit') ?? 10

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value)
    const params = qs.parse(searchParams.toString())
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...params,
          limit: newLimit,
          page: 1 // Reset to page 1 on limit change
        }
      },
      { skipNull: true, skipEmptyString: true }
    )
    router.push(url, { scroll: false })
  }

  return (
    <div className='flex flex-col'>
      <Label
        className=' hidden md:block capitalize font-medium'
        htmlFor='limit-selector'
      >
        Results per page:
      </Label>
      <select
        id='limit-selector'
        value={limit}
        onChange={handleLimitChange}
        className='p-2 border rounded-md'
      >
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </select>
    </div>
  )
}

export default LimitSelector
