import React from 'react'
import styled from '@emotion/styled'
import tw from 'twin.macro'
import dayjs from 'dayjs'
import { BRAND_NAME } from '@/constants'
import Logo from '@/components/logo'
import Link from 'next/link'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import { useTheme } from '@mui/material/styles'
import { Box, Stack } from '@mui/material'
import Iconify from '@/components/iconify'

function SiteFooter (props) {
  const theme = useTheme()
  // console.log(router)
  const isDesktop = theme.breakpoints.up('lg')
  return (
    <Box
      component='footer'
      sx={{
        py: 3,
        backgroundColor: theme.palette.grey[100],
        zIndex: 50,
        position: 'relative',
        margin: 'auto',
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'start'
      }}
    >
      <Box
        component='div'
        sx={{
          width: {
            lg: 'calc(100% - 650px)',
            md: '100%',
            sm: '100%',
            xs: '100%'
          },
          px: 3,
          height: '100%'
        }}
      >
        <Stack
          direction={{
            lg: 'row',
            md: 'row',
            xs: 'column'
          }}
          alignItems='start'
          justifyContent='space-around'
          spacing={2}
          sx={{ width: '100%', height: '100%' }}
        >
          <Box
            component='div'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'column',
              height: '100%'
            }}
          >
            <Box
              component='div'
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'start'
              }}
            >
              <Logo footer />
            </Box>
            <Stack
              direction='row'
              alignItems='start'
              justifyContent='start'
              spacing={2}
              mt={1}
            >
              {socialLinks?.map((item, index) => (
                <Box
                  component={Link}
                  href={item.url}
                  key={uuidv4()}
                  target='_blank'
                  sx={{
                    color: theme.palette.grey[500],
                    width: 40,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    border: `1px solid ${theme.palette.grey[500]}`
                  }}
                >
                  <Iconify icon={item.icon} sx={{ width: 30, height: 30 }} />
                </Box>
              ))}
            </Stack>
          </Box>

          {footerLinks?.map((section, index) => (
            <Box
              key={uuidv4()}
              component='div'
              sx={{
                width: 'auto',
                height: '100%',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'start'
              }}
            >
              <Stack
                direction='column'
                alignItems='start'
                justifyContent='start'
                spacing={1}
              >
                <StyledFirst href='/'>
                  {section.title}
                </StyledFirst>
                <Stack
                  direction={{
                    lg: 'column',
                    md: 'column',
                    xs: 'row'
                  }}
                  alignItems='start'
                  justifyContent='start'
                  spacing={1}
                  useFlexGap
                  flexWrap='wrap'
                >
                  {section.list?.map((item, index) => (
                    // eslint-disable-next-line react/jsx-pascal-case
                    <LINK key={uuidv4()} href={item.url}>
                      {item.title}
                    </LINK>
                  ))}
                </Stack>
              </Stack>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}

export default SiteFooter

const LI = styled('li')(({ theme }) => ({
  listStyle: 'none'
}))

const LINK = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.grey[700],
  fontSize: '14px'
}))

const StyledFirst = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  textDecoration: 'none',
  color: theme.palette.grey[800],
  fontWeight: 'bold'
}))

const socialLinks = [
  {
    title: 'Twitter',
    url: 'https://www.youtube.com/@tinhocorg',
    icon: 'uit:twitter-alt'
  },
  {
    title: 'Facebook',
    url: 'https://www.facebook.com/tinhoc.org/',
    icon: 'uit:facebook-f'
  },
  {
    title: 'Youtube',
    url: 'https://www.facebook.com/tinhoc.org/',
    icon: 'uit:youtube'
  }
]

const footerLinks = [
  {
    title: 'Company',
    url: '#',
    list: [
      {
        title: 'Teams',
        url: '#'
      },
      {
        title: 'Advertising',
        url: '#'
      },
      {
        title: 'Collectives',
        url: '#'
      },
      {
        title: 'Talent',
        url: '#'
      }
    ]
  },
  {
    title: 'Support',
    url: '#',
    list: [
      {
        title: 'About',
        url: '#'
      },
      {
        title: 'Press',
        url: '#'
      },
      {
        title: 'Work Here',
        url: '#'
      },
      {
        title: 'Legal',
        url: '#'
      },
      {
        title: 'Privacy Policy',
        url: '#'
      },
      {
        title: 'Terms of Service',
        url: '#'
      },
      {
        title: 'Contact Us',
        url: '#'
      },
      {
        title: 'Cookie Settings',
        url: '#'
      },
      {
        title: 'Cookie Policy',
        url: '#'
      }
    ]
  },
  {
    title: 'Network',
    url: '#',
    list: [
      {
        title: 'Technology',
        url: '#'
      },
      {
        title: 'Culture & recreation',
        url: '#'
      },
      {
        title: 'Life & arts',
        url: '#'
      },
      {
        title: 'Professional & career',
        url: '#'
      }
    ]
  }
]
