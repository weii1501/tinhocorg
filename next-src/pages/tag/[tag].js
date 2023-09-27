import React from 'react'
import { Box, Container, Divider, Stack, Tab, Tabs } from '@mui/material'
import { getTagData } from '@/apis/apis'
import Iconify from '@/components/iconify'
import BreadcrumbsContainer from '@/components/breadcrumbs/BreadcrumbsContainer'
import { styled, useTheme } from '@mui/material/styles'
import ArticleItem from '@/components/articles/ArticleItem'
import { v4 as uuidv4 } from 'uuid'
import ThreadItem from '@/components/threads/ThreadItem'

export async function getServerSideProps (context) {
  const { tag } = context.params
  const data = await getTagData(tag).then(res => res.data.data)
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: 'tag',
      url: '/404'
    },
    {
      label: `${data.tag?.name}`,
      url: `/tag/${data.tag?.slug}`
    }
  ]
  return {
    props: {
      tag: data.tag,
      articles: data.articles,
      threads: data.threads,
      breadcrumbs
    }
  }
}

function TagPage ({ tag, articles: articlesProps, threads: threadsProps, breadcrumbs }) {
  const theme = useTheme()
  const [articles, setArticles] = React.useState(articlesProps)
  const [threads, setThreads] = React.useState(threadsProps)
  // const [openThread, setOpenThread] = React.useState(false)
  const [value, setValue] = React.useState('article')
  const [next, setNext] = React.useState(articlesProps.next)
  const handleChange = (event, newValue) => {
    setValue(newValue)
    if (newValue === 'article') {
      setNext(articlesProps.next)
    } else {
      setNext(threadsProps.next)
    }
  }
  return (
    <>
      <BreadcrumbsContainer
        breadcrumbs={breadcrumbs}
        maxWidth='lg'
      />

      {/* <Container */}
      {/*  maxWidth='lg' */}
      {/* > */}
      {/*  <Typography variant='h3' gutterBottom mb={2}> */}
      {/*    #{tag.name} */}
      {/*  </Typography> */}
      {/*  <Divider /> */}
      {/*  <Stack spacing={2} my={1}> */}
      {/*    <Pagination count={10} shape='rounded' size='small' defaultPage={1} /> */}
      {/*  </Stack> */}
      {/* </Container> */}
      {/* <Container */}
      {/*  maxWidth='lg' */}
      {/* > */}
      {/*  <TagArticles */}
      {/*    articles={articles} */}
      {/*  /> */}
      {/* </Container> */}

      <Container>
        <Stack direction='row' alignItems='center' justifyContent='start' spacing={1} mb={2}>
          <Iconify icon='uiw:message' width={24} height={24} />
          <Styledh1>
            {`#${tag.name}`}
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
            <Tab value='article' label='Bài viết' />
            <Tab value='thread' label='Câu hỏi' />
          </Tabs>
        </Box>
        <Divider />
      </Container>

      <Container>
        <Stack
          direction='column'
          spacing={3}
          alignItems='start'
          justifyContent='start'
          divider={<Divider flexItem sx={{ borderColor: theme.palette.grey[200] }} />}
        >
          {value === 'article' && articles.map((article, index) => (
            <ArticleItem article={article} index={index} key={uuidv4()} />
          ))}

          {value === 'thread' && threads.map((thread) => (
            <ThreadItem key={uuidv4()} thread={thread} />
          ))}

          {/* {next === null && <TopicCommentsListLoader />} */}
        </Stack>
        <Divider flexItem sx={{ borderColor: theme.palette.grey[200], marginTop: '32px' }} />
      </Container>
    </>
  )
}

export default TagPage

const Styledh1 = styled('h1')(({ theme }) => ({
  fontSize: '32px',
  fontWeight: 600,
  lineHeight: '40px',
  color: theme.palette.text.primary,
  marginBottom: '16px'
}))
