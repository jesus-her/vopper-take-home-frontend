'use server'

import CreateTrainerDialog from '@/components/create-trainer-dialog'
import TrainersList from '@/components/trainers-list'

interface RootPageProps {
  searchParams: {
    limit: number
    page: number
    search?: string
  }
}
export default async function Home ({ searchParams }: RootPageProps) {
  return (
    <>
      <main className='flex min-h-screen flex-col items-center justify-start gap-8 p-24'>
        <h1>Trainers</h1>
        <TrainersList />
        <CreateTrainerDialog />
      </main>
    </>
  )
}