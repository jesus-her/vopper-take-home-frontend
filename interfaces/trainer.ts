import { Key } from 'react'

export interface ITrainer {
  _id: Key | null | undefined
  createdAt: Date
  updatedAt: Date
  trainerId: string
  name: string
  lastName: string
  medals: number
  phone: string
}

export type TrainerActionInput = Omit<
  ITrainer,
  '_id' | 'createdAt' | 'updatedAt' | 'trainerId'
>
