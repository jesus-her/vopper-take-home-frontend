export interface FetchPokemonsParams {
  limit: number
  page: number
  search?: string
}

export interface Pokemon {
  name: string
  url: string
}

export interface FetchPokemonsResponse {
  count: number
  results: Pokemon[]
}

export async function fetchPokemons (
  params: FetchPokemonsParams
): Promise<FetchPokemonsResponse> {
  const { limit, page, search } = params
  const url = new URL(`${process.env.BASE_URL}/pokemons`)
  url.searchParams.append('limit', limit.toString())
  url.searchParams.append('page', page.toString())
  if (search) {
    url.searchParams.append('search', search)
  }

  const response = await fetch(url.toString())
  if (!response.ok) {
    throw new Error('Error fetching Pokémon data')
  }

  return response.json()
}

export async function generatePokemonPDF (name: string): Promise<Blob> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/pokemons/${name}/pdf`,
    {
      method: 'GET'
    }
  )
  if (!response.ok) {
    throw new Error('Error generating PDF')
  }
  return response.blob()
}

export const handleGeneratePDF = async (name: string) => {
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
