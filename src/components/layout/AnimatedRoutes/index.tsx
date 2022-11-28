import { Route, Routes, useLocation } from 'react-router-dom'

import { Movie } from '@pages/Movie'
import { PopularMovies } from '@pages/PopularMovies'
import { TopRatedMovies } from '@pages/TopRatedMovies'
import { UpcomingMovies } from '@pages/UpcomingMovies'
import { AnimatePresence } from 'framer-motion'

export const AnimatedRoutes = () => {

  const { pathname, key } = useLocation()
  return (
    <AnimatePresence>
      <Routes key={key} location={pathname}>
        <Route path='/movie/:id' element={<Movie />} />
        <Route path='/popular' element={<PopularMovies />} />
        <Route path='/upcoming' element={<UpcomingMovies />} />
        <Route path='/top-rated' element={<TopRatedMovies />} />
      </Routes>
    </AnimatePresence>
  )
}
