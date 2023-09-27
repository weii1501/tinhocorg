import React from 'react'
import { getThreadsLastUpload } from '@/apis/apis'
import {BRAND_NAME, SITE_BASE_URL, THREAD_DESCRIPTION, THREAD_TITLE} from '@/constants'
import Script from 'next/script'
import BreadcrumbsContainer
  from '@/components/breadcrumbs/BreadcrumbsContainer'
import { Container, Divider, Pagination, Stack } from '@mui/material'
import Iconify from '@/components/iconify'
import { Styledh1 } from '@/styles'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { buildFullUrl } from '@/utils/utils'
import ThreadItem from '@/components/threads/ThreadItem'
import { v4 as uuidv4 } from 'uuid'
import { NextSeo } from 'next-seo'

export async function getServerSideProps (context) {
  const { page } = context.query
  const threads = await getThreadsLastUpload(page).then(res => res.data).catch(err => [])
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: 'Câu hỏi',
      url: '/thread'
    }
  ]
  return {
    props: {
      breadcrumbs,
      threads
    }
  }
}

function Index ({ breadcrumbs, threads }) {
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
        title={`${THREAD_TITLE} - ${BRAND_NAME}`}
        description={THREAD_DESCRIPTION}
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
            Câu hỏi gần đây
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
          {threads.data.map((thread, index) => (
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
            count={threads.totalPages}
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
