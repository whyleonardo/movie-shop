import { Divider, Heading, Stack, Text, VStack } from '@chakra-ui/react'
import { MovieCardCart } from '@components/Cards/MovieCardCart'
import { MovieProps } from 'src/types/MovieTypes'
import { RefObject } from 'react'
import { cartCurrecyStyleFormat } from '@utils/currencyStyleFormat'
import { motion } from 'framer-motion'
import { useAutoAnimate } from '@formkit/auto-animate/react'
import { useCart } from '@context/Cart'

export const Cart = () => {
  const { moviesCart } = useCart()
  const [parent] = useAutoAnimate()

  return (
    <VStack
      ref={parent as RefObject<HTMLDivElement>}
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      alignItems='start'
      h={!moviesCart.length ? '70vh' : 'none'}
      gap='1rem'
      justifyContent={!moviesCart.length ? 'center' : 'none'}
      px={{ md: '5rem' }}
    >
      {moviesCart.length && <Heading>Items</Heading>}

      {moviesCart.map((movie: MovieProps) => (
        <MovieCardCart key={movie.id} movie={movie}>
          <Divider />
        </MovieCardCart>
      ))}

      {!moviesCart.length && (
        <Text fontWeight='bold' alignSelf='center'>
          You not added any movie here! ☹️
        </Text>
      )}

      <Stack
        display={moviesCart.length ? 'flex' : 'none'}
        pb='1rem'
        flexDirection='row'
        w='full'
        justifyContent='space-between'
        alignItems='center'
        fontSize='2rem'
      >
        <Text fontWeight='bold'>Total:</Text>

        {moviesCart.length && (
          <Text fontWeight='bold' alignSelf='center'>
            {cartCurrecyStyleFormat(moviesCart.length * 9.99)}
          </Text>
        )}
      </Stack>
    </VStack>
  )
}
