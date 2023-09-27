import React, { useEffect } from 'react'
import { Avatar, Box, Button, Divider, Stack } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getAboutUser } from '@/apis/apis'
import {numberFormatter} from "@/utils/utils";

function UserInfor () {
  const router = useRouter()
  const theme = useTheme()
  const [user, setUser] = React.useState(null)

  useEffect(() => {
    getAboutUser(router.query.slug.split('.').pop()).then(res => setUser(res.data.data.user))
  }, [router.query.slug])

  return (
    <>
      {user && (
        <>
          <Box
            sx={{
              width: '200px',
              height: 'auto',
              mt: '82px',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '4px',
              padding: '8px',
              [theme.breakpoints.down('lg')]: {
                display: 'none'
              }
            }}
          >
            <Stack
              direction='column'
              spacing={2}
              justifyContent='center'
              alignItems='center'
              divider={<Divider flexItem />}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Avatar
                  src={user?.profileImage}
                  alt='avatar'
                  sx={{
                    width: '170px',
                    height: '170px'
                  }}
                  imgProps={{
                    width: '100%',
                    height: 'auto',
                    loading: 'lazy'
                  }}
                />

                <StyledUsername>
                  @{user?.username}
                </StyledUsername>
              </Box>

              <Box
                sx={{
                  width: '100%',
                  height: 'auto',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Stack
                  direction='row'
                  spacing={3}
                  justifyContent='center'
                  alignItems='center'
                >
                  {listIcon.map((item) => (
                    <Link
                      key={uuidv4()}
                      href={item.url}
                    >
                      <Iconify
                        icon={item.icon}
                        color={theme.palette.grey[500]}
                        width={24}
                        height={24}
                      />
                    </Link>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Box>

          <Box
            sx={{
              width: '200px',
              height: 'auto',
              mt: '12px',
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: '4px',
              padding: '8px',
              [theme.breakpoints.down('lg')]: {
                display: 'none'
              }
            }}
          >
            <Stack
              direction='row'
              spacing={0}
              justifyContent='space-around'
              alignItems='center'
              divider={<Divider orientation='vertical' flexItem />}
            >
              <Stack
                direction='column'
                spacing={0}
                justifyContent='space-between'
                alignItems='center'
                sx={{
                  '& span': {
                    color: theme.palette.grey[900],
                    fontSize: '14px'
                  }
                }}
              >
                <span>
                  {numberFormatter(user?.totalArticles, 1)}
                </span>
                <span>
                  Bài viết
                </span>
              </Stack>

              <Stack
                direction='column'
                spacing={0}
                justifyContent='space-between'
                alignItems='center'
                sx={{
                  '& span': {
                    color: theme.palette.grey[900],
                    fontSize: '14px'
                  }
                }}
              >
                <span>
                  {numberFormatter(user?.totalThreads,  1)}
                </span>
                <span>
                  Câu hỏi
                </span>
              </Stack>
            </Stack>
          </Box>

          <Box
            sx={{
              width: '200px',
              height: 'auto',
              mt: '12px',
              [theme.breakpoints.down('lg')]: {
                display: 'none'
              }
            }}
          >
            <Button
              variant='contained'
              color='primary'
              fullWidth
            >
              Theo dõi
            </Button>
          </Box>
        </>
      )}

    </>
  )
}

export default UserInfor

const StyledUsername = styled('span')(({ theme }) => ({
  color: theme.palette.grey[900],
  fontSize: '18px',
  fontWeight: '600',
  marginTop: '8px'
}))

const listIcon = [
  {
    url: '#',
    icon: 'ri:github-line'
  },
  {
    url: '#',
    icon: 'mingcute:ins-line'
  },
  {
    url: '#',
    icon: 'eva:facebook-outline'
  }
]
