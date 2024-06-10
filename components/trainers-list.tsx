'use client'

import { PlusCircle } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'

import useSWR from 'swr'
import { useDialogStore } from '@/store/dialog-store'

import TrainersTable from './trainers-table'

// Define a type for the fetcher function's arguments.
type FetcherArgs = [input: RequestInfo, init?: RequestInit]

const fetcher = async (...args: FetcherArgs) =>
  await fetch(...args).then(async res => await res.json())

export default function TrainersList () {
  const url: string = `${process.env.NEXT_PUBLIC_BASE_URL}/trainers`

  const {
    data: trainers,
    isLoading,
    error
  } = useSWR(url, fetcher, {
    keepPreviousData: true
  })
  const { openDialog } = useDialogStore()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading trainers.</div>
  }

  return (
    <Card className='min-w-full max-w-full overflow-x-auto'>
      <CardHeader className='flex justify-between items-start flex-col gap-2'>
        <div className='flex flex-row w-full justify-between items-center gap-2'>
          <CardTitle>Trainers</CardTitle>
          <Button
            onClick={() => openDialog('create')}
            size='sm'
            className='h-8 w-fit flex gap-2'
          >
            <PlusCircle className='h-3.5 w-3.5' />
            <span>Add Trainer</span>
          </Button>
        </div>
        <CardDescription>
          Manage your trainers and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TrainersTable trainers={trainers} />
      </CardContent>
      <CardFooter>
        <div className='text-xs text-muted-foreground'>
          Showing <strong>{trainers.length}</strong> of{' '}
          <strong>{trainers.length}</strong> trainers
        </div>
      </CardFooter>
    </Card>
  )
}
