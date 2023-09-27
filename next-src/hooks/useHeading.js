import React from 'react'

export default function useHeadings () {
  const [headings, setHeadings] = React.useState([])
  React.useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3, h4'))
      .map((element) => ({
        id: element.id,
        text: element.textContent ?? '',
        level: Number(element.tagName.substring(1))
      }))
    setHeadings(elements)
  }, [])
  return headings
}
