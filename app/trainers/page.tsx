'use server'

import TrainerDialog from '@/components/trainer-dialog'
import TrainersList from '@/components/trainers-list'

export default async function TrainersPage () {
  return (
    <main className='flex min-h-screen flex-col items-center justify-start max-w-7xl mx-auto py-28 px-4 overflow-x-auto'>
      <TrainersList />
      <TrainerDialog />
    </main>
  )
}
