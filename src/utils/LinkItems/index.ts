import { FaCalendar, FaChartLine, FaHeart, FaHome, FaShoppingCart, FaStar } from 'react-icons/fa'
import { IconType } from 'react-icons'

interface LinkItemProps {
  name: string
  icon: IconType
  path: string
}

export const LinkItems: Array<LinkItemProps> = [
  { name: 'Home', icon: FaHome, path: '/' },
  { name: 'Popular', icon: FaChartLine, path: '/popular' },
  { name: 'Top Rated', icon: FaStar, path: '/top-rated' },
  { name: 'Upcoming', icon: FaCalendar, path: '/upcoming' },
  { name: 'Favorites', icon: FaHeart, path: '/favorites' },
  { name: 'Cart', icon: FaShoppingCart, path: '/cart' },
]
