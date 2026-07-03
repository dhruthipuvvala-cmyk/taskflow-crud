import { Badge } from '../ui'
import { PRIORITY_META, STATUS_META } from '../../utils/taskMeta'
import type { Priority, Status } from '../../types/task'

export function StatusBadge({ status }: { status: Status }) {
  const meta = STATUS_META[status]
  return <Badge tone={meta.tone}>{meta.label}</Badge>
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const meta = PRIORITY_META[priority]
  return <Badge tone={meta.tone}>{meta.label}</Badge>
}
