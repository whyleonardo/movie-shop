import { Box, Image, Stack } from '@chakra-ui/react'
import { BackPreviousPage } from '@components/Buttons/BackPreviousPage'
import { api } from '@data/api'
import useAxios from 'axios-hooks'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export const Movie = () => {
  const { id } = useParams()
  const query = `${api.singleMovie}${id}?api_key=${api.key}&language=en-US`
  const [{ data, loading, error }, refetch] = useAxios({
    url: query,
  })

  useEffect(() => {
    refetch()
  }, [])

  return (
    <Box
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      position='absolute'
      top='0'
      left='0'
      h='100%'
      w='full'
      bgImage={api.backdrop_img + data?.backdrop_path}
      bgSize='cover'
      bgPosition='center'
      overflow='hidden'
    >
      <Box h='100%' p='6'>
        <BackPreviousPage />
      </Box>

      <Box
        position='absolute'
        bottom='0'
        w='full'
        h='full'
        bgGradient='linear(to-b, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.7) 75%)'
      />
    </Box>
  )
}
