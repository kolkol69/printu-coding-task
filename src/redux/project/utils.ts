import { IProject } from './slice'

const isValidData = (data: IProject) => {
  if (!data || typeof data !== 'object') return false
  if (!data.id || typeof data.id !== 'string') return false

  if (!data.project || typeof data.project !== 'object') return false
  if (!data.project.id || typeof data.project.id !== 'string') return false
  if (!data.project.name || typeof data.project.name !== 'string') return false
  if (!data.project.width || typeof data.project.width !== 'number') return false
  if (!data.project.height || typeof data.project.height !== 'number') return false
  if (!Array.isArray(data.project.items)) return false

  for (const item of data.project.items) {
    if (!item || typeof item !== 'object') return false
    if (!item.id || typeof item.id !== 'string') return false
    if (!item.type || (item.type !== 'ellipse' && item.type !== 'rectangle')) return false
    if (!item.color || typeof item.color !== 'string') return false
    if (typeof item.rotation !== 'number') return false
    if (typeof item.x !== 'number') return false
    if (typeof item.y !== 'number') return false
    if (typeof item.width !== 'number' || item.width < 0) return false
    if (typeof item.height !== 'number' || item.height < 0) return false
  }

  return true
}

export const validProjectData = (data: IProject) => {
  if (!isValidData(data)) {
    return false
  }
  return true
}

export const validAPIResponse = (response: Response) => {
  if (!response.ok) {
    return false
  }
  return true
}
