'use client'

import React, { useContext, useEffect, useState } from 'react'
import { Box, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
import { getHotTags } from '@/apis/apis'
import { StyledTag } from '@/components/articles/styles'
import { Context } from '@/hooks/context'
import TableOfContents from '@/components/threads/TableOfContents'
import { useRouter } from 'next/router'

function SidebarRight () {
  const router = useRouter()
  const [hotTags, setHotTags] = useState([])
  const { tableOfContents } = useContext(Context)
  useEffect(() => {
    getHotTags().then(res => setHotTags(res.data)).catch(err => console.log(err))
  }, [])
  // console.log(tableOfContents)
  console.log(router)

  return (
    <Box
      component='div'
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: 'calc(100%/12 * 2 - 14px)' },
        backgroundColor: 'transparent',
        height: '100%',
        position: 'fixed !important',
        paddingTop: '80px',
        paddingLeft: '8px',
        zIndex: 1,
        display: {
          lg: 'flex',
          md: 'none',
          sm: 'none',
          xs: 'none'
        },
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}
    >
      {router.pathname !== '/article/[article]' && (
        <>
          <StyledTitle>
            Chủ đề nổi bật
          </StyledTitle>

          <StyledTitle>
            Thẻ nổi bật
          </StyledTitle>
          <Stack
            direction='row'
            spacing={1}
            alignItems='start'
            justifyContent='start'
            flexWrap='wrap'
            useFlexGap
          >
            {hotTags?.map((tag, index) => (
              <StyledTag key={index} href={`/tag/${tag.slug}`}>
                {tag?.name}
              </StyledTag>
            ))}
          </Stack>
        </>
      )}

      {router.pathname === '/article/[article]' && <TableOfContents data={tableOfContents} />}
    </Box>
  )
}

export default SidebarRight

const StyledTitle = styled('span')(({ theme }) => ({
  fontSize: '20px',
  fontWeight: 'bold',
  color: theme.palette.grey[900],
  marginBottom: '16px'
}))
