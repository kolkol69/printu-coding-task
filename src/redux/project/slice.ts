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
  loading?: boolean
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
  loading: false,
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
  },
})
export const fetchProject = createAction<string>('project/fetch')

export const projectActions = {
  fetchProject,
  ...projectSlice.actions,
}

export const projectReducer = projectSlice.reducer
