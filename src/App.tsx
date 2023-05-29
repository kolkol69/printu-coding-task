import { useRef } from 'react'

import { useAppDispatch, useAppSelector } from './redux/hooks'
import { projectActions } from './redux/project/slice'
import { ProjectLayout } from './components'

import './App.css'

function App(): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const {
    error,
    project: { id, name, height, width, items },
  } = useAppSelector((state) => state.project)

  const fetchProject = (e: any): void => {
    e.preventDefault()
    dispatch(
      projectActions.fetchProject(
        inputRef.current?.value ?? 'cli7q5luv000f08la79tb11ft-7582381401368183',
      ),
    )
  }

  return (
    <div className="container">
      <div className="description">
        <div className="description-details">
          <label htmlFor="input">Project ID:</label>
          <input
            id="input"
            placeholder="leave empty for random"
            onChange={(e: any) => {
              if (inputRef.current) {
                inputRef.current.value = e.target.value
              }
            }}
            ref={inputRef}
          />
          <button onClick={fetchProject}>Fetch</button>
        </div>
        <div className="description-details">
          Name:<b>{name}</b>
        </div>
        <div className="description-details">
          ID:
          <input
            readOnly
            value={id}
          />
        </div>
      </div>
      <div id="project">
        {error != null ? (
          <div>Something went wrong. Error: {error}</div>
        ) : (
          <ProjectLayout
            key={id}
            id={id}
            width={width}
            height={height}
            items={items}
          />
        )}
      </div>
    </div>
  )
}

export default App
