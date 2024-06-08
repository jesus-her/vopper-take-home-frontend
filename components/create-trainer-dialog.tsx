'use client'
import React, { useRef, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createTrainerAction } from '@/lib/actions/trainer.actions'

export default function CreateTrainerDialog () {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const ref = useRef<HTMLFormElement>(null)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create Trainer</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create New Trainer</DialogTitle>
        <form
          ref={ref}
          action={async formData => {
            const result = await createTrainerAction(formData)
            if (result.error) {
              setError(result.error)
            } else {
              setIsOpen(false)
              // Reset form
              if (ref.current) {
                ref.current.reset()
              }
            }
          }}
        >
          <Input placeholder='Name' name='name' required />
          <Input placeholder='Last Name' name='lastName' required />
          <Input placeholder='Medals' type='number' name='medals' required />
          <Input placeholder='Phone' name='phone' required />

          {error && <p className='text-red-500'>{error}</p>}

          <Button type='submit'>Create</Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
