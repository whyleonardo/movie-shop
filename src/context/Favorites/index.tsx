import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { MovieProps } from 'src/types/MovieTypes'
import { useToast } from '@chakra-ui/react'

interface FavoritesProps {
  favoriteMovies: MovieProps[]
  handleAddMovieToFavorites: (movie: MovieProps) => void
  handleRemoveMovieFromFavorites: (arg0: number) => void
  filteredFavoritestMoviesID: Array<number>
}

const FavoritesContext = createContext<FavoritesProps>({} as FavoritesProps)

export const useFavorites = () => {
  return useContext(FavoritesContext)
}

interface FavoritesProviderProps {
  children: ReactNode
}

export const FavoritesProvider = ({ children }: FavoritesProviderProps) => {
  const [favoriteMovies, setFavoriteMovies] = useState<MovieProps[]>([])

  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: 'top',
  })

  const filteredFavoritestMoviesID = favoriteMovies.map((movie: MovieProps) => movie.id)

  const handleAddMovieToFavorites = (movie: MovieProps) => {
    if (!filteredFavoritestMoviesID.includes(movie.id)) {
      setFavoriteMovies([...favoriteMovies, movie])
    }

    toast({
      title: 'Movie added to favorites!',
      status: 'success',
    })
  }

  const handleRemoveMovieFromFavorites = (id: number) => {
    const removeMovieFromCart = favoriteMovies
      .map((movie: MovieProps) => movie)
      .filter((movie: MovieProps) => movie.id !== id && movie)
    setFavoriteMovies(removeMovieFromCart)

    toast({
      title: 'Movie removed from favorites!',
      status: 'info',
    })
  }

  useEffect(() => {
    const favoriteLocalStorage = JSON.parse(localStorage.getItem('favorites') as string)
    favoriteLocalStorage !== null && setFavoriteMovies(favoriteLocalStorage)
  }, [])

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favoriteMovies))
  }, [favoriteMovies])

  const values = {
    favoriteMovies,
    setFavoriteMovies,
    handleAddMovieToFavorites,
    handleRemoveMovieFromFavorites,
    filteredFavoritestMoviesID,
  }

  return <FavoritesContext.Provider value={values}>{children}</FavoritesContext.Provider>
}
