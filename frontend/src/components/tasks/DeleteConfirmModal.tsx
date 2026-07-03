import { useState } from 'react'

import { Button, Modal, Spinner } from '../ui'
import type { Task } from '../../types/task'

interface DeleteConfirmModalProps {
  task: Task | null // truthy => open
  onCancel: () => void
  onConfirm: (task: Task) => Promise<void>
}

export function DeleteConfirmModal({ task, onCancel, onConfirm }: DeleteConfirmModalProps) {
  const [busy, setBusy] = useState(false)

  async function handleConfirm() {
    if (!task) return
    setBusy(true)
    try {
      await onConfirm(task)
    } finally {
      setBusy(false)
    }
  }

  return (
    <Modal open={Boolean(task)} onClose={onCancel} title="Delete task">
      <p className="text-sm text-slate-400">
        Are you sure you want to delete{' '}
        <span className="font-medium text-white">“{task?.title}”</span>? This action cannot be
        undone.
      </p>
      <div className="mt-5 flex justify-end gap-2">
        <Button variant="ghost" size="sm" onClick={onCancel} disabled={busy}>
          Cancel
        </Button>
        <Button variant="danger" size="sm" onClick={handleConfirm} disabled={busy}>
          {busy && <Spinner />}
          Delete
        </Button>
      </div>
    </Modal>
  )
}
