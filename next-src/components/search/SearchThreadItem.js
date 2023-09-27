import React from 'react'
import { Avatar, Box, Grid, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Link from 'next/link'
import { DJANGO_MEDIA_BASE_URL } from '@/constants'

function SearchThreadItem ({ thread }) {
  const theme = useTheme()
  console.log(thread)
  return (
    <Box
      sx={{
        width: '100%',
        height: 'auto',
        backgroundColor: 'transparent',
        padding: '8px 0px'
      }}
    >
      <Grid
        container
        direction='row'
        spacing={1}
        columns={{
          lg: 12,
          md: 10,
          sm: 8,
          xs: 6
        }}
        sx={{
          height: '100%'
        }}
      >
        <Grid
          item
          xs={1}
          sx={{
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'end'
          }}
        >
          <Avatar
            src={`${DJANGO_MEDIA_BASE_URL}/${thread?.infor_user?.avatar}`}
            alt='photoURL'
            sx={{
              width: 34,
              height: 34,
              border: `1px solid ${theme.palette.primary.light}`,
              marginTop: '4px'
            }}
          />
        </Grid>

        <Grid
          item
          lg={11}
          md={9}
          sm={7}
          xs={5}
          sx={{ height: '100%' }}
        >
          <Box
            sx={{
              width: '100%'
            }}
          >
            <Styledh2>
              <Link href={`/thread/${thread.slug}.${thread.id}`}>
                {thread.title}
              </Link>
            </Styledh2>
            {thread?.tag_names && thread?.tag_names?.map((tag, index) => (
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
                  {`#${tag?.name} `}
                </StyledLink>
              </Typography>
            ))}
            <Styledp>
              <strong>1 thang truoc</strong> - {thread.content}
            </Styledp>
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default SearchThreadItem

const Styledh2 = styled('h2')(({ theme }) => ({
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0px',
  '& a': {
    color: theme.palette.grey[800],
    textDecoration: 'none'
  },
  '& a:hover': {
    color: theme.palette.primary.main,
    textDecoration: 'underline'
  }
}))

const StyledLink = styled(Link)(({ theme }) => ({
  width: '100%',
  color: theme.palette.grey[800],
  textDecoration: 'none',
  textOverflow: 'ellipsis',
  marginBottom: '4px'
}))

const Styledp = styled('p')(({ theme }) => ({
  fontSize: '14px',
  '& strong': {
    fontWeight: '400',
    color: theme.palette.grey[600]
  }
}))
