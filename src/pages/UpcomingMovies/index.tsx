import { Flex, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MovieCard } from '@components/Cards/MovieCard'
import { MovieGrid } from '@components/layout/MovieGrid'
import { MovieProps } from 'src/types/movieTypes'
import { Paginator } from '@components/Buttons/Paginator/'
import { api } from '@data/api'
import useAxios from 'axios-hooks'
import { useMovies } from '@context/Movies'

export const UpcomingMovies = () => {
  const [page, setPage] = useState(1)
  const { setUpcomingMovies } = useMovies()

  const query = `${api.upcoming}api_key=${api.key}&language=en-US`
  const [{ data, loading }] = useAxios({
    url: query,
    params: { page }
  })

  useEffect(() => {
    setUpcomingMovies(data?.results)
  }, [data])

  return (
    <>
      {!loading
        ? <>
          <MovieGrid>
            {data && data.results.map((movie: MovieProps) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </MovieGrid>

          <Paginator setPage={setPage} currentPage={page} />
        </>

        : <Flex w='full' h='lg' justifyContent='center' alignItems='center'>
          <Spinner />
        </Flex>
      }
    </>
  )
}
