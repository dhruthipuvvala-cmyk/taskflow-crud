import { Badge } from '../ui'
import { PRIORITY, STATUS, type Priority, type Status } from '../../types/task'
import { PRIORITY_META, STATUS_META } from '../../utils/taskMeta'

export function StatusBadge({ status }: { status: Status }) {
  const meta = STATUS_META[status]
  return (
    <Badge tone={meta.tone} pulse={status === STATUS.IN_PROGRESS}>
      {meta.label}
    </Badge>
  )
}

export function PriorityBadge({ priority }: { priority: Priority }) {
  const meta = PRIORITY_META[priority]
  return (
    <Badge tone={meta.tone} glow={priority === PRIORITY.HIGH}>
      {meta.label}
    </Badge>
  )
}
