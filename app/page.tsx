'use server'

import LimitSelector from '@/components/limit-selector'
import PokemonList from '../components/pokemon-list'
import Pagination from '../components/pokemon-list-pagination'
import SearchBar from '../components/search-bar'
import { fetchPokemons, FetchPokemonsParams } from './actions/pokemon.actions'
interface RootPageProps {
  searchParams: {
    limit: number
    page: number
    search?: string
  }
}
export default async function Home ({ searchParams }: RootPageProps) {
  // const limit = parseInt(searchParams.get('limit') || '10')
  // const page = parseInt(searchParams.get('page') || '1')
  // const search = searchParams.get('search') || ''

  // const params: FetchPokemonsParams = { limit, page, search }s

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <h1>Pokedex</h1>
      <div className='flex items-center gap-3'>
        <SearchBar />
        <LimitSelector />
      </div>
      <PokemonList searchParams={searchParams} />

      {/* <Pagination count={data.count} limit={limit} page={page} /> */}
    </main>
  )
}
