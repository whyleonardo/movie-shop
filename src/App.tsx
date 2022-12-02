import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Cart } from '@pages/Cart'
import { CartProvider } from '@context/Cart'
import { Favorites } from '@pages/Favorites'
import { FavoritesProvider } from '@context/Favorites'
import { Login } from '@pages/Login'
import { Movie } from '@pages/Movie'
import { MoviesProvider } from '@context/Movies'
import { PopularMovies } from '@pages/PopularMovies'
import { Register } from '@pages/Register'
import { SidebarWithHeader } from '@components/layout/SidebarWithHeader'
import { TopRatedMovies } from '@pages/TopRatedMovies'
import { UpcomingMovies } from '@pages/UpcomingMovies'

export const App = () => {
  return (
    <MoviesProvider>
      <CartProvider>
        <FavoritesProvider>
          <BrowserRouter>
            <Routes>
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />
              <Route path='/' element={<SidebarWithHeader />}>
                <Route path='/movie/:id' element={<Movie />} />
                <Route path='/popular' element={<PopularMovies />} />
                <Route path='/upcoming' element={<UpcomingMovies />} />
                <Route path='/top-rated' element={<TopRatedMovies />} />
                <Route path='/favorites' element={<Favorites />} />
                <Route path='/cart' element={<Cart />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </FavoritesProvider>
      </CartProvider>
    </MoviesProvider>
  )
}
