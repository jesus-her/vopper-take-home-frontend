'use client'
import { type Key, useState } from 'react'

import useSWR from 'swr'
import PokemonListPagination from './pokemon-list-pagination'
import { generatePokemonPDF } from '@/app/actions/pokemon.actions'
import { Button } from './ui/button'

// Define a type for the fetcher function's arguments.
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
  const url: string = `http://localhost:8080/api/pokemons?limit=${
    searchParams.limit
  }&page=${searchParams.page}&search=${searchParams.search ?? ''}`

  const {
    data: pokemons,
    isLoading,
    error
  } = useSWR(url, fetcher, {
    keepPreviousData: true
  })
  const pages = pokemons?.count
    ? Math.ceil(pokemons.count / searchParams.limit)
    : 0

  const handleGeneratePDF = async (name: string) => {
    try {
      const pdf = await generatePokemonPDF(name)
      const url = URL.createObjectURL(pdf)
      const link = document.createElement('a')
      link.href = url
      link.download = `${name}.pdf`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error generating PDF:', error)
    }
  }

  // // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  // const pages = products?.count
  //   ? Math.ceil(products.count / resultsPeerPage)
  //   : 0

  // if (products?.results?.length === 0 && categories.length === 0) {
  //   return (
  //     <EmptyState
  //       title='Tienda sin productos'
  //       subtitle='Este negocio aún no ha configurado sus productos y categorías. Vuelve pronto para ver su menú completo.'
  //       storeId={store.id}
  //       showResetButton={false}
  //     />
  //   )
  // }

  // if (products?.results?.length === 0) {
  //   return <EmptyState storeId={store.id} />
  // }

  return (
    <section className='flex flex-col gap-10'>
      {isLoading ? (
        <h1>loading...</h1>
      ) : (
        <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
          {pokemons?.results?.map((pokemon: any) => (
            <div key={pokemon.url} className='border px-4 rounded-lg py-2'>
              <h1>{pokemon.name}</h1>
              <Button onClick={() => handleGeneratePDF(pokemon.name)}>
                Generate PDF
              </Button>
            </div>
          ))}
        </section>
      )}

      <section className='flex flex-col flex-1 w-full justify-center items-center  z-10'>
        {pages > 0 && (
          <PokemonListPagination
            count={pokemons?.count}
            limit={searchParams.limit}
          />
        )}
      </section>
    </section>
  )
}
