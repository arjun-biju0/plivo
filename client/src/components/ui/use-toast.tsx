import * as React from "react"
import { toast as sonnerToast } from "sonner"

type ToastOptions = {
  title: string
  description?: string
  duration?: number
}

export function useToast() {
  const toast = React.useCallback(({ title, description, duration = 3000 }: ToastOptions) => {
    sonnerToast(title, {
      description,
      duration,
    })
  }, [])

  return {
    toast,
  }
}
