'use client'
import ListItem from '@/components/ListItem'
import Modal from '@/components/Modal'
import Portal from '@/components/Portal'
import { useSwapContext } from '@/context/swapContext'
import clsx from 'clsx'
import Image from 'next/image'
import { useState, useMemo, useEffect } from 'react'

type Props = {
  coinList: string[]
  coinName: string
  source: string
}
const CoinListModal = ({ coinList, coinName, source }: Props) => {
  const { swapInfo, handleFromSource, handleSwapCoin } = useSwapContext()
  const [show, setShow] = useState<boolean>(false)
  const [selectedCoinName, setSelectedCoinName] = useState(coinName)
  const { fromCoin, toCoin } = swapInfo
  const removeCurrentCoinName = useMemo(
    () => coinList.filter((coin) => coin !== fromCoin && coin !== toCoin),
    [fromCoin, toCoin]
  )
  const dropdownClick = () => {
    setShow(true)
  }
  useEffect(() => {
    setSelectedCoinName(coinName)
  }, [coinName])
  console.log({ fromCoin, toCoin })
  console.log(removeCurrentCoinName)
  return (
    <>
      <div
        className='dropdown'
        onClick={dropdownClick}
      >
        <div className='flex gap-2 justify-between items-center'>
          <Image
            src={`/tokens/${selectedCoinName}.svg`}
            alt={selectedCoinName}
            width={24}
            height={24}
          />
          <p className='w-[78px] font-bold'>{selectedCoinName}</p>
          <Image
            src='/icons/arrow-down.svg'
            alt='arrow-down'
            className={clsx('cursor-pointer')}
            width={25}
            height={25}
          />
        </div>
      </div>
      <Portal show={show}>
        <Modal
          modalTitle='Select Currency'
          setCloseModal={(val) => setShow(val)}
          showModal={show}
        >
          <ListItem
            coinList={removeCurrentCoinName}
            setCoinName={(val) => {
              setSelectedCoinName(val)
              setShow(false)
              handleSwapCoin(source, val)
              handleFromSource(source)
            }}
          />
        </Modal>
      </Portal>
    </>
  )
}

export default CoinListModal
