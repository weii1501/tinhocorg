import React, { useEffect } from 'react'
import { Button, Container, Divider, Paper, Stack } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import SearchType from '@/components/search/SearchType'
import algoliasearch from 'algoliasearch/lite'
import { ALGOLIA_API_KEY, ALGOLIA_APPLICATION_ID } from '@/constants'
import TagArticles from '@/components/tag/TagArticles'
import SearchThreadItem from '@/components/search/SearchThreadItem'
import { v4 as uuidv4 } from 'uuid'
import ArticleItem from '@/components/articles/ArticleItem'
import ThreadItem from '@/components/threads/ThreadItem'
import BreadcrumbsContainer
  from "@/components/breadcrumbs/BreadcrumbsContainer";

const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)

export async function getServerSideProps (context) {
  const { q, search_type: searchType } = context.query
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: 'Tìm kiếm',
      url: '/search'
    }
  ]
  return {
    props: {
      q,
      searchType,
      breadcrumbs
    }
  }
}

function Search ({ q, searchType, breadcrumbs }) {
  const theme = useTheme()
  const [result, setResult] = React.useState(null)
  const [articles, setArticles] = React.useState([])
  const [threads, setThreads] = React.useState([])
  const [page, setPage] = React.useState(0)

  useEffect(() => {
    const index = searchClient.initIndex(searchType)
    const searchParams = {
      query: q
    }
    index.search(searchParams.query, {
      page
    }).then(res => {
      setResult(res)
      if (searchType === 'articles_index') {
        setArticles([...articles, ...res.hits])
      } else {
        setThreads([...threads, ...res.hits])
      }
    })
  }, [q, page])

  return (
    <>
      <BreadcrumbsContainer breadcrumbs={breadcrumbs} />
      <Container
        sx={{
          paddingY: '20px'
        }}
      >
        <Stack direction='row' flexWrap='wrap-reverse' alignItems='center' justifyContent='space-between'>
          <Styledh1>
            {`${result?.nbHits} kêt quả tìm kiếm cho từ khóa: "${q}"`}
          </Styledh1>
          <SearchType />
        </Stack>

        <Divider />
      </Container>
      {result && (
        <Container
          maxWidth='lg'
        >
          <Stack
            direction='column'
            spacing={3}
            alignItems='start'
            justifyContent='start'
            divider={<Divider flexItem sx={{ borderColor: theme.palette.grey[200] }} />}
          >
            {searchType === 'articles_index' && articles.map((article, index) => (
              <ArticleItem key={uuidv4()} article={article} />
            ))}

            {console.log(searchType)}
            {searchType === 'threads_index' && threads.map((thread, index) => (
              <ThreadItem key={uuidv4()} thread={thread} />
            ))}
          </Stack>
        </Container>
      )}

      {/* {searchType === 'threads_index' && (result && ( */}
      {/*  <Container */}
      {/*    maxWidth='lg' */}
      {/*  > */}
      {/*    <Paper */}
      {/*      elevation={0} */}
      {/*      sx={{ */}
      {/*        mt: 2, */}
      {/*        backgroundColor: 'transparent' */}
      {/*      }} */}
      {/*    > */}
      {/*      <Stack */}
      {/*        direction='column' */}
      {/*        alignItems='start' */}
      {/*        justifyContent='start' */}
      {/*        divider={<Divider flexItem />} */}
      {/*        spacing={{ */}
      {/*          lg: 0, */}
      {/*          md: 0, */}
      {/*          sm: 4, */}
      {/*          xs: 5 */}
      {/*        }} */}
      {/*      > */}
      {/*        {threads.map((thread, index) => ( */}
      {/*          <SearchThreadItem key={uuidv4()} thread={thread} /> */}
      {/*        ))} */}
      {/*      </Stack> */}
      {/*    </Paper> */}
      {/*    <Divider /> */}
      {/*  </Container> */}
      {/* ))} */}

      {page + 1 < result?.nbPages && (
        <Container
          maxWidth='lg'
        >
          <Button
            variant='text'
            onClick={() => { setPage(page + 1) }}
          >
            Load more
          </Button>
        </Container>
      )}

    </>
  )
}

export default Search

const Styledh1 = styled('h1')(({ theme }) => ({
  fontSize: '24px',
  fontWeight: 'bold'
}))
