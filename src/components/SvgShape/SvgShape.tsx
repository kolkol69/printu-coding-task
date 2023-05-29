import React from 'react'

interface SvgElementProps {
  id: string
  type: 'rectangle' | 'ellipse'
  color: string
  rotation: number
  x: number
  y: number
  width: number
  height: number
}

const hex2rgb = (hex: string): Record<string, number> => {
  const rgbChar: string[] = ['r', 'g', 'b']

  const normal = hex.match(/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i)
  if (normal) {
    return normal.slice(1).reduce<Record<string, number>>((a, e, i) => {
      a[rgbChar[i]] = parseInt(e, 16)
      return a
    }, {})
  }

  const shorthand = hex.match(/^#([0-9a-f])([0-9a-f])([0-9a-f])$/i)
  if (shorthand) {
    return shorthand.slice(1).reduce<Record<string, number>>((a, e, i) => {
      a[rgbChar[i]] = 0x11 * parseInt(e, 16)
      return a
    }, {})
  }

  return {
    r: 0,
    g: 0,
    b: 0,
  }
}

const SvgElement: React.FC<SvgElementProps> = ({
  id,
  type,
  color,
  rotation,
  x,
  y,
  width,
  height,
}) => {
  const rotate = `rotate(${rotation}, ${x}, ${y})`

  const { r, g, b } = hex2rgb(color)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  // Choose text color based on brightness
  const textColor = brightness > 200 ? 'black' : 'white'

  const rotationRadians = (rotation * Math.PI) / 180
  const boundingWidth =
    Math.abs(width * Math.cos(rotationRadians)) +
    Math.abs(height * Math.sin(rotationRadians))
  const boundingHeight =
    Math.abs(height * Math.cos(rotationRadians)) +
    Math.abs(width * Math.sin(rotationRadians))

  const shape =
    type === 'rectangle' ? (
      <rect
        id={id}
        x={x - width / 2}
        y={y - height / 2}
        width={width}
        height={height}
        fill={color}
        transform={rotate}
      />
    ) : (
      <ellipse
        id={id}
        cx={x}
        cy={y}
        rx={width / 2}
        ry={height / 2}
        fill={color}
        transform={rotate}
      />
    )

  const boundingBox = (
    <rect
      x={x - boundingWidth / 2}
      y={y - boundingHeight / 2}
      width={boundingWidth}
      height={boundingHeight}
      fill="transparent"
      stroke="red"
      strokeWidth="1"
    />
  )

  return (
    <svg>
      {boundingBox}
      {shape}
      <circle
        cx={x}
        cy={y}
        r={4}
        fill={textColor}
      />
      <text
        x={x + 25}
        y={y - 3}
        textAnchor="middle"
        fontSize={16}
        fontWeight={600}
        fill={textColor}
      >
        {`${rotation}°`}
      </text>
    </svg>
  )
}

export default SvgElement
