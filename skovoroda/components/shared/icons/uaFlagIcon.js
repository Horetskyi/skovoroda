
export default function UkranianFlagIcon({ width = 18, height = 12 }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height}>
    <rect width={width} height={height/2} fill="#1993FF"/>
    <rect width={width} height={height/2} y={height/2} fill="#FFD500"/>
  </svg>
}