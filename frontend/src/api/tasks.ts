import { client } from './client'
import type {
  Paginated,
  Task,
  TaskInput,
  TaskQuery,
  TaskStats,
} from '../types/task'

const RESOURCE = 'tasks/'

/** GET /tasks/ — returns the (unwrapped) list, honoring search/filter/sort. */
export async function listTasks(query: TaskQuery = {}, signal?: AbortSignal): Promise<Task[]> {
  const { data } = await client.get<Paginated<Task>>(RESOURCE, { params: query, signal })
  return data.results
}

/** GET /tasks/:id/ */
export async function getTask(id: number): Promise<Task> {
  const { data } = await client.get<Task>(`${RESOURCE}${id}/`)
  return data
}

/** POST /tasks/ */
export async function createTask(input: TaskInput): Promise<Task> {
  const { data } = await client.post<Task>(RESOURCE, input)
  return data
}

/** PUT /tasks/:id/ (full update) */
export async function updateTask(id: number, input: TaskInput): Promise<Task> {
  const { data } = await client.put<Task>(`${RESOURCE}${id}/`, input)
  return data
}

/** PATCH /tasks/:id/ (partial update) */
export async function patchTask(id: number, partial: Partial<TaskInput>): Promise<Task> {
  const { data } = await client.patch<Task>(`${RESOURCE}${id}/`, partial)
  return data
}

/** DELETE /tasks/:id/ */
export async function deleteTask(id: number): Promise<void> {
  await client.delete(`${RESOURCE}${id}/`)
}

/** GET /tasks/stats/ */
export async function getStats(signal?: AbortSignal): Promise<TaskStats> {
  const { data } = await client.get<TaskStats>(`${RESOURCE}stats/`, { signal })
  return data
}
