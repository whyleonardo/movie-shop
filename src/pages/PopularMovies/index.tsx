
import * as React from 'react'
import { SimpleGrid, SimpleGridProps, Skeleton } from '@chakra-ui/react'
import { MovieCard } from '@components/Cards/MovieCard'
import { MovieProps } from 'src/types/movieTypes'
import useAxios from 'axios-hooks'

const api = {
  url: import.meta.env.VITE_URL_POPULAR_MOVIES,
  key: import.meta.env.VITE_API_KEY_V3
}

export const PopularMovies = () => {

  const query = `${api.url}api_key=${api.key}&language=en-US`
  const [{ data, loading, error }, refetch] = useAxios({
    url: query,
    // params: { page }
  })

  return (
    <ProductGrid >
      {data && data.results.map((movie: MovieProps) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </ProductGrid>
  )
}


export const ProductGrid = (props: SimpleGridProps) => {
  const columns = React.useMemo(() => {
    const count = React.Children.toArray(props.children).filter(React.isValidElement).length
    return {
      base: Math.min(1, count),
      md: Math.min(3, count),
      lg: Math.min(4, count),
      xl: Math.min(4, count),
    }
  }, [props.children])

  return (
    <SimpleGrid
      columns={columns}
      columnGap={{ base: '4', md: '6' }}
      rowGap={{ base: '8', md: '10' }}
      {...props}
      fallback={<Skeleton />}
    />
  )
}
