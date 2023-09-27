import React from 'react'
import { Divider, Stack } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import Link from 'next/link'

function TopicItem ({ topic, url }) {
  const theme = useTheme()
  const router = useRouter()
  const { category, subcategory } = router.query

  return (
    <>
      <Stack
        direction='row'
        spacing={0}
        alignItems='center'
        justifyContent='start'
        my={1}
      >
        <Stack
          direction='column'
          spacing={0}
          alignItems='start'
          justifyContent='start'
          sx={{
            width: {
              lg: 'calc(100% - 160px)',
              md: 'calc(100% - 160px)',
              sm: 'calc(100% - 160px)',
              xs: 'calc(100% - 120px)'
            }
          }}
        >
          <StyledTopic href={url ?? `/${category}/${subcategory}/${topic.slug}`}>
            {topic?.title ?? topic.name} {topic?.otherName && topic.otherName !== 'Đang cập nhật' && `(${topic?.otherName})`}
          </StyledTopic>

          <StyledDescription>
            {topic?.description ?? 'Chưa có mô tả'}
          </StyledDescription>
        </Stack>

        <StyledCellNumber>
          {topic?.numArticles ?? 0}
        </StyledCellNumber>
        <StyledCellNumber>
          {topic?.numThreads ?? 0}
        </StyledCellNumber>
      </Stack>

      <Divider flexItem sx={{ borderColor: theme.palette.grey[300] }} />
    </>
  )
}

export default TopicItem

const StyledDescription = styled('p')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '400',
  color: theme.palette.grey[600],
  width: '100% !important',
  margin: '0px'
}))

const StyledCellNumber = styled('span')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 'bold',
  color: theme.palette.grey[900],
  width: '80px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '60px'
  }
}))

const StyledTopic = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[900],
  textDecoration: 'none',
  width: '100%',
  fontSize: '16px',
  padding: 0,
  margin: 0,
  '&:hover': {
    color: theme.palette.primary.main
  }
}))
