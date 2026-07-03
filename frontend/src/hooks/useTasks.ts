import { useCallback, useEffect, useState } from 'react'

import * as api from '../api/tasks'
import type { Task, TaskInput, TaskQuery, TaskStats } from '../types/task'

export interface UseTasksResult {
  tasks: Task[]
  stats: TaskStats | null
  loading: boolean
  error: string | null
  query: TaskQuery
  setQuery: (next: TaskQuery) => void
  refetch: () => Promise<void>
  createTask: (input: TaskInput) => Promise<Task>
  updateTask: (id: number, input: TaskInput) => Promise<Task>
  deleteTask: (id: number) => Promise<void>
}

/**
 * Central data hook: owns task list + stats, exposes CRUD actions that keep
 * both in sync. UI components never call the API layer directly.
 */
export function useTasks(initialQuery: TaskQuery = {}): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([])
  const [stats, setStats] = useState<TaskStats | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState<TaskQuery>(initialQuery)

  const load = useCallback(async (activeQuery: TaskQuery) => {
    setLoading(true)
    setError(null)
    try {
      const [taskList, taskStats] = await Promise.all([
        api.listTasks(activeQuery),
        api.getStats(),
      ])
      setTasks(taskList)
      setStats(taskStats)
    } catch {
      setError('Unable to reach the server. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    void load(query)
  }, [load, query])

  const refetch = useCallback(() => load(query), [load, query])

  const createTask = useCallback(
    async (input: TaskInput) => {
      const created = await api.createTask(input)
      await load(query)
      return created
    },
    [load, query],
  )

  const updateTask = useCallback(
    async (id: number, input: TaskInput) => {
      const updated = await api.updateTask(id, input)
      await load(query)
      return updated
    },
    [load, query],
  )

  const deleteTask = useCallback(
    async (id: number) => {
      const previous = tasks
      setTasks((list) => list.filter((task) => task.id !== id)) // optimistic
      try {
        await api.deleteTask(id)
        await load(query)
      } catch (err) {
        setTasks(previous) // rollback
        throw err
      }
    },
    [tasks, load, query],
  )

  return {
    tasks,
    stats,
    loading,
    error,
    query,
    setQuery,
    refetch,
    createTask,
    updateTask,
    deleteTask,
  }
}
