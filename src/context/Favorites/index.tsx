import { createContext, useContext, useEffect, useState } from 'react'
import { MovieProps } from 'src/types/movieTypes'
import { useToast } from '@chakra-ui/react'

interface FavoritesMoviesProps {
  title: string
  id: string
  poster_path: string
}

interface FavoritesProps {
  moviesCart: MovieProps[]
  setMoviesCart: any
  handleAddMovieToCart: any
  handleDeleteMovieFromCart: any
  filteredCartMoviesID: any
  handleClearAllCart: any
}

const FavoritesContext = createContext<FavoritesProps>({} as FavoritesProps)

export const useFavorites = () => {
  return useContext(FavoritesContext)
}

export const FavoritesProvider = ({ children }: any) => {
  const [favoriteMovies, setFavoriteMovies] = useState<FavoritesMoviesProps[]>([])
  const [avoidFavoritesLocalStorage, setAvoidFavoritesLocalStorage] = useState(true)

  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: 'bottom',

  })

  const filteredFavoritestMoviesID = favoriteMovies.map((movie: FavoritesMoviesProps) => movie.id)

  const handleAddMovieToFavorites = ({ id, title, poster_path }: FavoritesMoviesProps) => {
    setAvoidFavoritesLocalStorage(false)
    filteredFavoritestMoviesID.includes(id) == false &&
      popularMovies.filter((movie: FavoritesProps) => movie.id !== id &&
        setFavoriteMovies([...favoriteMovies,
        {
          id: id,
          title: title,
          poster_path: poster_path
        }
        ]))
    toast({
      title: 'Filme adicionado aos favoritos!',
      status: 'success',

    })
  }

  const handleDeleteMovieFromFavorites = ({ id }: FavoritesProps) => {
    setAvoidFavoritesLocalStorage(false)
    const removeMovieFromCart = favoriteMovies.map((movie: FavoritesProps) => movie).filter((movie: FavoritesProps) => movie.id !== id && movie)
    setFavoriteMovies(removeMovieFromCart)
    toast({
      title: 'Filme removido dos favoritos!',
      status: 'info',
    })
  }

  useEffect(() => {
    setAvoidFavoritesLocalStorage(true)

    const favoriteLocalStorage = JSON.parse(localStorage.getItem('favorites') as any)
    favoriteLocalStorage !== null && setFavoriteMovies(favoriteLocalStorage)
  }, [])

  useEffect(() => {

    avoidFavoritesLocalStorage === false &&
      localStorage.setItem('favorites', JSON.stringify(favoriteMovies))
  }, [avoidFavoritesLocalStorage, favoriteMovies])

  const values = {
    favoriteMovies,
    setFavoriteMovies,
    handleAddMovieToFavorites,
    handleDeleteMovieFromFavorites,
    filteredFavoritestMoviesID,
  }

  return (
    <FavoritesContext.Provider value={values}>
      {children}
    </FavoritesContext.Provider>
  )
}
