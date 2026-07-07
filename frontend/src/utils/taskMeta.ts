import type { BadgeTone } from '../components/ui'
import { PRIORITY, STATUS, type Priority, type Status } from '../types/task'

export interface MetaEntry {
  label: string
  tone: BadgeTone
}

export const STATUS_META: Record<Status, MetaEntry> = {
  [STATUS.TODO]: { label: 'To Do', tone: 'slate' },
  [STATUS.IN_PROGRESS]: { label: 'In Progress', tone: 'amber' },
  [STATUS.DONE]: { label: 'Done', tone: 'teal' },
}

export const PRIORITY_META: Record<Priority, MetaEntry> = {
  [PRIORITY.LOW]: { label: 'Low', tone: 'slate' },
  [PRIORITY.MEDIUM]: { label: 'Medium', tone: 'amber' },
  [PRIORITY.HIGH]: { label: 'High', tone: 'ember' },
}

export const STATUS_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All statuses' },
  { value: STATUS.TODO, label: 'To Do' },
  { value: STATUS.IN_PROGRESS, label: 'In Progress' },
  { value: STATUS.DONE, label: 'Done' },
]

export const PRIORITY_OPTIONS: { value: string; label: string }[] = [
  { value: '', label: 'All priorities' },
  { value: PRIORITY.LOW, label: 'Low' },
  { value: PRIORITY.MEDIUM, label: 'Medium' },
  { value: PRIORITY.HIGH, label: 'High' },
]

export const ORDERING_OPTIONS: { value: string; label: string }[] = [
  { value: '-created_at', label: 'Newest first' },
  { value: 'created_at', label: 'Oldest first' },
  { value: 'due_date', label: 'Due date' },
  { value: 'title', label: 'Title (A–Z)' },
  { value: 'priority', label: 'Priority' },
]
