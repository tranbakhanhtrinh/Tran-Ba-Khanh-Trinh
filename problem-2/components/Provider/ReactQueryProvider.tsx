'use client'
import { ReactNode, useState } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

const ReactQueryProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  )
}

export default ReactQueryProvider
