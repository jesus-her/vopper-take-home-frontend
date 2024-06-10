import React from 'react'
import qs from 'query-string'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination'

interface PaginationProps {
  totalPages: number
}

const PokemonListPagination: React.FC<PaginationProps> = ({ totalPages }) => {
  const router = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()

  const currentPage = Number(params.get('page')) || 1
  const maxVisiblePages = 3 // Número fijo de elementos visibles en la paginación

  const handlePageChange = (newPage: number) => {
    const url = qs.stringifyUrl(
      {
        url: pathname,
        query: {
          ...Object.fromEntries(params.entries()), // Obtener los parámetros de consulta existentes
          page: newPage || 1
        }
      },
      { skipNull: true, skipEmptyString: true }
    )
    router.push(url, { scroll: false })
  }

  const renderPageNumbers = () => {
    const pages = []
    const delta = Math.floor(maxVisiblePages / 2)
    let startPage = Math.max(1, currentPage - delta)
    let endPage = Math.min(totalPages, currentPage + delta)

    if (currentPage <= delta) {
      endPage = maxVisiblePages
    }

    if (currentPage + delta >= totalPages) {
      startPage = totalPages - maxVisiblePages + 1
    }

    if (startPage < 1) {
      startPage = 1
    }

    if (endPage > totalPages) {
      endPage = totalPages
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink
            isActive={currentPage === i}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }

    if (startPage > 1) {
      pages.unshift(
        <PaginationItem key='start-ellipsis'>
          <PaginationEllipsis />
        </PaginationItem>
      )
      pages.unshift(
        <PaginationItem key={1}>
          <PaginationLink onClick={() => handlePageChange(1)}>1</PaginationLink>
        </PaginationItem>
      )
    }

    if (endPage < totalPages) {
      pages.push(
        <PaginationItem key='end-ellipsis'>
          <PaginationEllipsis />
        </PaginationItem>
      )
      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink onClick={() => handlePageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      )
    }

    return pages
  }

  return (
    <Pagination className='min-w-full max-w-full md:max-w-md mx-auto mt-4'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            isActive={currentPage !== 1}
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          />
        </PaginationItem>
        {renderPageNumbers()}
        <PaginationItem>
          <PaginationNext
            isActive={currentPage !== totalPages}
            onClick={() =>
              handlePageChange(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PokemonListPagination
