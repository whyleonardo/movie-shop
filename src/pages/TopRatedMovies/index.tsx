import { Flex, Spinner } from '@chakra-ui/react'
import { MovieCard } from '@components/Cards/MovieCard'
import { MovieGrid } from '@components/layout/MovieGrid'
import { MovieProps } from 'src/types/movieTypes'
import { Paginator } from '@components/Buttons/Paginator/'
import useAxios from 'axios-hooks'
import { useState } from 'react'

const api = {
  url: import.meta.env.VITE_URL_TOPRATED_MOVIES,
  key: import.meta.env.VITE_API_KEY_V3
}



export const TopRatedMovies = () => {
  const [page, setPage] = useState(1)

  const query = `${api.url}api_key=${api.key}&language=en-US`

  const [{ data, loading }] = useAxios({
    url: query,
    params: { page }
  })

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



