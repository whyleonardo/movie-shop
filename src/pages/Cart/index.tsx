import { Grid, Select, Stack, Text, VStack } from '@chakra-ui/react'
import { RefObject, useState } from 'react'
import { MovieCard } from '@components/Cards/MovieCard'
import { MovieProps } from 'src/types/MovieTypes'
import { motion } from 'framer-motion'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useCart } from '@context/Cart'

export const Cart = () => {
  const { moviesCart } = useCart()
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
    <Stack alignItems='normal' gap='1.5rem'>
      <VStack alignSelf='end' alignItems='start'>
        <Text fontWeight='bold'>SortBy:</Text>

        <Select w='10rem' defaultValue={'DEFAULT'} onChange={(e) => setSortState(e.target.value)}>
          <option value='DEFAULT' disabled>
            None
          </option>
          <option value='ascending'>Ascending</option>
          <option value='descending'>Descending</option>
        </Select>
      </VStack>

      <Grid
        templateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(4, 1fr)' }}
        columnGap={{ base: '4', md: '6' }}
        rowGap={{ base: '8', md: '10' }}
        ref={parent as RefObject<HTMLDivElement>}
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        display={!moviesCart.length ? 'flex' : 'grid'}
        justifyContent='center'
        h={!moviesCart.length ? '55vh' : 'none'}
      >
        {/* @ts-ignore */}
        {moviesCart.sort(sortMethods[sortState].method).map((movie: MovieProps) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {!moviesCart.length && <Text alignSelf='center'>You not added any movie here! ☹️</Text>}
      </Grid>
    </Stack>
  )
}
