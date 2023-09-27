import React from 'react'
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
import { useRouter } from 'next/router'
import { getArticles, getCateogry, getThreads } from '@/apis/apis'
import { buildFullUrl } from '@/utils/utils'
import BreadcrumbsContainer from '@/components/breadcrumbs/BreadcrumbsContainer'
import ArticleItem from '@/components/articles/ArticleItem'
import { v4 as uuidv4 } from 'uuid'
import { styled, useTheme } from '@mui/material/styles'
import ThreadItem from '@/components/threads/ThreadItem'
import { Styledh1 } from '@/styles'
import { NextSeo } from 'next-seo'
import { BRAND_NAME, SITE_BASE_URL } from '@/constants'
import Filter from '@/components/filter'

export async function getServerSideProps (context) {
  const { topic, subcategory } = context.params
  const { page, filter } = context.query
  const subcategorydata = await getCateogry(subcategory).then(res => res.data.data).catch(err => console.log(err))
  const data = await getArticles(topic, page, filter).then(res => res.data)
  const threads = await getThreads(topic, page, filter).then(res => res.data)
  // console.log(data)
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: subcategorydata?.parent?.name,
      url: `/${subcategorydata?.parent?.slug}`
    },
    {
      label: subcategorydata?.name,
      url: `/${subcategorydata?.parent?.slug}/${subcategorydata?.slug}`
    },
    {
      label: data.topic?.title,
      url: `/${subcategorydata?.parent?.slug}/${subcategorydata?.slug}/${data.topic?.slug}`
    }
  ]

  return {
    props: {
      page: data.page,
      topic: data.topic,
      data: data.data,
      breadcrumbs,
      threads
    }
  }
}

function Index ({ page, topic, data, threads, breadcrumbs }) {
  const router = useRouter()
  const theme = useTheme()
  const [value, setValue] = React.useState('article')
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  // const [openThread, setOpenThread] = React.useState(false)
  const onChange = (event, value) => {
    // console.log(value)
    const path = router.asPath.split('?')[0]
    router.push(buildFullUrl(path, { page: value }))
  }

  return (
    <>
      <BreadcrumbsContainer breadcrumbs={breadcrumbs} />
      <NextSeo
        title={`${topic.title} - ${BRAND_NAME}`}
        description={topic.description ?? 'Đang cập nhật'}
        canonical={SITE_BASE_URL + router.asPath}
      />
      <Container
        sx={{
          mb: 3
        }}
      >
        <Stack direction='row' alignItems='center' justifyContent='start' spacing={1} mb={0} mt={1}>
          <Iconify icon={topic.icon ?? 'uiw:message'} width={24} height={24} />
          <Styledh1 sx={{ marginBottom: '4px' }}>
            Chủ đề: {topic.title} {topic?.otherName && topic?.otherName !== 'Đang cập nhật' && `(${topic?.otherName})`}
          </Styledh1>

        </Stack>
        <Styledp sx={{ marginBottom: '20px' }}>
          {topic.description}
        </Styledp>
        <Box sx={{ width: '100%' }}>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
            md={2}
          >
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
              <Tab value='article' label='Bài viết' />
              <Tab value='thread' label='Câu hỏi' />
            </Tabs>

            <Filter />
          </Stack>
        </Box>
        <Divider flexItem sx={{ mt: 1 }} />
      </Container>

      <Container>
        <Stack
          fullWidth
          direction='column'
          spacing={3}
          alignItems='start'
          justifyContent='start'
          divider={<Divider flexItem sx={{ borderColor: theme.palette.grey[200] }} />}
        >
          {value === 'article' && data.map((article, index) => (
            <ArticleItem article={article} index={index} key={uuidv4()} />
          ))}

          {value === 'thread' && threads.data.map((thread) => (
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
            count={page.totalPages}
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

export default Index

const Styledp = styled('p')(({ theme }) => ({
  fontSize: '14px'
}))
