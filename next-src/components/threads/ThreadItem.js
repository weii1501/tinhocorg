import React from 'react'
import {
  StyledDate,
  Styledp,
  StyledTag,
  StyledTitle,
  StyledUsername
} from '@/components/articles/styles'
import { Avatar, Box, Grid, Stack } from '@mui/material'
import { fDateTime } from '@/utils/formatTime'
import { v4 as uuidv4 } from 'uuid'
import { useTheme } from '@mui/material/styles'
import { numberFormatter } from '@/utils/utils'
import { DJANGO_MEDIA_BASE_URL } from '@/constants'

function ThreadItem ({ thread }) {
  const theme = useTheme()
  console.log(thread)
  const statistics = [
    {
      title: 'vote',
      number: thread.totalLikes ?? 0
    },
    {
      title: 'answers',
      number: thread.totalReplies ?? 0
    },
    {
      title: 'views',
      number: thread.numViews ?? thread.num_views
    }
  ]
  return (
    <Grid
      container
      direction={{
        lg: 'row',
        md: 'column',
        sm: 'column',
        xs: 'column'
      }}
      columns={11}
      spacing={1}
    >
      <Grid
        item
        xs={1}
      >
        <Stack
          direction={{
            xs: 'row',
            sm: 'row',
            md: 'row',
            lg: 'column'
          }}
          alignItems='end'
          justifyContent='start'
          mt='6px'
          pr={2}
          spacing={1}
        >
          {statistics.map((statistic) => (
            <Box
              key={uuidv4()}
              component='span'
              sx={{
                width: 'auto',
                height: 'auto',
                fontSize: '12px',
                color: theme.palette.grey[600]
              }}
            >
              {numberFormatter(statistic.number, 1)} {statistic.title}
            </Box>
          ))}
        </Stack>
      </Grid>
      <Grid
        item
        xs={10}
      >
        <Box
          sx={{
            width: '100%',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <StyledTitle
            href={`/thread/${thread?.slug}.${thread?.id}`}
            sx={{
              fontSize: '18px',
              mb: 1
            }}
          >
            {thread?.title}
          </StyledTitle>
          <Grid
            container
            spacing={1}
            direction='row'
            columns={12}
          />
          <Styledp>
            {thread?.content}
          </Styledp>

          <Grid
            container
            spacing={1}
            direction={{
              lg: 'row',
              md: 'row',
              sm: 'row',
              xs: 'column-reverse'
            }}
            columns={{
              lg: 10,
              md: 10,
              sm: 10,
              xs: 1
            }}
          >
            <Grid
              item
              lg={7}
              md={7}
              sm={7}
              xs={1}
            >
              <Stack
                fullWidth
                direction='row'
                spacing={1}
                alignItems='start'
                justifyContent='start'
                flexWrap='wrap'
                useFlexGap
              >
                {thread?.tags?.map((tag) => (
                  <StyledTag key={uuidv4()} href={`/tag/${tag.slug}`}>
                    {tag?.name}
                  </StyledTag>
                ))}

                {thread?.tag_names?.map((tag) => (
                  <StyledTag key={uuidv4()} href={`/tag/${tag.slug}`}>
                    {tag?.name}
                  </StyledTag>
                ))}
              </Stack>
            </Grid>

            <Grid
              item
              lg={3}
              md={3}
              sm={3}
              xs={1}
            >
              <Stack
                direction='row'
                alignItems='center'
                justifyContent={{
                  lg: 'end',
                  md: 'end',
                  sm: 'start',
                  xs: 'start'
                }}
                spacing={1}
                pl={1}
              >
                <Avatar
                  src={thread?.user?.profileImage ?? `${DJANGO_MEDIA_BASE_URL}/${thread?.infor_user?.avatar}`}
                  alt='avatar'
                  sx={{
                    width: 14,
                    height: 14
                  }}
                  imgProps={{
                    width: 14,
                    height: 14,
                    objectFit: 'cover',
                    loading: 'lazy'
                  }}
                />
                <StyledUsername href={`/user/${thread?.user?.username}.${thread?.user?.id}?type=thread`}>
                  {thread?.user?.username ?? thread?.infor_user?.username}
                </StyledUsername>
                <span>
                  -
                </span>
                <StyledDate>
                  {fDateTime(thread?.createdAt ?? thread?.created_at)}
                </StyledDate>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </Grid>
  )
}

export default ThreadItem
