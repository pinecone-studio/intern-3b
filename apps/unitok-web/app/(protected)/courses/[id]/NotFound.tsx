import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background max-w-md mx-auto px-4 text-center">
      <h2 className="text-xl font-semibold text-foreground mb-2">Хичээл олдсонгүй</h2>
      <p className="text-sm text-muted-foreground mb-4">Уучлаарай, энэ хичээл байхгүй байна.</p>
      <Link
        href="/"
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
      >
        Нүүр хуудас руу буцах
      </Link>
    </div>
  )
}
