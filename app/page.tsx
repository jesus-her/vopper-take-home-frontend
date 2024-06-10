import PokemonList from '../components/pokemon-list'
import PokedexHeader from '@/components/pokedex-header'

interface RootPageProps {
  searchParams: {
    limit: number
    page: number
    search?: string
  }
}
export default async function Home ({ searchParams }: RootPageProps) {
  return (
    <main className='flex min-h-screen flex-col items-center gap-4 py-28 px-4 max-w-7xl mx-auto'>
      <PokedexHeader />
      <PokemonList searchParams={searchParams} />
    </main>
  )
}
