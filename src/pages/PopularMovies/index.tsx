import { MovieCard } from '@components/Cards/MovieCard'
import { MovieGrid } from '@components/layout/MovieGrid'
import { MovieProps } from 'src/types/movieTypes'
import { Paginator } from '@components/Buttons/Paginator/'
import useAxios from 'axios-hooks'
import { useState } from 'react'



const api = {
  url: import.meta.env.VITE_URL_POPULAR_MOVIES,
  key: import.meta.env.VITE_API_KEY_V3
}

export const PopularMovies = () => {
  const [page, setPage] = useState(1)

  const query = `${api.url}api_key=${api.key}&language=en-US`
  const [{ data, loading, error }, refetch] = useAxios({
    url: query,
    params: { page }
  })

  return (
    <>
      <Paginator setPage={setPage} currentPage={page} />

      <MovieGrid>
        {data && data.results.map((movie: MovieProps) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </MovieGrid>
    </>
  )
}
