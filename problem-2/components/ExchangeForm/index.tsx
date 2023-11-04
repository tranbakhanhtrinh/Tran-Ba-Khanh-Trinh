'use client'
import Button from '@/components/Button'
import ExchangeInput from '@/components/ExchangeInput'
import { useSwapContext } from '@/context/swapContext'
import { computeExchangeRate, wait } from '@/utils/'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Tooltip from '../Tooltip'
import { useFetchCurrency } from '@/hooks'

type CoinType = {
  currency: string
  date: string
  price: number
}
const regEx = /^\d*\.?\d*$/
const ExchangeForm = () => {
  const { swapInfo, handleSwapCoin, source, handleFromSource } =
    useSwapContext()
  const [inputs, setInputs] = useState({ inputFrom: '', inputTo: '' })
  const [showTooltip, setShowTooltip] = useState(false)
  const { fromCoin, toCoin } = swapInfo
  const { data } = useFetchCurrency()
  const coinPrice = (coin: string) => {
    const currentCoin = data?.find((d: CoinType) => d.currency === coin)
    return currentCoin?.price
  }
  const calculateValue = (input: string, rate: number) =>
    (+input * rate).toFixed(8).toString()
  const generateExchangedAmount = (inputParam: string, rate: number) => {
    const calculatedAmount = calculateValue(inputParam, rate)
    const exchangedAmount = inputParam
      ? fromCoin === toCoin && Number.isInteger(+inputParam)
        ? parseInt(calculatedAmount).toString()
        : calculatedAmount
      : ''
    return exchangedAmount
  }
  useEffect(() => {
    const { inputFrom, inputTo } = inputs
    if (source === 'fromCoin') {
      const rate = computeExchangeRate(
        coinPrice(toCoin),
        coinPrice(fromCoin)
      ) as number
      setInputs((prev) => ({
        ...prev,
        inputTo: generateExchangedAmount(inputFrom, rate)
      }))
    } else if (source === 'toCoin') {
      const rate = computeExchangeRate(
        coinPrice(fromCoin),
        coinPrice(toCoin)
      ) as number
      setInputs((prev) => ({
        ...prev,
        inputFrom: generateExchangedAmount(inputTo, rate)
      }))
    }
  }, [fromCoin, source, toCoin])

  const handleInputs = (e: EventTarget & HTMLInputElement) => {
    const { value, name } = e
    if (regEx.test(value)) {
      if (name === 'inputFrom') {
        const rate = computeExchangeRate(
          coinPrice(toCoin),
          coinPrice(fromCoin)
        ) as number
        setInputs((prev) => ({
          ...prev,
          [name]: value,
          inputTo: generateExchangedAmount(value, rate)
        }))
      } else if (name === 'inputTo') {
        const rate = computeExchangeRate(
          coinPrice(fromCoin),
          coinPrice(toCoin)
        ) as number
        setInputs((prev) => ({
          ...prev,
          [name]: value,
          inputFrom: generateExchangedAmount(value, rate)
        }))
      }
    }
  }
  const handleSwapButton = () => {
    handleSwapCoin('fromCoin', toCoin)
    handleSwapCoin('toCoin', fromCoin)

    setInputs((prev) => {
      const { inputFrom, inputTo } = prev
      return {
        ...prev,
        inputFrom: inputTo,
        inputTo: inputFrom
      }
    })
  }
  const handleKeyDown = async (event: KeyboardEvent) => {
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      setShowTooltip(true)
      setInputs((prev) => ({
        ...prev,
        inputFrom: prev.inputFrom,
        inputTo: prev.inputTo
      }))
      await wait(900)
      setShowTooltip(false)
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='relative'>
        <ExchangeInput
          inputId='inputFrom'
          title='From'
          source='fromCoin'
          coinName={fromCoin}
          inputValue={inputs.inputFrom}
          setState={(e) => handleInputs(e)}
          onKeyDown={(e) => {
            handleKeyDown(e)
            handleFromSource('fromCoin')
          }}
        />
        {<Tooltip show={showTooltip && source === 'fromCoin'} />}
      </div>
      <Button
        type='button'
        onClick={handleSwapButton}
        className='p-2 rounded-full bg-exchange-input my-12'
      >
        <Image
          src='/icons/up-down-arrow.svg'
          alt='up-down-arrow'
          width={30}
          height={30}
          className='text-white'
        />
      </Button>
      <div className='relative'>
        <ExchangeInput
          inputId='inputTo'
          title='To'
          source='toCoin'
          coinName={toCoin}
          inputValue={inputs.inputTo}
          setState={(e) => handleInputs(e)}
          onKeyDown={(e) => {
            handleKeyDown(e)
            handleFromSource('toCoin')
          }}
        />
        {<Tooltip show={showTooltip && source === 'toCoin'} />}
      </div>
    </div>
  )
}

export default ExchangeForm
