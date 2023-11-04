import ExchangeForm from '@/components/ExchangeForm'
import ReactQueryProvider from '@/components/Provider/ReactQueryProvider'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-24'>
      <h1 className='text-white mb-4 text-2xl'>Currency Convert</h1>
      <ReactQueryProvider>
        <ExchangeForm />
      </ReactQueryProvider>
    </main>
  )
}
