import React from 'react'
import { Box, Divider, Stack, Typography } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import Link from 'next/link'
import NoSSR from '@/components/NoSSR'
import { styled } from '@mui/material/styles'
import useHeadings from '@/hooks/useHeading'
import useScrollSpy from '@/hooks/useScrollSpy'

function TableOfContents ({ data }) {
  // const headingElements = document.querySelectorAll('[type="heading"]')
  // if (headingElements) {
  //   headingElements.forEach((element) => {
  //     console.log(element.id)
  //     window.scrollTo({
  //       top: document.getElementById(element.id).getBoundingClientRect().top - 90,
  //       behavior: 'smooth'
  //     })
  //   })
  // }
  const headings = useHeadings()
  console.log(headings)
  const activeId = useScrollSpy(
    headings.map(({ id }) => id),
    { rootMargin: '0% 0% -94% 0%' }
  )

  const scrolltoId = (event, id) => {
    event.preventDefault()
    const access = document.getElementById(id)
    window.scrollTo({
      top: access.getBoundingClientRect().top + window.scrollY - 70,
      behavior: 'smooth'
    })
  }

  return (
    <Box
      component='nav'
      sx={{
        display: 'flex',
        // position: 'absolute',
        width: '100%',
        p: 2,
        transform: 'translateY(-20px)'
      }}
    >
      <Stack
        direction='column'
        alignItems='start'
        sx={{ width: '100%' }}
      >
        <Typography variant='h6' gutterBottom>
          Nội dung
        </Typography>
        <Divider flexItem mb={2} />
        {/* <HTMLCanvas htmlContent={data?.content} /> */}
        {headings && headings?.map(heading => (
          <Typography
            key={uuidv4()}
            variant='body2'
            sx={{
              pl: heading.level === 2 ? 0 : heading.level === 3 ? 2 : 4
            }}
          >
            <StyledLinkContent
              href={`#${heading.id}`}
              onClick={(event) => scrolltoId(event, heading.id)}
              sx={{
                color: activeId === heading.id ? 'primary.main' : 'grey.900',
                fontWeight: activeId === heading.id ? '600' : '400'
              }}
            >
              {heading.text}
            </StyledLinkContent>
          </Typography>
        ))}
      </Stack>
    </Box>
  )
}

export default NoSSR(TableOfContents)

const StyledLinkContent = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.grey[900],
  '&:hover': {
    color: theme.palette.primary.main
  }
}))
