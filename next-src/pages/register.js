import React from 'react'
import RegisterForm from '@/components/register/RegisterForm'
import NoSSR from '@/components/NoSSR'
import {styled} from '@mui/material/styles'
import {Box, Grid, Typography} from '@mui/material'

export async function getStaticProps ({ locale }) {
  return {
    props: {
    }
  }
}
function RegisterPage () {

  return (
    <>
      <StyledRoot>
        <Grid
          container
          direction='row'
          columns={{
            lg: 2,
            md: 2,
            sm: 1,
            xs: 1
          }}
        >
          <Grid
            item
            xs={1}
          >
            <StyledContent>
              <Typography variant='h4' gutterBottom>
                Đăng ký
              </Typography>

              <Typography
                variant='body1'
                sx={{
                  mb: 1,
                  '& .MuiTypography-root': {
                    fontSize: '20px'
                  }
                }}
              >
                Đăng ký tài khoản để trải nghiệm thêm nhiều chức năng của tinhoc.org hơn nữa
              </Typography>

              <RegisterForm />
            </StyledContent>
          </Grid>

          <Grid
            item
            xs={1}
          >
            <Box
              sx={{
                width: '100%',
                height: '100vh',
                position: 'relative',
                display: {
                  lg: 'flex',
                  md: 'flex',
                  sm: 'none',
                  xs: 'none'
                },
                '& img': {
                  objectFit: 'cover',
                  objectPosition: 'center',
                  height: '100%'
                }
              }}
            >
              <img
                src='/assets/illustrations/loginbg.png'
                alt='login'
                width='100%'
                height='auto'
              />

              <StyledImg
                src='/assets/illustrations/tinhocorg_logo.svg'
                alt='login'
                width='100%'
                height='auto'
              />
            </Box>
          </Grid>
        </Grid>

      </StyledRoot>
    </>
  )
}

export default NoSSR(RegisterPage)

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  },
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(0, 2)
  }
}))

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0)
}))

const StyledImg = styled('img')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  top: 0,
  opacity: 0.5
}))
