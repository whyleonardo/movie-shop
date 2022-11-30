import * as React from 'react'
import { SimpleGrid, SimpleGridProps } from '@chakra-ui/react'
import { motion } from 'framer-motion'

export const MovieGrid = (props: SimpleGridProps) => {
  const columns = React.useMemo(() => {
    const count = React.Children.toArray(props.children).filter(React.isValidElement).length
    return {
      base: Math.min(1, count),
      md: Math.min(4, 4),
      lg: Math.min(4, 4),
      xl: Math.min(4, 4),
    }
  }, [props.children])

  return (
    <SimpleGrid
      as={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      columns={columns}
      columnGap={{ base: '4', md: '6' }}
      rowGap={{ base: '8', md: '10' }}
      {...props}
    />
  )
}
