interface RubyProps {
  text: string
  reading: string
  fontSize?: number
}

export function Ruby({ text, reading, fontSize }: RubyProps) {
  return (
    <ruby style={{ fontSize }}>
      {text}
      <rt style={{ fontSize: fontSize ? fontSize * 0.45 : undefined }}>{reading}</rt>
    </ruby>
  )
}
