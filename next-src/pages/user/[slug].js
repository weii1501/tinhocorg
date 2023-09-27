import React from 'react'
import BreadcrumbsContainer from '@/components/breadcrumbs/BreadcrumbsContainer'
import {
  Box,
  Container,
  Divider,
  Pagination,
  Stack,
  Tab,
  Tabs
} from '@mui/material'
import Iconify from '@/components/iconify'
import { styled, useTheme } from '@mui/material/styles'
import OutstandingActivity from '@/components/user/OutstandingActivity'
import { getActivity } from '@/apis/apis'
import ArticleItem from '@/components/articles/ArticleItem'
import { v4 as uuidv4 } from 'uuid'
import ThreadItem from '@/components/threads/ThreadItem'
import { useRouter } from 'next/router'

export async function getServerSideProps (context) {
  const { slug, type, page } = context.query
  // const { type } = context.params
  console.log(context)
  const id = slug.split('.').pop()
  const articles = await getActivity('articles', id, type === 'article' ? page : 1).then(res => res.data).catch(err => console.log(err))
  const threads = await getActivity('threads', id, type === 'thread' ? page : 1).then(res => res.data).catch(err => console.log(err))
  // console.log(threads)
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: 'Người dùng',
      url: '/user'
    }
  ]
  return {
    props: {
      type: type ?? 'article',
      articles,
      threads,
      breadcrumbs
    }
  }
}

function UserPage ({ breadcrumbs, articles, threads, type }) {
  const router = useRouter()
  const [value, setValue] = React.useState('articles')
  const [valueAll, setValueAll] = React.useState(type ?? 'article')
  const theme = useTheme()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeAll = (event, newValue) => {
    setValueAll(newValue)
    router.push(`/user/${router.query.slug}?type=${newValue}`)
  }

  const onChange = (event, page) => {
    router.push(`/user/${router.query.slug}?type=${router.query.type}&page=${page}`)
  }
  return (
    <>
      <BreadcrumbsContainer breadcrumbs={breadcrumbs} />
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='start' spacing={1} mb={2}>
          <Iconify icon='uiw:message' width={24} height={24} />
          <Styledh1>
            HOẠT ĐỘNG NỔI BẬT
          </Styledh1>
        </Stack>

        <Box sx={{ width: '100%' }}>
          <Tabs
            onChange={handleChange}
            value={value}
            aria-label='Tabs where each tab needs to be selected manually'
            sx={{
              minHeight: 'unset',
              '& .MuiTabs-indicator': {
                top: 0
              },
              '& .MuiTab-root': {
                minWidth: 'unset',
                minHeight: 'unset',
                fontWeight: 500,
                fontSize: '14px',
                padding: '8px 0',
                marginRight: '16px'
              }
            }}
          >
            <Tab value='articles' label='Bài viết' />
            <Tab value='threads' label='Câu hỏi' />
          </Tabs>
        </Box>
      </Container>

      <Container
        sx={{
          mb: 5
        }}
      >
        <OutstandingActivity value={value} />
      </Container>

      <Container>
        <Stack direction='row' alignItems='center' justifyContent='start' spacing={1} mb={2}>
          <Iconify icon='uiw:message' width={24} height={24} />
          <Styledh1>
            TẤT CẢ HOẠT ĐỘNG
          </Styledh1>
        </Stack>

        <Box sx={{ width: '100%' }}>
          <Tabs
            onChange={handleChangeAll}
            value={valueAll}
            aria-label='Tabs where each tab needs to be selected manually'
            sx={{
              minHeight: 'unset',
              '& .MuiTabs-indicator': {
                top: 0
              },
              '& .MuiTab-root': {
                minWidth: 'unset',
                minHeight: 'unset',
                fontWeight: 500,
                fontSize: '14px',
                padding: '8px 0',
                marginRight: '16px'
              }
            }}
          >
            <Tab value='article' label='Bài viết' />
            <Tab value='thread' label='Câu hỏi' />
          </Tabs>
        </Box>
        <Divider flexItem sx={{ borderColor: theme.palette.grey[200] }} />
      </Container>

      <Container>
        <Stack
          direction='column'
          spacing={3}
          alignItems='start'
          justifyContent='start'
          divider={<Divider flexItem sx={{ borderColor: theme.palette.grey[200] }} />}
        >
          {valueAll === 'article' && articles.data.map((article, index) => (
            <ArticleItem article={article} index={index} key={uuidv4()} />
          ))}

          {valueAll === 'thread' && threads.data.map((thread) => (
            <ThreadItem key={uuidv4()} thread={thread} />
          ))}

        </Stack>
        <Divider flexItem sx={{ borderColor: theme.palette.grey[200], marginTop: '32px' }} />
      </Container>

      <Container
        sx={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          pt: 1
        }}
      >
        <Stack spacing={2} my={1}>
          <Pagination
            count={type === 'article' ? articles.totalPages : threads.totalPages}
            shape='rounded'
            size='small'
            defaultPage={1}
            onChange={onChange}
            page={parseInt(router?.query?.page || 1)}
            sx={{
              '& .MuiPaginationItem-root': {
                color: theme.palette.grey[600]
              }
            }}
          />
        </Stack>
      </Container>
    </>
  )
}

export default UserPage

const Styledh1 = styled('h1')(({ theme }) => ({
  fontSize: '22px',
  fontWeight: 600,
  lineHeight: '40px',
  color: theme.palette.text.primary,
  marginBottom: '16px'
}))
