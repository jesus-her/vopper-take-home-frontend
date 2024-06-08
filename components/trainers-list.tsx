'use client'

import Image from 'next/image'
import { MoreHorizontal } from 'lucide-react'
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

// Define a type for the fetcher function's arguments.
type FetcherArgs = [input: RequestInfo, init?: RequestInit]

const fetcher = async (...args: FetcherArgs) =>
  await fetch(...args).then(async res => await res.json())

export default function TrainersList () {
  const url: string = `http://localhost:8080/api/trainers`

  const {
    data: trainers,
    isLoading,
    error
  } = useSWR(url, fetcher, {
    keepPreviousData: true
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading trainers.</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trainers</CardTitle>
        <CardDescription>
          Manage your trainers and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
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
                  <Image
                    alt='Trainer image'
                    className='aspect-square rounded-md object-cover'
                    height='64'
                    src='/placeholder.svg'
                    width='64'
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
                      <DropdownMenuItem>Edit</DropdownMenuItem>
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
