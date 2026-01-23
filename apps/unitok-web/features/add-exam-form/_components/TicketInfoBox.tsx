import { Ticket } from "lucide-react"

interface TicketInfoBoxProps {
  visible: boolean
}

export function TicketInfoBox({ visible }: TicketInfoBoxProps) {
  if (!visible) return null

  return (
    <div className="bg-muted/50 rounded-lg p-4 border border-border space-y-3">
      <div className="flex items-start gap-3">
        <Ticket className="h-5 w-5 text-foreground mt-0.5" />
        <div className="flex-1 space-y-2">
          <h3 className="text-sm font-semibold text-foreground">Шалгалтын мэдээлэл нэмэх</h3>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Та шалгалтын мэдээлэл оруулснаар 10 оноо авах болно. Мэдээлэл нь бусад оюутнуудад харагдана.
          </p>
          <ul className="space-y-1 text-xs text-muted-foreground leading-relaxed">
            <li>• Засварлах болон устгах боломжгүй</li>
            <li>• Үнэн зөв мэдээлэл оруулна уу</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
