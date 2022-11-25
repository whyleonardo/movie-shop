import { Dispatch, SetStateAction } from 'react'
import { Flex } from '@chakra-ui/react'
import Pagination from '@choc-ui/paginator'

interface PaginatorProps {
  setPage: Dispatch<SetStateAction<number>>
  currentPage: number
}

export const Paginator = ({ currentPage, setPage }: PaginatorProps) => {
  return (
    <Flex
      w="full"
      bg='transparent'
      p={50}
      alignItems="center"
      justifyContent="center"
    >
      <Pagination
        defaultCurrent={currentPage}
        onChange={(page) => {
          // @ts-ignore
          setPage(page)
        }}
        total={50}
        paginationProps={{
          display: 'flex',
        }}
        baseStyles={{
          bg: 'gray.600',
          color: 'gray.100',
          transition: '300ms'
        }}
        currentPage={currentPage}
        colorScheme="blue"
      />
    </Flex>
  )
}
