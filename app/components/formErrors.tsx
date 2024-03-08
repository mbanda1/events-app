import { Text } from '@radix-ui/themes'
import React, { PropsWithChildren } from 'react'

function ErrorHandler({children}: PropsWithChildren) {
  if (!children) return
  
  return (
    <Text color='red' as='p'>{children}</Text>
  )
}

export default ErrorHandler