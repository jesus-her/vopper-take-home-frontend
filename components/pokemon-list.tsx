'use client'

import useSWR from 'swr'
import PokemonListPagination from './pokemon-list-pagination'

import PokemonCard from './pokemon-card'

type FetcherArgs = [input: RequestInfo, init?: RequestInit]

const fetcher = async (...args: FetcherArgs) =>
  await fetch(...args).then(async res => await res.json())

export default function PokemonList ({
  searchParams
}: {
  searchParams: {
    limit: number
    page: number
    search?: string
  }
}) {
  // Set default values for limit, page and search
  const limit = searchParams.limit ?? 10
  const page = searchParams.page ?? 1
  const search = searchParams.search ?? ''

  const url: string = `${process.env.NEXT_PUBLIC_BASE_URL}/pokemons?limit=${limit}&page=${page}&search=${search}`

  const {
    data: pokemons,
    isLoading,
    error
  } = useSWR(url, fetcher, {
    keepPreviousData: true
  })
  const pages = pokemons?.count ? Math.ceil(pokemons.count / limit) : 0

  return (
    <section className='flex flex-col gap-10'>
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {pokemons?.results?.map((pokemon: any) => (
            <PokemonCard pokemon={pokemon} />
          ))}
        </section>
      )}

      <section className='flex flex-col flex-1 w-full justify-center items-center  z-10'>
        {pages > 0 && <PokemonListPagination totalPages={pages} />}
      </section>
    </section>
  )
}
