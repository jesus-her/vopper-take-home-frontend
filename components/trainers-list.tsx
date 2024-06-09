'use client'

import Avvvatars from 'avvvatars-react'
import { MoreHorizontal, PlusCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import useSWR from 'swr'
import { useDialogStore } from '@/store/dialog-store'

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
    <Card>
      <CardHeader className=' flex flex-row justify-between items-end'>
        <div className=' flex flex-col gap-2'>
          <CardTitle>Trainers</CardTitle>
          <CardDescription>
            Manage your trainers and view their details.
          </CardDescription>
        </div>
        <Button
          onClick={() => openDialog('create')}
          size='sm'
          className='h-8 gap-1'
        >
          <PlusCircle className='h-3.5 w-3.5' />
          <span className='sr-only sm:not-sr-only sm:whitespace-nowrap'>
            Add Trainer
          </span>
        </Button>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Flag</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Medals</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Trainer ID</TableHead>
              <TableHead>Created at</TableHead>
              <TableHead>Updated at</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {trainers.map((trainer: any) => (
              <TableRow key={trainer._id}>
                <TableCell className='hidden sm:table-cell'>
                  <Avvvatars
                    value={`${trainer.name} ${trainer.lastName} ${trainer.trainerId}`}
                    style='shape'
                  />
                </TableCell>
                <TableCell className='font-medium'>{trainer.name}</TableCell>
                <TableCell>{trainer.lastName}</TableCell>
                <TableCell>
                  <Badge variant='outline'>{trainer.medals}</Badge>
                </TableCell>
                <TableCell>{trainer.phone}</TableCell>
                <TableCell>{trainer.trainerId}</TableCell>
                <TableCell>
                  {new Date(trainer.createdAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(trainer.updatedAt).toLocaleString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button aria-haspopup='true' size='icon' variant='ghost'>
                        <MoreHorizontal className='h-4 w-4' />
                        <span className='sr-only'>Toggle menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end'>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => openDialog('edit', trainer)}
                      >
                        Edit
                      </DropdownMenuItem>

                      <DropdownMenuItem>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
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
