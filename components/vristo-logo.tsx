import type React from "react";
import Image from "next/image";
import clsx from "clsx";

interface VristoLogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: number;
}

export function VristoLogo({
  size = 50,
  className,
  ...props
}: VristoLogoProps) {
  return (
    <div className={clsx("flex items-center gap-2", className)} {...props}>
      <Image src="/logo.svg" alt="Logo" width={size} height={size} />
      <span className="text-3xl font-bold">Vristo</span>
    </div>
  );
}
