import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { MovieProps } from 'src/types/MovieTypes'
import { db } from '@services/firebase'
import { getAuth } from 'firebase/auth'
import { useToast } from '@chakra-ui/react'
import { userCollectionRef } from '@utils/firestoreCalls'

interface FavoritesProps {
  favoriteMovies: MovieProps[]
  handleAddMovieToFavorites: (movie: MovieProps) => void
  handleRemoveMovieFromFavorites: (arg0: number) => void
  filteredFavoritestMoviesID: Array<number>
  favoriteMoviesInUserDB: MovieProps[]
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
  const [favoriteMoviesInUserDB, setFavoriteMoviesInUserDB] = useState<MovieProps[]>([])
  const { currentUser } = getAuth()

  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: 'top',
  })

  const filteredFavoritestMoviesID = favoriteMovies.map((movie: MovieProps) => movie.id)

  const handleAddMovieToFavorites = async (movie: MovieProps) => {
    if (!filteredFavoritestMoviesID.includes(movie.id)) {
      setFavoriteMovies([...favoriteMovies, movie])

      const q = query(userCollectionRef, where('uid', '==', currentUser?.uid))
      const querySnapshot = await getDocs(q)

      const userData = querySnapshot.docs.map((doc) => doc.id)

      const docRef = doc(db, 'users', userData[0])

      await updateDoc(docRef, {
        favoriteMovies: [...favoriteMovies, movie],
      })
    }

    toast({
      title: 'Movie added to favorites!',
      status: 'success',
    })
  }

  // TODO: REMOVE MOVIE FROM FAVORITES ON FIREBASE
  const handleRemoveMovieFromFavorites = async (id: number) => {
    const removeMovieFromCart = favoriteMovies
      .map((movie: MovieProps) => movie)
      .filter((movie: MovieProps) => movie.id !== id && movie)
    setFavoriteMovies(removeMovieFromCart)

    const q = query(userCollectionRef, where('uid', '==', currentUser?.uid))
    const querySnapshot = await getDocs(q)

    const userData = querySnapshot.docs.map((doc) => doc.id)

    const docRef = doc(db, 'users', userData[0])

    await updateDoc(docRef, {
      favoriteMovies: removeMovieFromCart,
    })

    toast({
      title: 'Movie removed from favorites!',
      status: 'info',
    })
  }

  const getFavoriteMoviesFromUserDB = async () => {
    const q = query(userCollectionRef, where('uid', '==', currentUser?.uid))

    const querySnapshot = await getDocs(q)
    const userData = querySnapshot.docs.map((doc) => doc.id)
    const docRef = doc(db, 'users', userData[0])

    const userInfo = await getDoc(docRef)

    setFavoriteMoviesInUserDB(userInfo.get('favoriteMovies'))
  }

  useEffect(() => {
    getFavoriteMoviesFromUserDB()
    const favoriteLocalStorage = JSON.parse(localStorage.getItem('favorites') as string)
    favoriteLocalStorage !== null && setFavoriteMovies(favoriteLocalStorage)
  }, [])

  useEffect(() => {
    getFavoriteMoviesFromUserDB()
    localStorage.setItem('favorites', JSON.stringify(favoriteMovies))
  }, [favoriteMovies])

  const values = {
    favoriteMovies,
    setFavoriteMovies,
    handleAddMovieToFavorites,
    handleRemoveMovieFromFavorites,
    filteredFavoritestMoviesID,
    favoriteMoviesInUserDB,
  }

  return <FavoritesContext.Provider value={values}>{children}</FavoritesContext.Provider>
}
