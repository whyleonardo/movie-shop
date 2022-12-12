import {
  AspectRatio,
  Box,
  HStack,
  IconButton,
  Image,
  Skeleton,
  Stack,
  StackProps,
  Text,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'

import { FaTrash } from 'react-icons/fa'
import { MovieProps } from 'src/types/MovieTypes'
import { PriceTag } from '@components/Brand/PriceTag'
import { Rating } from '@components/Brand/Rating'
import { ReactNode } from 'react'
import { useCart } from '@context/Cart'

interface Props {
  movie: MovieProps
  rootProps?: StackProps
  children: ReactNode
}

const api = {
  imageURL: import.meta.env.VITE_URL_IMAGE,
}

const TrashIcon = chakra(FaTrash)

export const MovieCardCart = (props: Props) => {
  const { movie, rootProps } = props
  const { title, poster_path, id, vote_average, vote_count } = movie
  const { handleRemoveMovieFromCart } = useCart()
  const resumedName = title.length > 27 ? `${title.slice(0, 27).trim()}...` : title

  return (
    <>
      <HStack
        flexDirection='row'
        spacing={{ base: '4', md: '5' }}
        {...rootProps}
        minW='100%'
        justifyContent='space-between'
      >
        <HStack gap='0.1rem'>
          <Box w='5rem' position='relative'>
            <AspectRatio ratio={12 / 16}>
              <Image
                src={api.imageURL + poster_path}
                alt={title}
                draggable='false'
                fallback={<Skeleton rounded={{ base: 'md', md: 'xl' }} />}
                borderRadius={{ base: 'md', md: 'xl' }}
                transition='350ms ease'
              />
            </AspectRatio>
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
        </HStack>

        <Stack alignSelf='center'>
          <IconButton
            aria-label='Remove movie from cart'
            onClick={() => handleRemoveMovieFromCart(id)}
            colorScheme='blue'
            width='full'
            filter='auto'
            icon={<TrashIcon _hover={{ color: 'red.500' }} transition='300ms ease' />}
            _hover={{ brightness: 1.2 }}
            _active={{ brightness: 0.9 }}
            transition='300ms ease all'
            _dark={{ color: 'gray.100' }}
            color='gray.900'
            bg='none'
          />
        </Stack>
      </HStack>

      {props.children}
    </>
  )
}
