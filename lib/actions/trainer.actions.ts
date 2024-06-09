'use server'

import type { TrainerActionInput } from '@/interfaces/trainer'
import { revalidatePath } from 'next/cache'

// Create Trainer
export async function createTrainerAction (formData: FormData) {
  const trainerBody: TrainerActionInput = {
    name: formData.get('name') as string,
    lastName: formData.get('lastName') as string,
    medals: Number(formData.get('medals')),
    phone: formData.get('phone') as string
  }

  const requestOptions: RequestInit = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trainerBody),
    redirect: 'follow',
    cache: 'no-store'
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trainers`,
      requestOptions
    )
    if (!response.ok) {
      const errorData = await response.json()

      throw new Error(errorData[0].message || 'Error creating trainer')
    }
    const data = await response.json()
    revalidatePath('/trainer')

    return data
  } catch (error: any) {
    return { error: error.message }
  }
}

// Update Trainer
export async function updateTrainerAction (
  formData: FormData,
  trainerId: string | undefined
) {
  const trainerBody: TrainerActionInput = {
    name: formData.get('name') as string,
    lastName: formData.get('lastName') as string,
    medals: Number(formData.get('medals')),
    phone: formData.get('phone') as string
  }

  const requestOptions: RequestInit = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(trainerBody),
    redirect: 'follow',
    cache: 'no-store'
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/${trainerId}`,
      requestOptions
    )
    if (!response.ok) {
      const errorData = await response.json()

      throw new Error(errorData[0].message || 'Error updating trainer')
    }
    const data = await response.json()
    revalidatePath('/trainer')

    return data
  } catch (error: any) {
    return { error: error.message }
  }
}

// Delete Trainer
export async function deleteTrainerAction (trainerId: string) {
  const requestOptions: RequestInit = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow',
    cache: 'no-store'
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/trainers/${trainerId}`,
      requestOptions
    )
    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData[0].message || 'Error deleting trainer')
    }
    const data = await response.json()
    return data
  } catch (error: any) {
    return { error: error.message }
  }
}
