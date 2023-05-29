import { apply, call, put, takeLatest } from 'redux-saga/effects'

import { fetchProject, IProject, projectActions } from './slice'
import { validAPIResponse, validProjectData } from './utils'

interface IInitResponse {
  id: string
  modified: number
  name: string
}

function* fetchProjectSaga(action: ReturnType<typeof fetchProject>): Generator {
  yield put(projectActions.setLoading(true))
  let projectId = action.payload

  // If no projectId is provided, init a new one
  if (action.payload === '') {
    try {
      const response = (yield call(
        fetch,
        `http://recruitment01.vercel.app/api/init`,
      )) as Response

      if (!validAPIResponse(response)) {
        yield put(
          projectActions.setError(
            `HTTP error! status: ${response.status}. More info in the console.`,
          ),
        )
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = yield apply(response, 'json', [])

      projectId = (data as IInitResponse).id
    } catch (error) {
      console.error(error)
    }
  }

  // Fetch project data from BE by projectId
  try {
    const response = (yield call(
      fetch,
      `http://recruitment01.vercel.app/api/project/${projectId}`,
    )) as Response
    if (!validAPIResponse(response)) {
      yield put(
        projectActions.setError(
          `HTTP error! status: ${response.status}. More info in the console.`,
        ),
      )
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = (yield apply(response, 'json', [])) as IProject

    if (!validProjectData(data)) {
      yield put(projectActions.setError('Project data is invalid. Check BE response'))
      throw new Error('Project data is invalid. Check BE response')
    }

    yield put(projectActions.setProject(data))
    yield put(projectActions.setLoading(false))
  } catch (error) {
    console.error(error)
  }
}

export function* watcherProjectSaga() {
  yield takeLatest(fetchProject.type, fetchProjectSaga)
}

const projectSagas = watcherProjectSaga

export default projectSagas
