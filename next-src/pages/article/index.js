import React from 'react'
import {
  ARTICLE_DESCRIPTION,
  ARTICLE_TITLE,
  BRAND_NAME,
  SITE_BASE_URL
} from '@/constants'
import Script from 'next/script'
import BreadcrumbsContainer
  from '@/components/breadcrumbs/BreadcrumbsContainer'
import Iconify from '@/components/iconify'
import { Container, Divider, Pagination, Stack } from '@mui/material'
import { Styledh1 } from '@/styles'
import { getArticlesLastUpload } from '@/apis/apis'
import { useTheme } from '@mui/material/styles'
import ArticleItem from '@/components/articles/ArticleItem'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { buildFullUrl } from '@/utils/utils'
import { NextSeo } from 'next-seo'

export async function getServerSideProps (context) {
  const { page } = context.query
  const articles = await getArticlesLastUpload(page).then(res => res.data).catch(err => [])
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: 'Bài viết',
      url: '/article'
    }
  ]
  return {
    props: {
      breadcrumbs,
      articles
    }
  }
}

function Index ({ breadcrumbs, articles }) {
  const router = useRouter()
  const theme = useTheme()
  const onChange = (event, value) => {
    // console.log(value)
    const path = router.asPath.split('?')[0]
    router.push(buildFullUrl(
      path,
      {
        page: value
      })
    )
  }
  return (
    <>
      <NextSeo
        title={`${ARTICLE_TITLE} - ${BRAND_NAME}`}
        description={ARTICLE_DESCRIPTION}
        canonical={SITE_BASE_URL + router.asPath}
      />

      <Script
        src={`${SITE_BASE_URL}/script.js`}
        strategy='worker'
        onLoad={() => {
          console.log(`${SITE_BASE_URL}/script.js`)
        }}
      />

      <BreadcrumbsContainer breadcrumbs={breadcrumbs} />

      <Container>
        <Stack direction='row' alignItems='center' justifyContent='start' spacing={1} mb={2} mt={1}>
          <Iconify icon='uiw:message' width={24} height={24} />
          <Styledh1>
            Bài viết gần đây
          </Styledh1>
        </Stack>
        <Divider flexItem sx={{ borderColor: theme.palette.grey[200], mb: 2 }} />
      </Container>

      <Container>
        <Stack
          direction='column'
          spacing={3}
          alignItems='start'
          justifyContent='start'
          divider={<Divider flexItem sx={{ borderColor: theme.palette.grey[200] }} />}
        >
          {articles.data.map((article, index) => (
            <ArticleItem article={article} index={index} key={uuidv4()} />
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
            count={articles.totalPages}
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
