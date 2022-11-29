import { Dispatch, ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { MovieProps } from 'src/types/movieTypes'

interface MoviesContextProps {
  popularMovies: MovieProps[]
  setPopularMovies: Dispatch<React.SetStateAction<MovieProps[]>>
  nowPlaying: MovieProps[]
  setNowPlaying: Dispatch<React.SetStateAction<MovieProps[]>>
  topRatedMovies: MovieProps[]
  setTopRatedMovies: Dispatch<React.SetStateAction<MovieProps[]>>
  upcomingMovies: MovieProps[]
  setUpcomingMovies: Dispatch<React.SetStateAction<MovieProps[]>>
}

const MoviesContext = createContext<MoviesContextProps>({} as MoviesContextProps)

interface MoviesProviderProps {
  children: ReactNode
}

export const useMovies = () => {
  return useContext(MoviesContext)
}

export const MoviesProvider = ({ children }: MoviesProviderProps) => {
  const [popularMovies, setPopularMovies] = useState<MovieProps[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<MovieProps[]>([])
  const [upcomingMovies, setUpcomingMovies] = useState<MovieProps[]>([])
  const [nowPlaying, setNowPlaying] = useState<MovieProps[]>([])

  const values = {
    popularMovies,
    setPopularMovies,
    topRatedMovies,
    setTopRatedMovies,
    upcomingMovies,
    setUpcomingMovies,
    nowPlaying,
    setNowPlaying
  }

  return (
    <MoviesContext.Provider value={values}>
      {children}
    </MoviesContext.Provider>
  )
}

export const dois = 2
