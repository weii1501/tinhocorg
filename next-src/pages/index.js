import React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import {
  Box,
  Container,
  Divider,
  Pagination,
  Stack,
  Tab,
  Tabs
} from '@mui/material'
import {
  BRAND_NAME,
  HOME_DESCRIPTION,
  HOME_TITLE,
  SITE_BASE_URL
} from '@/constants'
import { NextSeo } from 'next-seo'
import BreadcrumbsContainer from '@/components/breadcrumbs/BreadcrumbsContainer'
import Iconify from '@/components/iconify'
import { getArticlesLastUpload, getThreadsLastUpload } from '@/apis/apis'
// import ArticleItem from '@/components/articles/ArticleItem'
import { v4 as uuidv4 } from 'uuid'
import { TopicCommentsListLoader } from '@/loaders'
// import ThreadItem from '@/components/threads/ThreadItem'
import ArticleItem from '@/components/articles/ArticleItem'
import ThreadItem from '@/components/threads/ThreadItem'
import { useRouter } from 'next/router'
import { buildFullUrl } from '@/utils/utils'
import Link from 'next/link'
import { PaginationItem } from '@mui/lab'
import Filter from '@/components/filter'

export async function getServerSideProps (context) {
  const { page, filter } = context.query
  const articles = await getArticlesLastUpload(page, filter).then(res => res.data).catch(err => [])
  const threads = await getThreadsLastUpload(page, filter).then(res => res.data).catch(err => [])
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    }
  ]
  return {
    props: {
      breadcrumbs,
      articles,
      threads
    }
  }
}

function Index ({ breadcrumbs, articles: articlesProps, threads: threadsProps }) {
  // console.log(articles)
  const router = useRouter()
  const theme = useTheme()
  const pageTitle = 'Diễn đàn công nghệ thông tin'
  const pageDesc = HOME_DESCRIPTION
  const [value, setValue] = React.useState('article')
  const [next, setNext] = React.useState(articlesProps.next)
  // const [loading, startLoading] = React.useTransition()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  // const onChange = (event, value) => {
  //   // console.log(value)
  //   const path = router.asPath.split('?')[0]
  //   router.push(buildFullUrl(
  //     path,
  //     {
  //       page: value,
  //       filter: router.query.filter
  //     })
  //   )
  // }

  // const handleInViewPort = () => {
  //   setNext(null)
  //   startLoading(() => {
  //     if (value === 'article') {
  //       getArticlesLastUpload(next).then(res => {
  //         setArticles([...articles, ...res.data.data])
  //         setNext(res.data.next)
  //       })
  //     } else {
  //       getThreadsLastUpload(next).then(res => {
  //         setThreads([...threads, ...res.data.data])
  //         setNext(res.data.next)
  //       })
  //     }
  //   })
  // }
  return (
    <>
      <NextSeo
        title={`${BRAND_NAME} - ${pageTitle}`}
        description={pageDesc}
        canonical={SITE_BASE_URL}
      />
      <BreadcrumbsContainer breadcrumbs={breadcrumbs} />
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='start' spacing={1} mb={2}>
          <Iconify icon='uiw:message' width={24} height={24} />
          <Styledh1>
            DIỄN ĐÀN CÔNG NGHỆ THÔNG TIN
          </Styledh1>
        </Stack>

        <Styledp>
          {pageDesc}
        </Styledp>

        <Box sx={{ width: '100%', mb: 1 }}>
          <Stack
            direction='row'
            alignItems='center'
            justifyContent='space-between'
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
        <Divider flexItem sx={{ borderColor: theme.palette.grey[200] }} />
      </Container>

      <Container>
        <Stack
          direction='column'
          spacing={3}
          alignItems='start'
          justifyContent='start'
          mt={2}
          divider={<Divider flexItem sx={{ borderColor: theme.palette.grey[200] }} />}
        >
          {value === 'article' && articlesProps?.data?.map((article, index) => (
            <ArticleItem article={article} index={index} key={uuidv4()} />
          ))}

          {value === 'thread' && threadsProps?.data?.map((thread) => (
            <ThreadItem key={uuidv4()} thread={thread} />
          ))}

          {next === null && <TopicCommentsListLoader />}
        </Stack>
        <Divider flexItem sx={{ borderColor: theme.palette.grey[200], marginTop: '32px' }} />
      </Container>
      {/* {next && <ViewportBlock onEnterViewport={handleInViewPort} onLeaveViewport={() => console.log('leave')} />} */}

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
            component={Link}
            renderItem={(item) => {
              console.log(item)
              return (
                <PaginationItem
                  component={Link}
                  href={buildFullUrl(
                    router.asPath.split('?')[0],
                    {
                      page: item.page,
                      filter: router.query.filter
                    })}
                  {...item}
                />
              )
            }}
            count={value === 'article' ? articlesProps.totalPages : threadsProps.totalPages}
            shape='rounded'
            size='small'
            defaultPage={1}
            // onChange={onChange}
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

// const Block = (props) => {
//   const { forwardedRef } = props
//   return (
//     <div className='viewport-block' ref={forwardedRef}>
//       <div style={{ width: '1px', height: '1px', backgroundColor: 'transparent' }} />
//     </div>
//   )
// }

const Styledh1 = styled('h1')(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  lineHeight: '40px',
  color: theme.palette.text.primary,
  marginBottom: '16px'
}))

export const Styledp = styled('p')(({ theme }) => ({
  fontSize: '14px'
}))
