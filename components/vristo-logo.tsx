import type React from "react"
import Image from "next/image"

export function VristoLogo(_props: React.SVGProps<SVGSVGElement>) {
  return (
    <div className="flex items-center gap-2 mb-0">
      <Image src="/logo.svg" alt="Logo" width={32} height={32} />
      <span className="text-xl font-bold">Vristo</span>
    </div>
  )
}
