import {
  AspectRatio,
  Box,
  Link as ChakraLink,
  Divider,
  Flex,
  FormControl,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Skeleton,
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

interface SearchBarProps {
  closeMenu: () => void
}

export const SearchBar = ({ closeMenu }: SearchBarProps) => {
  const [searchedMovies, setSearchedMovies] = useState<MovieProps[]>([])
  const [openMovieList, setOpenMovieList] = useState(false)
  const [searchText, setSearchText] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()
  const bgColor = useColorModeValue('gray.100', 'gray.700')

  const query =
    searchText.length >= 2 &&
    `${api.search}api_key=${api.key}&language=en-US&query=${searchText}&page=1`

  const [{ data }, refetch] = useAxios({ url: query })

  function handleChangeSearchText(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchText(event.target.value)
  }

  function closeMenuAndModal() {
    onClose()
    closeMenu()
    setSearchText('')
  }

  useEffect(() => {
    if (data && data.results.length > 4) {
      data.results.length = 5
      setSearchedMovies(data.results)
    }
  }, [data])

  useEffect(() => {
    if (searchText.length >= 2) {
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
        <Flex maxW='1120px' bg={bgColor} w='full' rounded='0.5rem' alignItems='center' gap='4'>
          <FormControl>
            <Input
              placeholder='Search the movies'
              _placeholder={{ color: 'gray.400', fontSize: '15px' }}
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
                _placeholder={{ color: 'gray.400', fontSize: '15px' }}
                w='100%'
                h='3rem'
                bg='none'
                variant='filled'
                value={searchText}
                onChange={(e) => handleChangeSearchText(e)}
              />
            </InputGroup>

            {openMovieList && (
              <>
                <Stack
                  bg={useColorModeValue('white', 'gray.700')}
                  p='2'
                  w='full'
                  rounded='0 0 5px 5px'
                  position='absolute'
                  left='0'
                >
                  <Divider h='10px' />

                  {searchedMovies &&
                    searchedMovies.map((movie: MovieProps) => (
                      <ChakraLink
                        key={movie.id}
                        display='flex'
                        alignItems='center'
                        gap='2'
                        to={`/movie/${movie.id}`}
                        as={Link}
                        p='2'
                        fontWeight='medium'
                        _notLast={{ borderBottom: '1px solid', borderColor: 'gray.600' }}
                        rounded='5px'
                        filter='auto'
                        _hover={{ color: 'blue.500', bg: useColorModeValue('white', 'gray.600') }}
                        onClick={closeMenuAndModal}
                      >
                        <Box position='relative' w='3rem'>
                          <AspectRatio ratio={12 / 16}>
                            <Image
                              src={api.img + movie.poster_path}
                              alt={movie.title}
                              draggable='false'
                              fallback={<Skeleton rounded={{ base: 'md', md: 'xl' }} />}
                              borderRadius={{ base: 'md', md: 'xl' }}
                              transition='350ms ease'
                            />
                          </AspectRatio>
                        </Box>
                        {movie.title}
                      </ChakraLink>
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
