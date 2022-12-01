import { Grid, HStack, Select, Stack, Text } from '@chakra-ui/react'
import { RefObject, useState } from 'react'
import { MovieCard } from '@components/Cards/MovieCard'
import { MovieProps } from 'src/types/MovieTypes'
import { motion } from 'framer-motion'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useFavorites } from '@context/Favorites'

export const Favorites = () => {
  const { favoriteMovies } = useFavorites()
  const [parent] = useAutoAnimate()
  const [page, setPage] = useState(1)

  const [sortState, setSortState] = useState('none')

  const sortListAscending = (x: MovieProps, y: MovieProps) => {
    const a = x.title
    const b = y.title

    return a == b ? 0 : a > b ? 1 : -1
  }

  const sortListDescending = (x: MovieProps, y: MovieProps) => {
    const a = x.title
    const b = y.title

    return a == b ? 0 : a > b ? -1 : 1
  }

  const sortMethods = {
    none: { method: (x: MovieProps, y: MovieProps) => null },
    ascending: { method: sortListAscending },
    descending: { method: sortListDescending },
  }

  return (
    <Stack alignItems='normal' gap='0.5rem'>
      <HStack alignSelf='end' alignItems='center'>
        <Text fontWeight='bold'>SortBy:</Text>

        <Select w='10rem' defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
          <option value='DEFAULT' disabled>
            None
          </option>
          <option value='ascending'>Ascending</option>
          <option value='descending'>Descending</option>
        </Select>
      </HStack>

      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
        columnGap={{ base: '4', md: '6' }}
        rowGap={{ base: '8', md: '10' }}
        ref={parent as RefObject<HTMLDivElement>}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        display={!favoriteMovies.length ? 'flex' : 'grid'}
        justifyContent='center'
        h={!favoriteMovies.length ? '55vh' : 'none'}
      >
        {favoriteMovies.sort(sortMethods[sortState].method).map((movie: MovieProps) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {!favoriteMovies.length && (
          <Text fontWeight='bold' alignSelf='center'>
            You not added any movie here! ☹️
          </Text>
        )}
      </Grid>
    </Stack>
  )
}
