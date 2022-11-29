import { api } from '@data/api'
import useAxios from 'axios-hooks'
import { useParams } from 'react-router-dom'

export const Movie = () => {
  const { id } = useParams()

  const query = `${api.singleMovie}${id}?api_key=${api.key}&language=en-US`
  const [{ data, loading, error }, refetch] = useAxios({
    url: query
  })

  return (
    <div>{data?.overview}</div>
  )
}
