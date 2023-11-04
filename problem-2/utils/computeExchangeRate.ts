export const computeExchangeRate = (coin1: number, coin2: number) => {
  if (!coin1 || !coin2) {
    return 'Exchange rate not found for one or both coins.'
  }

  const rate = coin2 / coin1
  return rate
}
