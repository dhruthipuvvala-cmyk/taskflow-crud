import { useCallback, useEffect, useRef, useState } from 'react'

import * as api from '../api/tasks'
import type { Task, TaskInput, TaskQuery, TaskStats } from '../types/task'

/** Retry the initial/read load a few times so a cold (sleeping) backend
 *  wakes up before we ever surface an error. */
const MAX_ATTEMPTS = 6
const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms))
const backoff = (attempt: number) => Math.min(1500 * 2 ** (attempt - 1), 8000)

export interface UseTasksResult {
  tasks: Task[]
  stats: TaskStats | null
  loading: boolean
  /** True while retrying a slow/cold server — show a friendly "waking up" state. */
  waking: boolean
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
 *
 * The read path is race-safe (only the latest run may commit state, older
 * runs are aborted) and cold-start tolerant (retries with backoff before it
 * ever reports an error).
 */
export function useTasks(initialQuery: TaskQuery = {}): UseTasksResult {
  const [tasks, setTasks] = useState<Task[]>([])
  const [stats, setStats] = useState<TaskStats | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [waking, setWaking] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState<TaskQuery>(initialQuery)

  const runIdRef = useRef(0)
  const abortRef = useRef<AbortController | null>(null)

  const load = useCallback(async (activeQuery: TaskQuery) => {
    // Supersede any in-flight load: bump the token and abort its requests.
    const runId = ++runIdRef.current
    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller
    const isCurrent = () => runId === runIdRef.current

    setLoading(true)
    setError(null)
    setWaking(false)

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
      try {
        const [taskList, taskStats] = await Promise.all([
          api.listTasks(activeQuery, controller.signal),
          api.getStats(controller.signal),
        ])
        if (!isCurrent()) return // a newer load took over — drop this result
        setTasks(taskList)
        setStats(taskStats)
        setWaking(false)
        setLoading(false)
        return
      } catch {
        // Superseded or aborted: stay silent, the newer run owns the state.
        if (!isCurrent() || controller.signal.aborted) return
        if (attempt >= MAX_ATTEMPTS) {
          setError('Unable to reach the server. Please try again.')
          setWaking(false)
          setLoading(false)
          return
        }
        // Still trying — the server is likely cold/waking up, not broken.
        setWaking(true)
        await sleep(backoff(attempt))
        if (!isCurrent()) return
      }
    }
  }, [])

  useEffect(() => {
    void load(query)
    return () => abortRef.current?.abort()
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
    waking,
    error,
    query,
    setQuery,
    refetch,
    createTask,
    updateTask,
    deleteTask,
  }
}
