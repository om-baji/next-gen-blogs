import RichTextEditor from '@/components/Editor/RichTextEditor'
import Layout from '@/components/Sidebar'
import React from 'react'

const BlogEdit : React.FC = () => {
  return (
    <Layout children={<RichTextEditor />} />
  )
}

export default BlogEdit
