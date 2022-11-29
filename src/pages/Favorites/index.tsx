import { MovieCard } from '@components/Cards/MovieCard'
import { MovieGrid } from '@components/layout/MovieGrid'
import { MovieProps } from 'src/types/movieTypes'
import { Paginator } from '@components/Buttons/Paginator/'
import { useState } from 'react'

const api = {
  url: import.meta.env.VITE_URL_UPCOMING_MOVIES,
  key: import.meta.env.VITE_API_KEY_V3
}

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
