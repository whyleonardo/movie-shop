import { Icon, IconButton, LightMode } from '@chakra-ui/react'
import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { MovieProps } from 'src/types/MovieTypes'
import { useFavorites } from '@context/Favorites'

interface FavouriteButtonProps {
  movie: MovieProps
}

export const FavouriteButton = ({ movie }: FavouriteButtonProps) => {
  const { handleAddMovieToFavorites, handleRemoveMovieFromFavorites, filteredFavoritestMoviesID } =
    useFavorites()

  const isMovieOnFavorites = filteredFavoritestMoviesID.includes(movie.id)
  return (
    <LightMode>
      <IconButton
        isRound
        bg='white'
        color='red.500'
        size='sm'
        _hover={{ transform: 'scale(1.1)' }}
        sx={{ ':hover > svg': { transform: 'scale(1.1)' } }}
        transition='all 0.15s ease'
        icon={<Icon as={isMovieOnFavorites ? FaHeart : FiHeart} transition='all 0.15s ease' />}
        boxShadow='base'
        aria-label={`Add ${movie.title} to your favourites`}
        position='absolute'
        top='4'
        right='4'
        onClick={
          isMovieOnFavorites
            ? () => handleRemoveMovieFromFavorites(movie.id)
            : () => handleAddMovieToFavorites(movie)
        }
      />
    </LightMode>
  )
}
