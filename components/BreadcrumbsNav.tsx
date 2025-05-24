"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const BreadcrumbsNav = () => {
  const pathname = usePathname();

  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  const breadcrumbs = segments.map((segment, i) => {
    const href = "/" + segments.slice(0, i + 1).join("/");
    const isLast = i === segments.length - 1;
    const label = decodeURIComponent(segment.charAt(0).toUpperCase() + segment.slice(1));

    return isLast ? (
      <span key={href} className="text-sm font-medium text-muted-foreground dark:text-gray-300">
        {label}
      </span>
    ) : (
      <Link
        key={href}
        href={href}
        className="text-sm text-gray-500 dark:text-gray-400 hover:underline"
      >
        {label}
      </Link>
    );
  });

  return (
    <div className="w-full py-3 flex justify-center">
      <div className="max-w-5xl w-full px-4">
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
          classes={{ separator: "text-gray-400 dark:text-gray-500" }}
        >
          <Link
            href="/"
            className="flex items-center text-sm text-gray-500 dark:text-gray-400 hover:underline"
          >
            <HomeIcon fontSize="small" className="mr-1" />
            Home
          </Link>
          {breadcrumbs}
        </Breadcrumbs>
      </div>
    </div>
  );
};

export default BreadcrumbsNav;
