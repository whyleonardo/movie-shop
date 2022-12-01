import {
  Link as ChakraLink,
  Divider,
  Flex,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Stack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import { useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import { Link } from 'react-router-dom'
import { MovieProps } from 'src/types/MovieTypes'
import { api } from '@data/api'
import useAxios from 'axios-hooks'

export const SearchBar = () => {
  const [searchText, setSearchText] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [searchedMovies, setSearchedMovies] = useState<MovieProps[]>([])
  const [openMovieList, setOpenMovieList] = useState(false)

  const query =
    searchText.length >= 3 &&
    `${api.search}api_key=${api.key}&language=en-US&query=${searchText}&page=1`
  const [{ data }, refetch] = useAxios({ url: query })

  function dois(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value)
  }

  const bgColor = useColorModeValue('gray.100', 'gray.700')
  const listColor = useColorModeValue('#edf2f7', 'gray.700')
  const placeholderColor = useColorModeValue('gray.900', 'white')

  useEffect(() => {
    setSearchedMovies(data?.results)
  }, [data])

  useEffect(() => {
    if (searchText.length >= 3) {
      refetch()
    }

    if (searchText.length >= 2) {
      setOpenMovieList(true)
    } else {
      setOpenMovieList(false)
    }
  }, [searchText])

  return (
    <>
      <Flex w='90%' alignSelf='center'>
        <Flex
          maxW='1120px'
          bg={bgColor}
          p='1rem'
          w='full'
          rounded='20px'
          alignItems='center'
          gap='4'
        >
          <FormControl>
            <Input
              placeholder='Search the movies'
              _placeholder={{ color: placeholderColor, fontSize: '15px' }}
              w='100%'
              h='3rem'
              bg='none'
              variant='filled'
              onClick={onOpen}
            />
          </FormControl>
        </Flex>
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} motionPreset='slideInBottom'>
        <ModalOverlay />
        <ModalContent>
          <ModalBody position='relative'>
            <InputGroup>
              <InputLeftElement h='full' pointerEvents='none'>
                <FaSearch size='1rem' />
              </InputLeftElement>

              <Input
                placeholder='Search the movies'
                _placeholder={{ color: placeholderColor, fontSize: '15px' }}
                w='100%'
                h='3rem'
                bg='none'
                variant='filled'
                value={searchText}
                onChange={(e) => dois(e)}
              />
            </InputGroup>

            {openMovieList && (
              <>
                <Stack bg='red.500' p='2' w='full' position='absolute' left='0'>
                  <Divider h='10px' />

                  {searchedMovies &&
                    searchedMovies.map((movie: MovieProps) => (
                      <Flex key={movie.id}>{movie.title}</Flex>
                    ))}
                </Stack>
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
