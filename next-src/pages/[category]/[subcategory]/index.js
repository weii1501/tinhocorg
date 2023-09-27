import React from 'react'
import { Container, Divider, Stack } from '@mui/material'
import { getCateogry, getTopics } from '@/apis/apis'
import BreadcrumbsContainer from '@/components/breadcrumbs/BreadcrumbsContainer'
import Iconify from '@/components/iconify'
import { styled, useTheme } from '@mui/material/styles'
import TopicItem from '@/components/topic/TopicItem'

import { v4 as uuidv4 } from 'uuid'
import { BRAND_NAME, SITE_BASE_URL } from '@/constants'
import { NextSeo } from 'next-seo'
import { Styledh1 } from '@/styles'
import { useRouter } from 'next/router'

export async function getServerSideProps (context) {
  const { subcategory } = context.params
  // const data = await Subcategories.find(subcategory => subcategory.slug === category)
  const subcategorydata = await getCateogry(subcategory).then(res => res.data.data).catch(err => console.log(err))
  const data = await getTopics(subcategory).then(res => res.data).catch(err => console.log(err))
  // console.log(subcategorydata)
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
    }
  ]
  return {
    props: {
      data,
      breadcrumbs
      // name: '',
      // data: [],
    }
  }
}

function Index ({ data, breadcrumbs }) {
  const router = useRouter()
  const theme = useTheme()
  // const totalArtiles = data?.data?.reduce((accumulator, currentValue) => accumulator + currentValue.numArticles, 0)
  // const totalThreads = data?.data?.reduce((accumulator, currentValue) => accumulator + currentValue.numThreads, 0)
  console.log(data)
  return (
    <>
      <BreadcrumbsContainer breadcrumbs={breadcrumbs} />
      <NextSeo
        title={`${data.name} - ${BRAND_NAME}`}
        description={data.description ?? 'Đang cập nhật'}
        canonical={SITE_BASE_URL + router.asPath}
      />
      <Container
        sx={{
          mb: 3
        }}
      >
        <Stack direction='row' alignItems='center' justifyContent='start' spacing={1} mb={2} mt={1}>
          <Iconify icon={data.icon ?? 'uiw:message'} width={24} height={24} />
          <Styledh1>
            Chuyên mục: {data.name} {data?.otherName && data.otherName !== 'Đang cập nhật' && `(${data?.otherName})`}
          </Styledh1>
        </Stack>

        <Styledp>
          {data.description}
        </Styledp>
        {/* <Stack direction='row' alignItems='center' justifyContent='start' spacing={1} mb={2} mt={1}> */}
        {/*  <Iconify icon='uiw:message' width={24} height={24} /> */}
        {/*  <Styledh1> */}
        {/*    {name} */}
        {/*  </Styledh1> */}

        {/* </Stack> */}
        {/* <Grid container spacing={3}> */}
        {/*  {data.map((topic, index) => ( */}
        {/*    <CategoryCard topic={topic} index={index} key={topic.id} /> */}
        {/*  ))} */}
        {/* </Grid> */}
        {/* <Divider flexItem sx={{ borderColor: theme.palette.grey[300] }} /> */}
      </Container>

      <Container>
        <Stack
          direction='row'
          spacing={0}
          alignItems='center'
          justifyContent='start'
          mb={1}
        >
          <StyledTopic>Chủ đề</StyledTopic>
          <StyledCell>Bài viết</StyledCell>
          <StyledCell>Câu hỏi</StyledCell>
        </Stack>

        <Divider flexItem sx={{ borderColor: theme.palette.grey[300], borderBottomWidth: 'unset' }} />

        {/* <Stack */}
        {/*  direction='row' */}
        {/*  spacing={0} */}
        {/*  alignItems='center' */}
        {/*  justifyContent='start' */}
        {/*  mb={1} */}
        {/* > */}
        {/*  <Stack */}
        {/*    direction='column' */}
        {/*    spacing={0} */}
        {/*    alignItems='start' */}
        {/*    justifyContent='start' */}
        {/*    sx={{ */}
        {/*      width: { */}
        {/*        lg: 'calc(100% - 160px)', */}
        {/*        md: 'calc(100% - 160px)', */}
        {/*        sm: 'calc(100% - 160px)', */}
        {/*        xs: 'calc(100% - 120px)' */}
        {/*      } */}
        {/*    }} */}
        {/*  > */}
        {/*    <StyledCategory> */}
        {/*      <Iconify icon={data?.icon ?? 'streamline:interface-edit-pin-2-pin-push-thumbtack'} width={14} height={14} sx={{ mr: 1 }} /> */}
        {/*      {data?.name} {data?.otherName && data.otherName !== 'Đang cập nhật' && `(${data?.otherName})`} */}
        {/*    </StyledCategory> */}

        {/*    <StyledDescription> */}
        {/*      {data?.description} */}
        {/*    </StyledDescription> */}
        {/*  </Stack> */}

        {/*  <StyledCellNumber> */}
        {/*    {totalArtiles} */}
        {/*  </StyledCellNumber> */}
        {/*  <StyledCellNumber> */}
        {/*    {totalThreads} */}
        {/*  </StyledCellNumber> */}
        {/* </Stack> */}

        {/* <Divider flexItem sx={{ borderColor: theme.palette.grey[300] }} /> */}

        {data?.data.map((topic, index) => (
          <TopicItem key={uuidv4()} topic={topic} />
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
    fontSize: '14px',
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

// const StyledCategory = styled('h1')(({ theme }) => ({
//   width: '100%',
//   paddingTop: '8px',
//   paddingBottom: '8px',
//   fontSize: '18px',
//   padding: 0
// }))
//
// const StyledCellNumber = styled('span')(({ theme }) => ({
//   fontSize: '16px',
//   fontWeight: 'bold',
//   color: theme.palette.grey[900],
//   width: '80px',
//   textAlign: 'center',
//   [theme.breakpoints.down('sm')]: {
//     width: '60px'
//   }
// }))
//
// const StyledDescription = styled('p')(({ theme }) => ({
//   fontSize: '14px',
//   fontWeight: '400',
//   color: theme.palette.grey[600],
//   width: '100% !important',
//   margin: '0px'
// }))

const Styledp = styled('p')(({ theme }) => ({
  fontSize: '14px'
}))
