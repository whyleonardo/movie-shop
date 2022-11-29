import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from '@context/Cart'
import { Favorites } from '@pages/Favorites'
import { Login } from '@pages/Login'
import { Movie } from '@pages/Movie'
import { MoviesProvider } from '@context/Movies'
import { PopularMovies } from '@pages/PopularMovies'
import { SidebarWithHeader } from '@components/layout/SidebarWithHeader'
import { TopRatedMovies } from '@pages/TopRatedMovies'
import { UpcomingMovies } from '@pages/UpcomingMovies'

export const App = () => {
  return (
    <MoviesProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<SidebarWithHeader />}>
              <Route path='/movie/:id' element={<Movie />} />
              <Route path='/popular' element={<PopularMovies />} />
              <Route path='/upcoming' element={<UpcomingMovies />} />
              <Route path='/top-rated' element={<TopRatedMovies />} />
              <Route path='/favorites' element={<Favorites />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </MoviesProvider>
  )
}
