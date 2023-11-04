import React, { useMemo } from 'react'

interface WalletBalance {
  currency: string
  amount: number
  blockchain: string
}
interface FormattedWalletBalance extends WalletBalance {
  formatted: string
}

type BoxProps = {}
interface Props extends BoxProps {
  children: React.ReactNode
  rest: {}
}

const priorities: Record<string, number> = {
  Osmosis: 100,
  Ethereum: 50,
  Arbitrum: 30,
  Zilliqa: 20,
  Neo: 20
}

const getPriority = (blockchain: string): number => {
  return priorities[blockchain] || -99
}

const WalletPage: React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props
  const balances = useWalletBalances()
  const prices = usePrices()

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        return getPriority(balance.blockchain) > -99
          ? balance.amount <= 0
          : false
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain)
        const rightPriority = getPriority(rhs.blockchain)
        return leftPriority > rightPriority
          ? -1
          : rightPriority > leftPriority
          ? 1
          : 0
      })
  }, [balances, prices])

  const formattedBalances = sortedBalances.map((balance: WalletBalance) => {
    return {
      ...balance,
      formatted: balance.amount.toFixed()
    }
  })

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount
      return (
        <WalletRow
          className={classes.row}
          key={index}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      )
    }
  )

  return <div {...rest}>{rows}</div>
}
