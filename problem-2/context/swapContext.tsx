'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'

type SwapContextProviderProps = {
  children: React.ReactNode
}

type SwapInfo = {
  fromCoin: string
  toCoin: string
}

type SwapContextType = {
  swapInfo: SwapInfo
  source: string
  handleSwapCoin: (prop: string, value: string) => void
  handleFromSource: (source: string) => void
}

export const SwapContext = createContext<SwapContextType | null>(null)

const SwapContextProvider = ({ children }: SwapContextProviderProps) => {
  const [swapInfo, setSwapInfo] = useState<SwapInfo>({
    fromCoin: 'USD',
    toCoin: 'ETH'
  })
  const [source, setSource] = useState('')

  const handleSwapCoin = (prop: string, value: string) => {
    setSwapInfo((prev) => ({
      ...prev,
      [prop]: value
    }))
  }

  const handleFromSource = (source: string) => {
    setSource(source)
  }

  return (
    <SwapContext.Provider
      value={{ swapInfo, handleSwapCoin, source, handleFromSource }}
    >
      {children}
    </SwapContext.Provider>
  )
}

export default SwapContextProvider

export const useSwapContext = () => {
  const context = useContext(SwapContext)
  if (!context) {
    throw new Error('useSwapContext must be used within a SwapContextProvider')
  }
  return context
}
