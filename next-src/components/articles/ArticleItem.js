import React from 'react'
import { Avatar, Box, Grid, Stack } from '@mui/material'
import {
  StyledDate,
  Styledp,
  StyledTag,
  StyledTitle,
  StyledUsername
} from '@/components/articles/styles'
import { fDateTime } from '@/utils/formatTime'
import { v4 as uuidv4 } from 'uuid'
import StatisticsItem from '@/components/articles/StatisticsItem'
import { DJANGO_MEDIA_BASE_URL } from '@/constants'

function ArticleItem ({ article }) {
  // console.log(article)
  const statistics = [
    {
      icon: 'iconamoon:eye-light',
      number: article.numViews
    },
    {
      icon: 'bx:comment',
      number: article.numComments
    },
    {
      icon: 'mdi:like-outline',
      number: article.totalLikes
    }
  ]

  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <StyledTitle href={`/article/${article?.slug}.${article?.id}`}>
        {article?.title}
      </StyledTitle>
      <Grid
        container
        spacing={1}
        direction='row'
        columns={12}
      >
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='start'
          spacing={1}
          pl={1}
          mt={1}
        >
          <Avatar
            src={article?.user?.profileImage ?? `${DJANGO_MEDIA_BASE_URL}/${article?.infor_user?.profile_image}`}
            alt='avatar'
            sx={{
              width: 14,
              height: 14
            }}
            imgProps={{
              width: 14,
              height: 14,
              loading: 'lazy'
            }}
          />
          <StyledUsername href={`/user/${article?.user?.username}.${article?.user?.id}?type=article`}>
            {article?.user?.username ?? article?.infor_user?.username}
          </StyledUsername>
          <span>
            -
          </span>
          <StyledDate>
            {fDateTime(article?.createdAt ?? article?.created_at)}
          </StyledDate>
        </Stack>
      </Grid>
      <Styledp>
        {article?.articleDescription ?? article?.article_description}
      </Styledp>

      {/* <Grid */}
      {/*  container */}
      {/*  spacing={1} */}
      {/*  direction='row' */}
      {/*  columns={{ */}
      {/*    lg: 10, */}
      {/*    md: 10, */}
      {/*    sm: 10, */}
      {/*    xs: 1 */}
      {/*  }} */}
      {/* > */}
      {/*  <Grid */}
      {/*    item */}
      {/*    xs={8} */}
      {/*  > */}
      {/*    <Stack */}
      {/*      direction='row' */}
      {/*      spacing={1} */}
      {/*      alignItems='start' */}
      {/*      justifyContent='start' */}
      {/*      flexWrap='wrap' */}
      {/*      useFlexGap */}
      {/*    > */}
      {/*      {article?.tags?.map((tag) => ( */}
      {/*        <StyledTag key={uuidv4()} href={`/tag/${tag.slug}`}> */}
      {/*          {tag?.name} */}
      {/*        </StyledTag> */}
      {/*      ))} */}
      {/*    </Stack> */}
      {/*  </Grid> */}

      {/*  <Grid */}
      {/*    item */}
      {/*    xs={2} */}
      {/*  > */}
      {/*    <Stack */}
      {/*      direction='row' */}
      {/*      alignItems='center' */}
      {/*      justifyContent='end' */}
      {/*      spacing={3} */}
      {/*    > */}
      {/*      {statistics.map((item) => ( */}
      {/*        <StatisticsItem key={uuidv4()} icon={item.icon} number={item.number} /> */}
      {/*      ))} */}
      {/*    </Stack> */}
      {/*  </Grid> */}
      {/* </Grid> */}
      <Stack
        direction='row'
        alignItems='center'
        justifyContent='space-between'
        flexWrap='wrap'
      >
        <Stack
          direction='row'
          spacing={1}
          alignItems='start'
          justifyContent='start'
          flexWrap='wrap'
          useFlexGap
        >
          {article?.tags?.map((tag) => (
            <StyledTag key={uuidv4()} href={`/tag/${tag.slug}`}>
              {tag?.name}
            </StyledTag>
          ))}
        </Stack>

        <Stack
          direction='row'
          alignItems='center'
          justifyContent='end'
          spacing={3}
          sx={{
            flexGrow: 1
          }}
        >
          {statistics.map((item) => (
            <StatisticsItem key={uuidv4()} icon={item.icon} number={item.number} />
          ))}
        </Stack>
      </Stack>
    </Box>
  )
}

export default ArticleItem
