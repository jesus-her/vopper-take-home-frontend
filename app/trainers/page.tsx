'use server'

import TrainerDialog from '@/components/trainer-dialog'
import TrainersList from '@/components/trainers-list'

export default async function TrainersPage () {
  return (
    <main className='flex min-h-screen flex-col items-center justify-start p-24'>
      <TrainersList />
      <TrainerDialog />
    </main>
  )
}
