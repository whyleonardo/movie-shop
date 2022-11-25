import {
  AspectRatio,
  Box,
  Button,
  HStack,
  Image,
  Link,
  Skeleton,
  Stack,
  StackProps,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react'

import { FavouriteButton } from '@components/Buttons/FavouriteButton'
import { MovieProps } from 'src/types/movieTypes'
import { PriceTag } from '@components/Brand/PriceTag'
import { Rating } from '@components/Brand/Rating'

interface Props {
  movie: MovieProps
  rootProps?: StackProps
}

const api = {
  imageURL: import.meta.env.VITE_URL_IMAGE
}

export const MovieCard = (props: Props) => {
  const { movie, rootProps } = props
  const { title, poster_path, id, overview, vote_average, vote_count } = movie
  return (
    <Stack spacing={useBreakpointValue({ base: '4', md: '5' })} {...rootProps}>
      <Box position="relative">
        <AspectRatio ratio={9 / 16}>
          <Image
            src={api.imageURL + poster_path}
            alt={title}
            draggable="false"
            fallback={<Skeleton />}
            borderRadius={useBreakpointValue({ base: 'md', md: 'xl' })}
          />
        </AspectRatio>
        <FavouriteButton
          position="absolute"
          top="4"
          right="4"
          aria-label={`Add ${title} to your favourites`}
        />
      </Box>
      <Stack>
        <Stack spacing="1">
          <Text fontWeight="medium" color={useColorModeValue('gray.700', 'gray.400')}>
            {title}
          </Text>
          <PriceTag price={19} salePrice={19} currency="USD" />
        </Stack>
        <HStack>
          <Rating defaultValue={Math.floor(vote_average / 2)} size="sm" />
          <Text fontSize="sm" color={useColorModeValue('gray.600', 'gray.400')}>
            {vote_count} votes
          </Text>
        </HStack>
      </Stack>
      <Stack align="center">
        <Button colorScheme="blue" width="full">
          Add to cart
        </Button>
        <Link
          textDecoration="underline"
          fontWeight="medium"
          color={useColorModeValue('gray.600', 'gray.400')}
        >
          Quick shop
        </Link>
      </Stack>
    </Stack>
  )
}
