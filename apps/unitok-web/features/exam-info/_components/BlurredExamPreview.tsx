type BlurredExamPreviewProps = {
  content: string
}

export function BlurredExamPreview({ content }: BlurredExamPreviewProps) {
  return (
    <div className="relative px-4 py-3 border-t border-border/50">
      <p className="text-sm text-foreground/80 leading-relaxed select-none">{content.substring(0, 55)}...</p>
      <div className="absolute inset-0 backdrop-blur-[3px] bg-background/30" />
    </div>
  )
}
