"use client"

import { useCallback, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const links = [
  { label: "home", href: "/" },
  { label: "career", href: "/career" },
  { label: "contact", href: "/contact" },
]

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/"
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteNav() {
  const pathname = usePathname() ?? "/"
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (typeof window === "undefined") return
    const audio = new Audio("/pop.mp3")
    audio.volume = 0.5
    audio.preload = "auto"
    audioRef.current = audio
  }, [])

  const playPop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = 0
    audio.play().catch(() => null)
  }, [])

  return (
    <nav className="flex gap-5.5" aria-label="Primary">
      {links.map((link) => {
        const active = isActive(pathname, link.href)
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={playPop}
            aria-current={active ? "page" : undefined}
            className={cn("nav-link", active && "active")}
          >
            {link.label}
          </Link>
        )
      })}
    </nav>
  )
}
