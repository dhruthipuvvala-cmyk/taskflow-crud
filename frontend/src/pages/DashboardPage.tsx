import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

import { useToast } from '../components/ui'
import { DashboardHeader } from '../components/dashboard/DashboardHeader'
import { StatsSection } from '../components/dashboard/StatsSection'
import { DeleteConfirmModal } from '../components/tasks/DeleteConfirmModal'
import { EmptyState } from '../components/tasks/EmptyState'
import { ErrorState } from '../components/tasks/ErrorState'
import { FilterBar, type TaskView } from '../components/tasks/FilterBar'
import { TaskCard } from '../components/tasks/TaskCard'
import { TaskFormModal } from '../components/tasks/TaskFormModal'
import { TaskListSkeleton } from '../components/tasks/TaskListSkeleton'
import { TaskTable } from '../components/tasks/TaskTable'
import { staggerContainer } from '../animations/variants'
import { useDebounce } from '../hooks/useDebounce'
import { useTasks } from '../hooks/useTasks'
import type { Priority, Status, Task, TaskInput } from '../types/task'

export function DashboardPage() {
  const { tasks, stats, loading, error, refetch, setQuery, createTask, updateTask, deleteTask } =
    useTasks()
  const toast = useToast()

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [ordering, setOrdering] = useState('-created_at')
  const [view, setView] = useState<TaskView>('cards')

  const [formOpen, setFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)

  useEffect(() => {
    setQuery({
      search: debouncedSearch || undefined,
      status: (status || undefined) as Status | undefined,
      priority: (priority || undefined) as Priority | undefined,
      ordering,
    })
  }, [debouncedSearch, status, priority, ordering, setQuery])

  const hasFilters = Boolean(debouncedSearch || status || priority)

  function openCreate() {
    setEditingTask(null)
    setFormOpen(true)
  }

  function openEdit(task: Task) {
    setEditingTask(task)
    setFormOpen(true)
  }

  async function handleSubmit(input: TaskInput) {
    if (editingTask) {
      await updateTask(editingTask.id, input)
      toast.push('success', 'Task updated')
    } else {
      await createTask(input)
      toast.push('success', 'Task created')
    }
    setFormOpen(false)
  }

  async function handleDelete(task: Task) {
    try {
      await deleteTask(task.id)
      toast.push('success', 'Task deleted')
    } catch {
      toast.push('error', 'Failed to delete task')
    } finally {
      setDeletingTask(null)
    }
  }

  function clearFilters() {
    setSearch('')
    setStatus('')
    setPriority('')
    setOrdering('-created_at')
  }

  const cards = (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onEdit={openEdit} onDelete={setDeletingTask} />
        ))}
      </AnimatePresence>
    </motion.div>
  )

  const content = loading ? (
    <TaskListSkeleton />
  ) : error ? (
    <ErrorState message={error} onRetry={refetch} />
  ) : tasks.length === 0 ? (
    <EmptyState filtered={hasFilters} onAdd={openCreate} onClear={clearFilters} />
  ) : view === 'table' ? (
    <>
      <div className="hidden md:block">
        <TaskTable tasks={tasks} onEdit={openEdit} onDelete={setDeletingTask} />
      </div>
      <div className="md:hidden">{cards}</div>
    </>
  ) : (
    cards
  )

  return (
    <div className="space-y-12">
      <DashboardHeader search={search} onSearchChange={setSearch} onAdd={openCreate} />
      <StatsSection stats={stats} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="space-y-6"
      >
        <FilterBar
          status={status}
          priority={priority}
          ordering={ordering}
          view={view}
          onStatusChange={setStatus}
          onPriorityChange={setPriority}
          onOrderingChange={setOrdering}
          onViewChange={setView}
        />
        {content}
      </motion.div>

      <TaskFormModal
        open={formOpen}
        task={editingTask}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />
      <DeleteConfirmModal
        task={deletingTask}
        onCancel={() => setDeletingTask(null)}
        onConfirm={handleDelete}
      />
    </div>
  )
}
