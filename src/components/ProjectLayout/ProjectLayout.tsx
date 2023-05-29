import { IProject } from 'src/redux/project/slice'

import { SvgShape } from '..'

import '../../App.css'

interface ProjectLayoutProps {
  id: string
  width: number
  height: number
  items: IProject['project']['items']
}

const ProjectLayout = ({ id, width, height, items }: ProjectLayoutProps) => {
  if (!id) return null

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${width} ${height}`}
      >
        <rect
          fill="#efefef"
          width="100%"
          height="100%"
        />
        {items.map((item) => (
          <SvgShape
            key={`${item.id}-${item.type}-${item.rotation}`}
            {...item}
          />
        ))}
      </svg>
    </svg>
  )
}
export default ProjectLayout
