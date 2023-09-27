'use client'

import React from 'react'
import { Container, Divider, Stack } from '@mui/material'
import { getSubcategories } from '@/apis/apis'
import BreadcrumbsContainer from '@/components/breadcrumbs/BreadcrumbsContainer'
import { BRAND_NAME, SITE_BASE_URL } from '@/constants'
import { NextSeo } from 'next-seo'
import { styled, useTheme } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import TopicItem from '@/components/topic/TopicItem'
import { v4 as uuidv4 } from 'uuid'
import { Styledh1 } from '@/styles'
import { useRouter } from 'next/router'

export async function getServerSideProps (context) {
  const { category } = context.params
  // const data = await Subcategories.find(subcategory => subcategory.slug === category)
  const data = await getSubcategories(category).then(res => res.data.data).catch(err => console.log(err))
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: data ? data.name : 'hardware',
      url: `/${category}`
    }
  ]
  return {
    props: {
      category,
      data,
      breadcrumbs
    }
  }
}
function Index ({ category, data, breadcrumbs }) {
  const router = useRouter()
  const theme = useTheme()
  console.log(data)
  return (
    <>
      <NextSeo
        title={`${data.name} - ${BRAND_NAME}`}
        description={data.description ?? 'Đang cập nhật'}
        canonical={SITE_BASE_URL + router.asPath}
      />

      <BreadcrumbsContainer breadcrumbs={breadcrumbs} />
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='start' spacing={1} mb={2} mt={1}>
          <Iconify icon={data.icon ?? 'uiw:message'} width={24} height={24} />
          <Styledh1>
            Chuyên mục: {data.name} {data?.otherName && data.otherName !== 'Đang cập nhật' && `(${data?.otherName})`}
          </Styledh1>
        </Stack>

        <Styledp>
          {data.description}
        </Styledp>
      </Container>

      <Container>
        <Stack
          direction='row'
          spacing={0}
          alignItems='center'
          justifyContent='start'
          mt={3}
          mb={1}
        >
          <StyledTopic>Chuyên mục</StyledTopic>
          <StyledCell>Bài viết</StyledCell>
          <StyledCell>Câu hỏi</StyledCell>
        </Stack>

        <Divider flexItem sx={{ borderColor: theme.palette.grey[300], borderBottomWidth: 'unset' }} />

        {data?.children.map((topic, index) => (
          <TopicItem key={uuidv4()} topic={topic} url={`/${data.slug}/${topic.slug}`} />
        ))}
      </Container>
    </>
  )
}

export default Index

const StyledTopic = styled('span')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 'bold',
  color: theme.palette.grey[600],
  width: 'calc(100% - 160px)',
  [theme.breakpoints.down('sm')]: {
    width: 'calc(100% - 120px)'
  }
}))

const StyledCell = styled('span')(({ theme }) => ({
  fontSize: '16px',
  fontWeight: 'bold',
  color: theme.palette.grey[600],
  width: '80px',
  textAlign: 'center',
  [theme.breakpoints.down('sm')]: {
    width: '60px'
  }
}))

const Styledp = styled('p')(({ theme }) => ({
  fontSize: '14px'
}))
