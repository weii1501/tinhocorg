import PropTypes from 'prop-types'
// @mui
import { alpha, styled, useTheme } from '@mui/material/styles'
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material'
import SvgColor from '@/components/svg-color'
import { fDate } from '@/utils/formatTime'
import Iconify from '@/components/iconify'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { generateRandomCoverUrl, numberFormatter } from '@/utils/utils'

// ----------------------------------------------------------------------

const StyledCardMedia = styled('div')({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)'
})

const StyledTitle = styled(Typography)({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical'
})

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2)
}))

const StyledInfo = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled
}))

const StyledCover = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
})

const LINK = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary
}))

// ----------------------------------------------------------------------

ArticleCard.propTypes = {
  article: PropTypes.object.isRequired,
  index: PropTypes.number
}

export default function ArticleCard ({ article, index }) {
  const router = useRouter()
  const theme = useTheme()
  const {
    category: CatergorySlug,
    subcategory: SubcatergorySlug,
    topic: TopicSlug,
    page
  } = router.query
  const firstPage = page === '1' || page === undefined
  // const {
  //   cover,
  //   title,
  //   view,
  //   comment,
  //   share,
  //   author,
  //   createdAt
  // } = article
  const latestPostLarge = index === 0
  const latestPost = index === 1 || index === 2

  const POST_INFO = [
    { number: article.numComments, icon: 'eva:message-circle-fill' },
    { number: article.numViews, icon: 'eva:eye-fill' }
    // { number: article.view, icon: 'eva:share-fill' }
  ]

  return (
    <Grid item xs={12} sm={latestPostLarge && firstPage ? 12 : 6} md={(latestPostLarge && firstPage) ? 6 : 3}>
      <Card sx={{ position: 'relative' }}>
        <StyledCardMedia
          sx={{
            ...(((latestPostLarge || latestPost) && firstPage) && {
              pt: 'calc(100% * 4 / 3)',
              '&:after': {
                top: 0,
                content: "''",
                width: '100%',
                height: '100%',
                position: 'absolute',
                bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
              }
            }),
            ...((latestPostLarge && firstPage) && {
              pt: {
                xs: 'calc(100% * 4 / 3)',
                sm: 'calc(100% * 3 / 4.66)'
              }
            })
          }}
        >
          <SvgColor
            color='paper'
            src='/assets/icons/shape-avatar.svg'
            sx={{
              width: 80,
              height: 36,
              zIndex: 9,
              bottom: -15,
              position: 'absolute',
              color: 'background.paper',
              ...(((latestPostLarge || latestPost) && firstPage) && { display: 'none' })
            }}
          />
          <StyledAvatar
            alt={article.user.username}
            src={article.user.profileImage}
            sx={{
              ...(((latestPostLarge || latestPost) && firstPage) && {
                zIndex: 9,
                top: 24,
                left: 24,
                width: 40,
                height: 40
              })
            }}
          />

          <StyledCover alt={article.user.username} src={article.cover ?? generateRandomCoverUrl()} />
        </StyledCardMedia>

        <CardContent
          sx={{
            pt: 4,
            ...(((latestPostLarge || latestPost) && firstPage) && {
              bottom: 0,
              width: '100%',
              position: 'absolute'
            })
          }}
        >
          <Typography gutterBottom variant='caption' sx={{ color: 'text.disabled', display: 'block' }}>
            {fDate(article.createdAt)}
          </Typography>

          <StyledTitle
            color='inherit'
            variant='subtitle2'
            underline='hover'
            sx={{
              ...((latestPostLarge && firstPage) && { typography: 'h5', height: 60 }),
              ...(((latestPostLarge || latestPost) && firstPage) && {
                color: 'common.white',
                '& a': {
                  color: 'common.white',
                  textDecoration: 'none'
                }
              })
            }}
          >
            {/* eslint-disable-next-line react/jsx-pascal-case */}
            <LINK href={!article ? `/${CatergorySlug}/${SubcatergorySlug}/${TopicSlug}/${article.id}` : `/article/${article.slug}.${article.id}`}>
              {article.title}
            </LINK>
          </StyledTitle>

          {/* <Stack */}
          {/*  direction='row' */}
          {/*  spacing={1} */}
          {/* > */}
          {/*  {article?.tags?.map((tag, index) => ( */}
          {/*    <Typography */}
          {/*      noWrap */}
          {/*      key={index} */}
          {/*      variant='caption' */}
          {/*      color='grey.500' */}
          {/*      sx={{ */}
          {/*        cursor: 'pointer', */}
          {/*        '&:hover': { */}
          {/*          color: theme.palette.primary.main, */}
          {/*          textDecoration: 'underline' */}
          {/*        } */}
          {/*      }} */}
          {/*    > */}
          {/*      <Link href={`/tag/${tag?.slug}`}> */}
          {/*        {`#${tag?.name}`} */}
          {/*      </Link> */}
          {/*    </Typography> */}
          {/*  ))} */}
          {/* </Stack> */}

          <StyledInfo>
            {POST_INFO?.map((info, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  ml: index === 0 ? 0 : 1.5,
                  ...(((latestPostLarge || latestPost) && firstPage) && {
                    color: 'grey.500'
                  })
                }}
              >
                <Iconify icon={info.icon} sx={{ width: 16, height: 16, mr: 0.5 }} />
                <Typography variant='caption'>{numberFormatter(info.number, 2)}</Typography>
              </Box>
            ))}
          </StyledInfo>
        </CardContent>
      </Card>
    </Grid>
  )
}
