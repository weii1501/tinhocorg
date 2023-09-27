import React from 'react'
import { Avatar, Box, CardMedia, Grid, Stack, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { DJANGO_BASE_URL, DJANGO_MEDIA_BASE_URL } from '@/constants'
import Link from 'next/link'
import ReactHtmlParser from 'react-html-parser'
import { generateRandomCoverUrl } from '@/utils/utils'

function TagArticleItem ({ article }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        width: '100%',
        height: {
          lg: '180px',
          md: '180px',
          sm: 'auto',
          xs: 'auto'
        },
        backgroundColor: 'transparent'
      }}
    >
      <Grid
        container
        direction='row'
        spacing={2}
        columns={{
          lg: 4,
          md: 4,
          sm: 1,
          xs: 1
        }}
        sx={{
          height: '100%'
        }}
      >
        <Grid
          item
          xs={1}
          sx={{ height: '100%' }}
        >
          <CardMedia
            component='img'
            image={article.cover ? `${DJANGO_BASE_URL}${article.cover}` : generateRandomCoverUrl()}
            alt='cover'
            height='auto'
            sx={{
              height: '100%',
              padding: 0,
              borderRadius: 2
            }}
          />
        </Grid>
        <Grid
          item
          lg={3}
          md={3}
          sm={1}
          xs={1}
          sx={{ height: '100%' }}
        >
          <Stack
            direction={{
              lg: 'column',
              md: 'column',
              sm: 'column-reverse',
              xs: 'column-reverse'
            }}
            justifyContent='space-between'
            alignItems='start'
            sx={{
              height: '100%'
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%'
              }}
            >
              <Typography
                variant='h5' gutterBottom
                color='text.secondary'
                sx={{
                  cursor: 'pointer',
                  height: 'auto',
                  maxHeight: '30px',
                  maxWidth: '635px',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  '&:hover': {
                    color: theme.palette.primary,
                    textDecoration: 'underline'
                  }
                }}
              >
                <StyledLink href={`/article/${article?.slug}.${article?.id}`}>
                  {article?.title}
                </StyledLink>
              </Typography>
              <Typography
                variant='body2'
                gutterBottom
                color='text.secondary'
                sx={{
                  overflow: 'hidden',
                  maxWidth: '635px',
                  whiteSpace: 'wrap',
                  textOverflow: 'ellipsis',
                  height: 44,
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {HTMLCanvas(article?.articleDescription ?? article?.article_description ?? 'Đang cập nhật')}
              </Typography>
              <Stack
                direction='row'
                spacing={1}
                sx={{
                  flexWrap: 'wrap',
                  maxHeight: '18px',
                  overflowY: 'hidden'
                }}
              >
                {article?.tags && article?.tags?.map((tag, index) => (
                  <Typography
                    key={index}
                    variant='caption'
                    color='grey.500'
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: theme.palette.primary.main,
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    <StyledLink href={`/tag/${tag?.slug}`}>
                      {`#${tag?.name}`}
                    </StyledLink>
                  </Typography>
                ))}

                {article.tag_names && article?.tag_names?.map((tag, index) => (
                  <Typography
                    key={index}
                    variant='caption'
                    color='grey.500'
                    sx={{
                      cursor: 'pointer',
                      '&:hover': {
                        color: theme.palette.primary.main,
                        textDecoration: 'underline'
                      }
                    }}
                  >
                    <StyledLink href={`/tag/${tag?.slug}`}>
                      {`#${tag?.name}`}
                    </StyledLink>
                  </Typography>
                ))}
              </Stack>
            </Box>
            <Box>
              <StyledAccount>
                <Avatar
                  src={article?.user?.profileImage ?? `${DJANGO_MEDIA_BASE_URL}/${article?.infor_user?.avatar}`}
                  alt='photoURL'
                  sx={{
                    width: 34,
                    height: 34,
                    border: `1px solid ${theme.palette.primary.light}`
                  }}
                />

                <Box sx={{ ml: 1 }}>
                  <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                    {article?.user?.username ?? article?.infor_user?.username}
                  </Typography>
                </Box>
              </StyledAccount>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TagArticleItem

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 0)
}))

const StyledLink = styled(Link)(({ theme }) => ({
  width: '100%',
  color: theme.palette.grey[800],
  textDecoration: 'none',
  textOverflow: 'ellipsis'
}))

function HTMLCanvas (htmlContent) {
  const htmlParserTransform = (node, index) => {
    if (node.type === 'tag' && node.name === 'img') { // a tag named a
      const { src } = node.attribs // extract the actual url
      return (
        <div
          hidden
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            visibility: 'hidden'
          }}
        >
          <img
            onClick={() => onClick(src)}
            src={src}
            alt={node.name}
            style={{
              display: 'flex',
              margin: 'auto',
              maxWidth: 500,
              maxHeight: 500,
              my: 2,
              borderRadius: 2,
              boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
              cursor: 'pointer'
            }}
          />
          <Typography variant='caption' color='text.secondary' gutterBottom mt={0.5}>
            Nhấn ảnh để xem ảnh đầy đủ
          </Typography>
        </div>
      )
    }
  }

  return ReactHtmlParser(
    htmlContent, // or whatever
    { transform: htmlParserTransform }
  )
}
