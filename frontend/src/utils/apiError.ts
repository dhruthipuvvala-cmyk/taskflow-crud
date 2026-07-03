import axios from 'axios'

/**
 * Normalizes a DRF validation error response ({ field: ["msg", ...] }) into a
 * flat { field: "msg" } map the form can render. Returns {} for other errors.
 */
export function parseFieldErrors(error: unknown): Record<string, string> {
  if (
    axios.isAxiosError(error) &&
    error.response?.data &&
    typeof error.response.data === 'object'
  ) {
    const data = error.response.data as Record<string, unknown>
    const result: Record<string, string> = {}
    for (const [key, value] of Object.entries(data)) {
      result[key] = Array.isArray(value) ? String(value[0]) : String(value)
    }
    return result
  }
  return {}
}
