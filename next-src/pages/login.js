'use client'
import React from 'react'
import NoSSR from '@/components/NoSSR'
// @mui
import { styled } from '@mui/material/styles'
import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material'
// hooks
// components
import Iconify from '@/components/iconify'
import LoginForm from '@/components/login/LoginForm'
import Link from 'next/link'
import { useEffectOnce } from 'react-use'
import { getSocialLogin } from '@/apis/user_apis'
import { useRouter } from 'next/router'

export async function getStaticProps ({ locale }) {
  return {
    props: {
    }
  }
}

function LoginPage () {
  const router = useRouter()
  const [socialLogin, setSocialLogin] = React.useState(false)
  useEffectOnce(() => {
    getSocialLogin().then(res => {
      setSocialLogin(res.data.data)
      // console.log(res.data.data)
    }).catch(err => {
      console.log(err)
    })
  })

  const login = (url) => {
    router.replace(url)
  }

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
                Đăng nhập
              </Typography>

              <Typography
                variant='body2'
                sx={{
                  mb: 5,
                  '& :hover': {
                    textDecoration: 'underline',
                    cursor: 'pointer',
                    color: 'primary.main'
                  }
                }}
              >
                Đăng ký tài khoản để trải nghiệm thêm nhiều chức năng của tinhoc.org hơn nữa
                <Link className='ml-1' href='/register'>Đăng ký ngay</Link>
              </Typography>

              <LoginForm />

              <Divider sx={{ my: 3 }}>
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  ĐĂNG NHẬP BẰNG
                </Typography>
              </Divider>

              <Stack direction='row' spacing={2}>
                {socialLogin.google &&
                  <Button
                    onClick={() => login(socialLogin.google)}
                    fullWidth size='large'
                    color='inherit'
                    variant='outlined'
                  >
                    <Iconify icon='eva:google-fill' color='#DF3E30' width={22} height={22} />
                  </Button>}

                {socialLogin.facebook &&
                  <Button onClick={() => login(socialLogin.facebook)} fullWidth size='large' color='inherit' variant='outlined'>
                    <Iconify icon='eva:facebook-fill' color='#1877F2' width={22} height={22} />
                  </Button>}

                {socialLogin.twitter &&
                  <Button fullWidth size='large' color='inherit' variant='outlined'>
                    <Iconify icon='eva:twitter-fill' color='#1C9CEA' width={22} height={22} />
                  </Button>}
              </Stack>
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
                display: {
                  lg: 'flex',
                  md: 'flex',
                  sm: 'none',
                  xs: 'none'
                },
                position: 'relative',
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

export default NoSSR(LoginPage)

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
  flexDirection: 'column'
}))

const StyledImg = styled('img')(({ theme }) => ({
  position: 'absolute',
  width: '100%',
  top: 0,
  opacity: 0.5
}))
