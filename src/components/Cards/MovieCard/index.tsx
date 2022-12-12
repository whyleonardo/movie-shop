import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Link as LinkChakra,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import { FavouriteButton } from '@components/Buttons/FavouriteButton'
import { Link } from 'react-router-dom'
import { MovieProps } from 'src/types/MovieTypes'
import { PriceTag } from '@components/Brand/PriceTag'
import { Rating } from '@components/Brand/Rating'
import { useCart } from '@context/Cart'

interface Props {
  movie: MovieProps
  rootProps?: StackProps
}

const api = {
  imageURL: import.meta.env.VITE_URL_IMAGE,
}

export const MovieCard = (props: Props) => {
  const { movie, rootProps } = props
  const { title, poster_path, id, vote_average, vote_count } = movie

  const { handleAddMovieToCart, handleRemoveMovieFromCart, filteredCartMoviesID } = useCart()
  const isMovieOnCart = filteredCartMoviesID.includes(id)

  const resumedName = title.length > 27 ? `${title.slice(0, 27).trim()}...` : title

  return (
    <Stack spacing={{ base: '4', md: '5' }} {...rootProps} role='group'>
      <Box position='relative'>
        <AspectRatio ratio={12 / 16}>
          <Image
            src={api.imageURL + poster_path}
            alt={title}
            draggable='false'
            fallback={<Skeleton rounded={{ base: 'md', md: 'xl' }} />}
            borderRadius={{ base: 'md', md: 'xl' }}
            transform='auto'
            _groupHover={{ scale: { base: 'none', md: 1.05 } }}
            transition='350ms ease'
          />
        </AspectRatio>
        <FavouriteButton movie={movie} />
      </Box>
      <Stack>
        <Stack spacing='1'>
          <Text fontWeight='medium' color={useColorModeValue('gray.700', 'gray.400')}>
            {resumedName}
          </Text>
          <PriceTag price={19.99} salePrice={9.99} currency='USD' />
        </Stack>
        <HStack>
          <Rating defaultValue={Math.floor(vote_average / 2)} size='sm' />
          <Text fontSize='sm' color={useColorModeValue('gray.600', 'gray.400')}>
            {vote_count} votes
          </Text>
        </HStack>
      </Stack>
      <Stack align='center'>
        <Button
          onClick={
            isMovieOnCart
              ? () => handleRemoveMovieFromCart(id)
              : () => handleAddMovieToCart(props.movie)
          }
          colorScheme='blue'
          width='full'
          filter='auto'
          _hover={{ brightness: 1.2 }}
          _active={{ brightness: 0.9 }}
          transition='300ms ease all'
          bg={isMovieOnCart ? 'red.500' : 'blue.500'}
        >
          {isMovieOnCart ? 'Remove from cart' : 'Add to cart'}
        </Button>
        <LinkChakra
          as={Link}
          to={`/movie/${id}`}
          textDecoration='underline'
          fontWeight='medium'
          color={useColorModeValue('gray.600', 'gray.400')}
          _hover={{ color: 'yellow.500' }}
        >
          Details
        </LinkChakra>
      </Stack>
    </Stack>
  )
}
