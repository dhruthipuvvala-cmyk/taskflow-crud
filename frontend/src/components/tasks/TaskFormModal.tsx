import { useEffect, useState, type FormEvent } from 'react'

import { Button, Input, Modal, Select, Spinner, Textarea } from '../ui'
import { parseFieldErrors } from '../../utils/apiError'
import {
  PRIORITY,
  STATUS,
  type Priority,
  type Status,
  type Task,
  type TaskInput,
} from '../../types/task'

interface TaskFormModalProps {
  open: boolean
  task: Task | null // null => create mode
  onClose: () => void
  onSubmit: (input: TaskInput) => Promise<void>
}

const EMPTY_FORM: TaskInput = {
  title: '',
  description: '',
  status: STATUS.TODO,
  priority: PRIORITY.MEDIUM,
  due_date: null,
}

export function TaskFormModal({ open, task, onClose, onSubmit }: TaskFormModalProps) {
  const [form, setForm] = useState<TaskInput>(EMPTY_FORM)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    if (!open) return
    setErrors({})
    setSubmitting(false)
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        due_date: task.due_date,
      })
    } else {
      setForm(EMPTY_FORM)
    }
  }, [open, task])

  function set<K extends keyof TaskInput>(key: K, value: TaskInput[K]) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!form.title.trim()) {
      setErrors({ title: 'Title is required.' })
      return
    }
    setSubmitting(true)
    setErrors({})
    try {
      await onSubmit({
        ...form,
        title: form.title.trim(),
        due_date: form.due_date || null,
      })
    } catch (error) {
      setErrors(parseFieldErrors(error))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Modal open={open} onClose={onClose} title={task ? 'Edit Task' : 'Create Task'}>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <Input
          label="Title"
          value={form.title}
          onChange={(event) => set('title', event.target.value)}
          error={errors.title}
          placeholder="e.g. Prepare release notes"
          autoFocus
        />
        <Textarea
          label="Description"
          rows={3}
          value={form.description}
          onChange={(event) => set('description', event.target.value)}
          error={errors.description}
          placeholder="Optional details…"
        />
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Status"
            value={form.status}
            onChange={(event) => set('status', event.target.value as Status)}
          >
            <option value={STATUS.TODO}>To Do</option>
            <option value={STATUS.IN_PROGRESS}>In Progress</option>
            <option value={STATUS.DONE}>Done</option>
          </Select>
          <Select
            label="Priority"
            value={form.priority}
            onChange={(event) => set('priority', event.target.value as Priority)}
          >
            <option value={PRIORITY.LOW}>Low</option>
            <option value={PRIORITY.MEDIUM}>Medium</option>
            <option value={PRIORITY.HIGH}>High</option>
          </Select>
        </div>
        <Input
          label="Due date"
          type="date"
          value={form.due_date ?? ''}
          onChange={(event) => set('due_date', event.target.value || null)}
          error={errors.due_date}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" size="sm" disabled={submitting}>
            {submitting && <Spinner />}
            {task ? 'Save changes' : 'Create task'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}
