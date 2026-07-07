import { useEffect, useState } from 'react'

import { useToast } from '../components/ui'
import { AppShell } from '../layouts/AppShell'
import { Pulse } from '../components/board/Pulse'
import { DepthBoard } from '../components/board/DepthBoard'
import { BoardError, BoardSkeleton, EmptyBoard } from '../components/board/BoardStates'
import { CommandPalette } from '../components/board/CommandPalette'
import { PeekPanel } from '../components/board/PeekPanel'
import { TaskFormModal } from '../components/tasks/TaskFormModal'
import { DeleteConfirmModal } from '../components/tasks/DeleteConfirmModal'
import { useDebounce } from '../hooks/useDebounce'
import { useTasks } from '../hooks/useTasks'
import type { Priority, Task, TaskInput } from '../types/task'

export function Console() {
  const { tasks, stats, loading, error, refetch, setQuery, createTask, updateTask, deleteTask } =
    useTasks()
  const toast = useToast()

  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search, 300)
  const [priority, setPriority] = useState('')
  const [ordering, setOrdering] = useState('-created_at')

  const [paletteOpen, setPaletteOpen] = useState(false)
  const [selected, setSelected] = useState<Task | null>(null)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Task | null>(null)
  const [deleting, setDeleting] = useState<Task | null>(null)

  useEffect(() => {
    setQuery({
      search: debouncedSearch || undefined,
      priority: (priority || undefined) as Priority | undefined,
      ordering,
    })
  }, [debouncedSearch, priority, ordering, setQuery])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPaletteOpen((open) => !open)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const hasFilters = Boolean(debouncedSearch || priority)

  function openCreate() {
    setEditing(null)
    setFormOpen(true)
  }

  function openEdit(task: Task) {
    setSelected(null)
    setEditing(task)
    setFormOpen(true)
  }

  async function handleSubmit(input: TaskInput) {
    if (editing) {
      await updateTask(editing.id, input)
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
      setDeleting(null)
      setSelected(null)
    }
  }

  function clearFilters() {
    setSearch('')
    setPriority('')
    setOrdering('-created_at')
  }

  return (
    <AppShell onCreate={openCreate} onOpenCommand={() => setPaletteOpen(true)}>
      <div className="space-y-8">
        <Pulse stats={stats} onCreate={openCreate} onOpenCommand={() => setPaletteOpen(true)} />

        {loading ? (
          <BoardSkeleton />
        ) : error ? (
          <BoardError message={error} onRetry={refetch} />
        ) : tasks.length === 0 ? (
          <EmptyBoard filtered={hasFilters} onCreate={openCreate} onClear={clearFilters} />
        ) : (
          <DepthBoard tasks={tasks} onSelect={setSelected} />
        )}
      </div>

      <CommandPalette
        open={paletteOpen}
        onClose={() => setPaletteOpen(false)}
        search={search}
        onSearchChange={setSearch}
        priority={priority}
        onPriorityChange={setPriority}
        ordering={ordering}
        onOrderingChange={setOrdering}
        tasks={tasks}
        onSelect={setSelected}
        onCreate={openCreate}
      />
      <PeekPanel task={selected} onClose={() => setSelected(null)} onEdit={openEdit} onDelete={setDeleting} />
      <TaskFormModal
        open={formOpen}
        task={editing}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />
      <DeleteConfirmModal
        task={deleting}
        onCancel={() => setDeleting(null)}
        onConfirm={handleDelete}
      />
    </AppShell>
  )
}
