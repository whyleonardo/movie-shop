import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { MovieProps } from 'src/types/MovieTypes'
import { useToast } from '@chakra-ui/react'

interface CartProps {
  moviesCart: MovieProps[]
  handleAddMovieToCart: (movie: MovieProps) => void
  handleRemoveMovieFromCart: (arg0: number) => void
  handleClearAllCart: () => void
  filteredCartMoviesID: Array<number>
}

const CartContext = createContext<CartProps>({} as CartProps)

export const useCart = () => {
  return useContext(CartContext)
}

interface CartProviderProps {
  children: ReactNode
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [moviesCart, setMoviesCart] = useState<MovieProps[]>([])
  const [avoidCartLocalStorage, setAvoidCartLocalStorage] = useState(true)

  const toast = useToast({
    duration: 2000,
    isClosable: true,
    position: 'bottom',

  })

  const filteredCartMoviesID = moviesCart.map((movie: MovieProps) => movie.id)

  const handleAddMovieToCart = (movie: MovieProps) => {
    // setAvoidCartLocalStorage(false)
    if (!filteredCartMoviesID.includes(movie.id)) {
      setMoviesCart([...moviesCart, movie])
    }

    toast({
      title: 'Filme adicionado ao carrinho!',
      status: 'success'
    })

  }

  const handleRemoveMovieFromCart = (id: number) => {
    // setAvoidCartLocalStorage(false)
    const removeMovieFromCart = moviesCart.map((movie: MovieProps) => movie).filter((movie: MovieProps) => movie.id !== id && movie)
    setMoviesCart(removeMovieFromCart)

    toast({
      title: 'Filme removido do carrinho!',
      status: 'info',
    })
  }

  const handleClearAllCart = () => {
    const clearedCart: MovieProps[] = []
    setMoviesCart(clearedCart)
  }

  useEffect(() => {
    // setAvoidCartLocalStorage(true)
    const cartLocalStorage = JSON.parse(localStorage.getItem('cart') as string)
    cartLocalStorage !== null && setMoviesCart(cartLocalStorage)
  }, [])

  useEffect(() => {
    // avoidCartLocalStorage === false &&
    localStorage.setItem('cart', JSON.stringify(moviesCart))

  }, [moviesCart])


  const values = {
    moviesCart,
    handleAddMovieToCart,
    handleRemoveMovieFromCart,
    handleClearAllCart,
    filteredCartMoviesID
  }

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  )
}
