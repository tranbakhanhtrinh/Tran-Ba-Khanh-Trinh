import React, { ChangeEventHandler } from 'react'
import CoinListModal from '@/components/CoinListModal'
import Input from '@/components/Input'
import { coinList } from '@/constants/coinList'

type Props = {
  title: string
  coinName: string
  source: string
  inputValue: string
  inputId: string
  setState: (e: EventTarget & HTMLInputElement) => void
  onKeyDown: (e: KeyboardEvent) => void
}

const ExchangeInput = ({
  title,
  coinName,
  source,
  inputValue,
  inputId,
  setState,
  onKeyDown
}: Props) => {
  return (
    <div className='exchange-input'>
      <Input
        type='text'
        id={inputId}
        title={title}
        placeholder='0.00'
        className='bg-transparent pl-0 pr-2 py-2 h-[41px] text-[24px]'
        state={inputValue}
        setState={setState}
        onKeyDown={onKeyDown}
      />
      <CoinListModal
        coinList={coinList}
        coinName={coinName}
        source={source}
      />
    </div>
  )
}

export default ExchangeInput
