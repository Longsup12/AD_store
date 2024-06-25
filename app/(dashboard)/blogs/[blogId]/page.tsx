"use client"

import Loader from '@/components/custom ui/Loader'
import BlogForm from '@/components/blogs/BlogForm'
import React, { useEffect, useState } from 'react'

const BlogDetails = ({ params }: { params: { blogId: string }}) => {
  const [loading, setLoading] = useState(true)
  const [blogDetails, setBlogDetails] = useState<BlogType | null>(null)

  const getBlogDetails = async () => {
    try { 
      const res = await fetch(`/api/blogs/${params.blogId}`, {
        method: "GET"
      })
      const data = await res.json()
      setBlogDetails(data)
      setLoading(false)
    } catch (err) {
      console.log("[blogId_GET]", err)
    }
  }

  useEffect(() => {
    getBlogDetails()
  }, [])

  return loading ? <Loader /> : (
    <BlogForm initialData={blogDetails} />
  )
}

export default BlogDetails