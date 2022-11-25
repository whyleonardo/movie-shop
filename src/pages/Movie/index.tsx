import useAxios from 'axios-hooks'
import { useParams } from 'react-router-dom'

const api = {
  url: import.meta.env.VITE_URL_GET_MOVIE,
  key: import.meta.env.VITE_API_KEY_V3
}

export const Movie = () => {
  const { id } = useParams()

  const query = `${api.url}${id}?api_key=${api.key}&language=en-US`
  const [{ data, loading, error }, refetch] = useAxios({
    url: query
  })

  return (
    <div>{data?.overview}</div>
  )
}
