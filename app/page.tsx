'use server'

import LimitSelector from '@/components/limit-selector'
import PokemonList from '../components/pokemon-list'
import SearchBar from '../components/search-bar'

interface RootPageProps {
  searchParams: {
    limit: number
    page: number
    search?: string
  }
}
export default async function Home ({ searchParams }: RootPageProps) {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Pokedex</h1>
      <div className='flex items-center gap-3'>
        <SearchBar />
        <LimitSelector />
      </div>
      <PokemonList searchParams={searchParams} />
    </main>
  )
}
