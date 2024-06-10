import SearchBar from './search-bar'
import LimitSelector from './limit-selector'

export default async function PokedexHeader () {
  return (
    <div className='flex flex-col md:flex-row md:items-end gap-3 justify-between w-full'>
      <h1 className=' text-3xl font-bold'>Pokedex</h1>
      <div className=' flex items-end gap-4'>
        <SearchBar />
        <LimitSelector />
      </div>
    </div>
  )
}
