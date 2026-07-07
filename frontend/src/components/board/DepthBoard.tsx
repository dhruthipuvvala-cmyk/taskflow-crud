import { Lane } from './Lane'
import { STATUS, type Status, type Task } from '../../types/task'

const LANES: Status[] = [STATUS.TODO, STATUS.IN_PROGRESS, STATUS.DONE]

interface DepthBoardProps {
  tasks: Task[]
  onSelect: (task: Task) => void
}

export function DepthBoard({ tasks, onSelect }: DepthBoardProps) {
  const grouped: Record<Status, Task[]> = {
    [STATUS.TODO]: [],
    [STATUS.IN_PROGRESS]: [],
    [STATUS.DONE]: [],
  }
  for (const task of tasks) grouped[task.status].push(task)

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {LANES.map((status) => (
        <Lane key={status} status={status} tasks={grouped[status]} onSelect={onSelect} />
      ))}
    </div>
  )
}
