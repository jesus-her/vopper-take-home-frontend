'use server'

import type { ITrainer } from '@/interfaces/trainer'

// Create Trainer
export async function createTrainerAction (formData: FormData) {
  const trainerBody: ITrainer = {
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
      console.log(errorData)

      throw new Error(errorData[0].message || 'Error creating trainer')
    }
    const data = await response.json()
    return data
  } catch (error: any) {
    return { error: error.message }
  }
}
