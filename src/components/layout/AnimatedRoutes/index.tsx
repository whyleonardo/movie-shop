import { Route, Routes, useLocation } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'
import { Favorites } from '@pages/Favorites'
import { Movie } from '@pages/Movie'
import { PopularMovies } from '@pages/PopularMovies'
import { TopRatedMovies } from '@pages/TopRatedMovies'
import { UpcomingMovies } from '@pages/UpcomingMovies'

export const AnimatedRoutes = () => {

  const { pathname, key } = useLocation()
  return (
    <AnimatePresence>
      <Routes key={key} location={pathname}>
        <Route path='/movie/:id' element={<Movie />} />
        <Route path='/popular' element={<PopularMovies />} />
        <Route path='/upcoming' element={<UpcomingMovies />} />
        <Route path='/top-rated' element={<TopRatedMovies />} />
        <Route path='/favorites' element={<Favorites />} />
      </Routes>
    </AnimatePresence>
  )
}
