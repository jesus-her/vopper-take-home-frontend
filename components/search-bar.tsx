'use client'
import React, { useState, useEffect } from 'react'
import qs from 'query-string'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Search } from 'lucide-react'
import { Input } from './ui/input'
import { Button } from './ui/button'

const SearchBar: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()

  const searchParams = useSearchParams()
  const [input, setInput] = useState('')

  useEffect(() => {
    const searchQuery = searchParams.get('search') || ''
    setInput(searchQuery)
  }, [searchParams])

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const params = qs.parse(searchParams.toString())
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...params,
          search: input || undefined,
          page: 1
        }
      },
      { skipNull: true, skipEmptyString: true }
    )
    router.push(url, { scroll: false })
  }
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className='ml-auto flex-1 sm:flex-initial flex gap-2'
      >
        <div className='relative'>
          <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground' />

          <Input
            type='text'
            value={input}
            onChange={handleInputChange}
            placeholder='Search Pokémon'
            className='pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]'
          />
        </div>
        <Button type='submit'>Search</Button>
      </form>
    </div>
  )
}

export default SearchBar
