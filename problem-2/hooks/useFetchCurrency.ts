import { api } from '@/helper/axios'
import { useQuery } from 'react-query'

const fetchCurrency = async () => {
  try {
    return await api.get(`/prices.json`).then((res) => res.data)
  } catch (error) {
    throw new Error('Fail to fetch currency.')
  }
}

export const useFetchCurrency = () =>
  useQuery('currency', fetchCurrency, {
    refetchOnWindowFocus: false
  })
