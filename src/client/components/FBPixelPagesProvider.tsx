import { useRouter } from "next/router"
import React, { useEffect } from "react"
import { fbPageView } from "../api/event"

type Props = {
  children: React.ReactNode
}

const FBPixelProvider = ({ children }: Props) => {
  const router = useRouter()

  useEffect(() => {
    fbPageView()

    router.events.on("routeChangeComplete", fbPageView)
    return () => {
      router.events.off("routeChangeComplete", fbPageView)
    }
  }, [router.events])

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>{children}</>
  )
}

export default FBPixelProvider
