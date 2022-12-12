import { Grid, HStack, Select, Stack, Text } from '@chakra-ui/react'
import { RefObject, useState } from 'react'
import { MovieCard } from '@components/Cards/MovieCard'
import { MovieProps } from 'src/types/MovieTypes'
import { getAuth } from 'firebase/auth'
import { motion } from 'framer-motion'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useFavorites } from '@context/Favorites'

export const Favorites = () => {
  const { currentUser } = getAuth()
  const { favoriteMoviesInUserDB } = useFavorites()
  const [parent] = useAutoAnimate()

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
        display={!favoriteMoviesInUserDB?.length ? 'flex' : 'grid'}
        justifyContent='center'
        h={!favoriteMoviesInUserDB?.length ? '55vh' : 'none'}
      >
        {favoriteMoviesInUserDB?.sort(sortMethods[sortState].method).map((movie: MovieProps) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {!currentUser ? (
          <Text fontWeight='bold' alignSelf='center'>
            Sign In to see your favorite movies!
          </Text>
        ) : (
          !favoriteMoviesInUserDB?.length && (
            <Text fontWeight='bold' alignSelf='center'>
              You not added any movie here! ☹️
            </Text>
          )
        )}
      </Grid>
    </Stack>
  )
}
