'use client'

import { File, PlusCircle } from 'lucide-react'

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
import { CSVLink } from 'react-csv'
import type { ITrainer } from '@/interfaces/trainer'

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

  const csvHeaders = [
    { label: 'Name', key: 'name' },
    { label: 'Last Name', key: 'lastName' },
    { label: 'Medals', key: 'medals' },
    { label: 'Phone', key: 'phone' },
    { label: 'Trainer ID', key: 'trainerId' },
    { label: 'Created at', key: 'createdAt' },
    { label: 'Updated at', key: 'updatedAt' }
  ]

  const csvData = trainers.map((trainer: ITrainer) => ({
    name: trainer.name,
    lastName: trainer.lastName,
    medals: trainer.medals,
    phone: trainer.phone,
    trainerId: trainer.trainerId,
    createdAt: new Date(trainer.createdAt).toLocaleString(),
    updatedAt: new Date(trainer.updatedAt).toLocaleString()
  }))

  return (
    <Card className='min-w-full max-w-full overflow-x-auto'>
      <CardHeader className='flex justify-between items-start flex-col gap-2'>
        <div className='flex flex-row w-full justify-between items-center gap-2'>
          <CardTitle>Trainers</CardTitle>
          <div className='flex gap-2 flex-row'>
            <Button
              onClick={() => openDialog('create')}
              size='sm'
              className='h-8 w-fit flex gap-2'
            >
              <PlusCircle className='h-3.5 w-3.5' />
              <span>Add Trainer</span>
            </Button>
            <CSVLink
              data={csvData}
              headers={csvHeaders}
              filename='trainers.csv'
              className='btn btn-primary'
            >
              <Button size='sm' variant='outline' className='h-8 gap-1'>
                <File className='h-3.5 w-3.5' />
                <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
                  Export
                </span>
              </Button>
            </CSVLink>
          </div>
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
