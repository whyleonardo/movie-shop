import { MovieCard } from '@components/Cards/MovieCard'
import { MovieGrid } from '@components/layout/MovieGrid'
import { MovieProps } from 'src/types/MovieTypes'
import { Paginator } from '@components/Buttons/Paginator/'
import { api } from '@data/api'
import { useState } from 'react'


export const Favorites = () => {
  const [page, setPage] = useState(1)

  return (
    // <>
    //   <Paginator setPage={setPage} currentPage={page} />

    //   <MovieGrid>
    //     {data && data.results.map((movie: MovieProps) => (
    //       <MovieCard key={movie.id} movie={movie} />
    //     ))}
    //   </MovieGrid>
    // </>
    <p>Favorites</p>
  )
}
