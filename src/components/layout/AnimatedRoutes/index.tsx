import { Route, Routes, useLocation } from 'react-router-dom'

import { Movie } from '@pages/Movie'
import { PopularMovies } from '@pages/PopularMovies'
import { TopRatedMovies } from '@pages/TopRatedMovies'
import { UpcomingMovies } from '@pages/UpcomingMovies'

export const AnimatedRoutes = () => {

  const { pathname, key } = useLocation()
  return (
    <Routes key={key} location={pathname}>
      <Route path='/movie' element={<Movie />} />
      <Route path='/popular' element={<PopularMovies />} />
      <Route path='/upcoming' element={<UpcomingMovies />} />
      <Route path='/top-rated' element={<TopRatedMovies />} />
    </Routes>
  )
}
