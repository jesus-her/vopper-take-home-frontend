'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import qs from 'query-string'

const LimitSelector: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    const limitParam = parseInt(searchParams.get('limit') || '10')
    setLimit(limitParam)
  }, [searchParams])

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLimit = parseInt(e.target.value)
    setLimit(newLimit)
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
    <div>
      <label htmlFor='limit-selector' className='mr-2'>
        Results per page:
      </label>
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
