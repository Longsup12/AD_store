"use client"

import { useEffect, useState } from "react"

import Loader from "@/components/custom ui/Loader"
import BannerForm from "@/components/banners/BannerForm"

const BannerDetails = ({ params }: { params: { bannerId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [bannerDetails, setBannerDetails] = useState<BannerType | null>(null)

  const getBannerDetails = async () => {
    try { 
      const res = await fetch(`/api/banners/${params.bannerId}`, {
        method: "GET"
      })
      const data = await res.json()
      setBannerDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[bannerId_GET]", err)
    }
  }

  useEffect(() => {
    getBannerDetails()
  }, [])

  return loading ? <Loader /> : (
    <BannerForm initialData={bannerDetails}/>
  )
}

export default BannerDetails