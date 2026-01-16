import Link from "next/link"

export function HomepageFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/20 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-4">
              Mongodingo
            </div>
            <p className="text-sm text-muted-foreground">Технологийн карьер сургалтын платформ</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{"Product"}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/majors" className="text-muted-foreground hover:text-foreground transition-colors">
                  Мэргэжлүүд
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-muted-foreground hover:text-foreground transition-colors">
                  Хичээл
                </Link>
              </li>
              <li>
                <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
                  Боломжууд
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{"Company"}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Бидний тухай
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Холбоо барих
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Карьер
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{"Legal"}</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Үйлчилгээний нөхцөл
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Нууцлалын бодлого
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          © 2026 Mongodingo. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
