import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { JSX, SVGProps } from 'react'
import { handleGeneratePDF } from '@/app/actions/pokemon.actions'
import Image from 'next/image'
import pokeball from '@/public/pokeball-min.png'
import Avvvatars from 'avvvatars-react'

export default function PokemonCard ({
  pokemon
}: {
  pokemon: { name: string; url: string }
}) {
  return (
    <Card className='w-full max-w-sm p-6 flex flex-col items-center justify-between gap-6'>
      <div className=' flex flex-col gap-1 w-full '>
        <div className='relative border w-full h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center overflow-hidden'>
          <Image src={pokeball} alt='Pokeball' className='w-28 h-28 z-10' />
          {/* Filter */}
          <div className='filter-blur'>
            <Avvvatars
              value={`${pokemon.url}${pokemon.name}`}
              style='shape'
              size={70}
            />
          </div>
        </div>
        <h3 className='text-xl md:text-2xl text-center font-bold capitalize'>
          {pokemon.name}
        </h3>
      </div>
      <Button
        onClick={() => {
          handleGeneratePDF(pokemon.name)
        }}
      >
        Download PDF
        <DownloadIcon className='ml-2 h-4 w-4' />
      </Button>
    </Card>
  )
}

function DownloadIcon (
  props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
      <polyline points='7 10 12 15 17 10' />
      <line x1='12' x2='12' y1='15' y2='3' />
    </svg>
  )
}
