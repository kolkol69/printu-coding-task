import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IProject {
  id: string
  project: {
    id: string
    name: string
    width: number
    height: number
    items: Array<{
      id: string
      type: 'ellipse' | 'rectangle'
      color: string
      rotation: number
      x: number
      y: number
      width: number
      height: number
    }>
  }
}

export interface IProjectState extends IProject {
  error?: string | null
}

const initialState: IProjectState = {
  id: '',
  project: {
    id: '',
    name: '',
    width: 0,
    height: 0,
    items: [],
  },
  error: null,
}

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    setProject: (state, action: PayloadAction<IProjectState>) => {
      return action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})
export const fetchProject = createAction<string>('project/fetch')

export const projectActions = {
  fetchProject,
  ...projectSlice.actions,
}

export const projectReducer = projectSlice.reducer
