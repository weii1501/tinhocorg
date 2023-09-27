import React from 'react'
// @mui
import {styled} from '@mui/material/styles'
import {Box, Container, Typography} from '@mui/material'

// ----------------------------------------------------------------------

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}))

// ----------------------------------------------------------------------

export default function Custom404 () {
  return (
    <>
      <Container>
        <StyledContent sx={{ textAlign: 'center', alignItems: 'center' }}>
          <Typography variant='h3' paragraph>
            Sorry, page not found!
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check your
            spelling.
          </Typography>

          <Box
            component='img'
            src='/assets/illustrations/illustration_404.svg'
            sx={{ height: 260, mx: 'auto', my: { xs: 5, sm: 10 } }}
          />

          {/*<Button to='/' size='large' variant='contained' component={Link}>*/}
          {/*  Go to Home*/}
          {/*</Button>*/}
        </StyledContent>
      </Container>
    </>
  )
}
