import type { ITrainer } from '@/interfaces/trainer'
import Avvvatars from 'avvvatars-react'
import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from './ui/table'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { MoreHorizontal } from 'lucide-react'
import { deleteTrainerAction } from '@/lib/actions/trainer.actions'
import { revalidateLiveQueries } from '@/app/providers'
import { useDialogStore } from '@/store/dialog-store'

interface TrainersTableProps {
  trainers: ITrainer[]
}

const TrainersTable: React.FC<TrainersTableProps> = ({ trainers }) => {
  const isEmpty = trainers.length === 0
  const { openDialog } = useDialogStore()

  const handleDeleteTrainer = async (trainerId: string) => {
    // Mostrar ventana de confirmación
    const confirmDelete = confirm(
      '¿Estás seguro de que quieres eliminar este entrenador?'
    )
    if (confirmDelete) {
      try {
        await deleteTrainerAction(trainerId)

        await revalidateLiveQueries()
      } catch (error) {
        console.error('Error al eliminar el entrenador: ', error)
      }
    }
  }

  return (
    <>
      {isEmpty ? (
        <div className='p-8 text-center w-full min-w-full border border-dashed'>
          <svg
            className='mx-auto h-12 w-12 text-gray-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M9.75 17.013h.008v.008h-.008v-.008zm.008 0A5.5 5.5 0 118 6.49m8 0a5.5 5.5 0 11-1.75 10.523M8 11h8m-8 4h8'
            />
          </svg>
          <h3 className='mt-2 text-xl font-bold text-gray-900'>
            No trainers added
          </h3>
          <p className='mt-1 text-sm text-gray-500'>
            You have not added any trainers. Add one below.
          </p>
          <div className='mt-6'>
            <Button
              onClick={() => openDialog('create')}
              className='btn btn-primary'
            >
              Add Trainer
            </Button>
          </div>
        </div>
      ) : (
        <Table className=' overflow-x-auto '>
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
            {trainers.map((trainer: ITrainer) => (
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

                      <DropdownMenuItem
                        onClick={() => handleDeleteTrainer(trainer.trainerId)}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  )
}

export default TrainersTable
