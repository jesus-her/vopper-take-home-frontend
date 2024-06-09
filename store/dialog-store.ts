import { ITrainer } from '@/interfaces/trainer'
import { create } from 'zustand'

interface DialogState {
  isOpen: boolean
  mode: 'create' | 'edit'
  initialData: ITrainer | null
  openDialog: (mode: 'create' | 'edit', initialData?: any) => void
  closeDialog: () => void
}

export const useDialogStore = create<DialogState>(set => ({
  isOpen: false,
  mode: 'create',
  initialData: null,
  openDialog: (mode, initialData = null) =>
    set({ isOpen: true, mode, initialData }),
  closeDialog: () => set({ isOpen: false, mode: 'create', initialData: null })
}))
