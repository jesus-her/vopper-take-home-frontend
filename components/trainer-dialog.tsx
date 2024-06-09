'use client'
import React, { useRef, useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  createTrainerAction,
  updateTrainerAction
} from '@/lib/actions/trainer.actions'
import { useDialogStore } from '@/store/dialog-store'
import { revalidateLiveQueries } from '@/app/providers'

export default function TrainerDialog () {
  const { isOpen, mode, initialData, closeDialog } = useDialogStore()
  const [error, setError] = useState<string | null>(null)
  const ref = useRef<HTMLFormElement>(null)

  const handleSubmit = async (formData: FormData) => {
    const result =
      mode === 'create'
        ? await createTrainerAction(formData)
        : await updateTrainerAction(formData, initialData?.trainerId)

    if (result.error) {
      setError(result.error)
    } else {
      closeDialog()
      await revalidateLiveQueries()
      // Reset form
      setError(null)
      if (ref.current) {
        ref.current.reset()
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogTitle>
          {mode === 'create' ? 'Create New Trainer' : 'Edit Trainer'}
        </DialogTitle>
        <form
          ref={ref}
          onSubmit={e => {
            e.preventDefault()
            const formData = new FormData(ref.current!)
            handleSubmit(formData)
          }}
        >
          <Input
            placeholder='Name'
            defaultValue={initialData?.name}
            name='name'
            required
          />
          <Input
            placeholder='Last Name'
            defaultValue={initialData?.lastName}
            name='lastName'
            required
          />
          <Input
            placeholder='Medals'
            defaultValue={initialData?.medals}
            type='number'
            name='medals'
            required
          />
          <Input
            placeholder='Phone'
            defaultValue={initialData?.phone}
            name='phone'
            required
          />

          {error && <p className='text-red-500'>{error}</p>}

          <Button type='submit'>
            {mode === 'create' ? 'Create' : 'Update'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
