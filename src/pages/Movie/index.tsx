import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Link,
  Spinner,
  Stack,
  Text,
  VStack,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react'

import {
  FaCalendarAlt,
  FaCoins,
  FaExternalLinkAlt,
  FaInfoCircle,
  FaMoneyBillAlt,
  FaStar,
} from 'react-icons/fa'

import { BackPreviousPage } from '@components/Buttons/BackPreviousPage'
import { api } from '@data/api'
import { currecyStyleFormat } from '@utils/currencyStyleFormat'
import { motion } from 'framer-motion'
import useAxios from 'axios-hooks'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ChakraExternalLink = chakra(FaExternalLinkAlt)

export const Movie = () => {
  const { id } = useParams()
  const query = `${api.singleMovie}${id}?api_key=${api.key}&language=en-US`
  const [{ data, loading, error }, refetch] = useAxios({
    url: query,
  })

  currecyStyleFormat

  useEffect(() => {
    refetch()
  }, [])

  return (
    <>
      {loading ? (
        <Flex
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          position='absolute'
          bg={useColorModeValue('gray.100', 'gray.900')}
          top='0'
          left='0'
          h='100vh'
          w='full'
          alignItems='center'
          justifyContent='center'
        >
          <Spinner />
        </Flex>
      ) : (
        <Stack
          as={motion.div}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          position='absolute'
          top='0'
          left='0'
          p='6'
          pt='5rem'
          h='100vh'
          w='full'
          bg={useColorModeValue('gray.100', 'gray.900')}
          bgImage={api.backdrop_img + data?.backdrop_path}
          bgSize='cover'
          bgPosition='center'
          overflowX='hidden'
          justifyContent={{ md: 'center' }}
          color='white'
        >
          <Box as='header' w='full' position='absolute' m='6' top='0' left='0'>
            <BackPreviousPage />
          </Box>

          <VStack
            alignItems='end'
            justifyContent='start'
            position='relative'
            zIndex='1002'
            h='-webkit-fit-content'
            textAlign={{ base: 'center', md: 'start' }}
          >
            <Stack
              flexDirection={{ base: 'column', md: 'row' }}
              maxW={{ base: 'full', md: 'full' }}
              alignItems='center'
              fontSize='1.5rem'
              justifyContent='space-around'
              px='2rem'
            >
              <VStack maxW={{ md: '50%' }}>
                <Heading textAlign='center' fontSize='3.5rem'>
                  {data?.title}
                </Heading>

                <Text fontSize='1.2rem'>{data?.overview}</Text>

                <Stack
                  flexDirection='row'
                  alignItems='end'
                  gap='1'
                  justifyContent='center'
                  fontSize='1rem'
                >
                  {data &&
                    data.genres.map((genre) => (
                      <>
                        <Text m='0 !important' key={genre.id}>
                          {genre.name}
                        </Text>
                        <Text _last={{ display: 'none' }}>•</Text>
                      </>
                    ))}
                </Stack>

                <Text display='flex' alignItems='center' gap='1'>
                  <Icon as={FaStar} color='yellow.500' />
                  {parseFloat(data?.vote_average).toFixed(1)} | {data?.vote_count}
                </Text>

                <Button
                  as={Link}
                  target='_blank'
                  href={data?.homepage}
                  px='2rem'
                  py='1.5rem'
                  isExternal
                  textTransform='uppercase'
                  colorScheme='blue'
                  my='4 !important'
                >
                  Homepage
                  <ChakraExternalLink mx='2' />
                </Button>
              </VStack>

              <VStack fontSize={{ base: '1.2rem', md: '2rem' }} minW={{ md: '30%' }}>
                <Text display='flex' alignItems='center' gap='1'>
                  <Icon as={FaMoneyBillAlt} />
                  Budget: {currecyStyleFormat(data?.budget)}
                </Text>

                <Text display='flex' alignItems='center' gap='1'>
                  <Icon as={FaCoins} />
                  Revenue: {currecyStyleFormat(data?.revenue)}
                </Text>

                <Text display='flex' alignItems='center' gap='1'>
                  <Icon as={FaCalendarAlt} />
                  Release Date: {data?.release_date}
                </Text>

                <Text display='flex' alignItems='center' gap='1'>
                  <Icon as={FaInfoCircle} />
                  Status: {data?.status}
                </Text>
              </VStack>
            </Stack>
          </VStack>
        </Stack>
      )}

      <Box
        as={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        position='absolute'
        zIndex='1001'
        left='0'
        bottom='0'
        w='full'
        h='100%'
        bgGradient='linear(to-b, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.9) 95%)'
      />
    </>
  )
}
