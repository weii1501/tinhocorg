'use client'

import React, { useEffect } from 'react'
// import { selectWord } from '@uiw/react-md-editor'
import MDEditor from '@uiw/react-md-editor';
// import '@uiw/react-md-editor/dist/markdown-editor.css';
// import '@uiw/react-markdown-preview/dist/markdown.css';

const mkdStr = `
# Markdown Editor

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/1680273?s=80&v=4)](https://avatars.githubusercontent.com/u/1680273?v=4)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';

\`\`\`
`

function MarkdownEditor () {
  const [value, setValue] = React.useState(mkdStr)
  return (
    <div className='container'>
      <h3>Auto</h3>
      <MDEditor height={200} value={value} onChange={setValue} />
    </div>
  )
}

export default MarkdownEditor
