"use client"

import { usePathname } from "next/navigation"
import { FC, useEffect } from "react"
import { pageview } from "../api"

const FBPixelAppRouterProvider: FC = () => {
  const pathname = usePathname()

  useEffect(() => {
    pageview()
  }, [pathname])

  return null
}

export default FBPixelAppRouterProvider
