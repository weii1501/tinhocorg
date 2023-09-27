import React, { useContext, useEffect, useState } from 'react'
// mui
import { styled, useTheme } from '@mui/material/styles'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import { Context } from '@/hooks/context'
import { Grid } from '@mui/material'
import UserInfor from '@/components/side-bar/UserInfor'

// ----------------------------------------------------------------------

const GoTop = dynamic(() => import('@/components/GoTop'), { ssr: false })
const Toast = dynamic(() => import('@/components/Toast'), { ssr: false })
const HeaderV2 = dynamic(() => import('@/components/header-v2'), { ssr: false })
const SideBar = dynamic(() => import('@/components/side-bar'), { ssr: false })
const SidebarRight = dynamic(() => import('@/components/side-bar/SidebarRight'), { ssr: false })
const SiteFooter = dynamic(() => import('@/components/SiteFooter'), { ssr: false })

const ignoreHeaderURLsList = [
  'rgx:^/auth',
  'rgx:^/lien-ket'
]

const APP_BAR_MOBILE = 64
const APP_BAR_DESKTOP = 64

const listHideLeftSideBar = ['/article/[article]', '/thread/[slug]', '/privacy']
const listHideRightSideBar = ['/privacy']
const center = ['/privacy']

function SiteLayout (props) {
  // const [open, setOpen] = React.useState(false)
  const theme = useTheme()
  const router = useRouter()
  const { user } = useContext(Context)
  const [open, setOpen] = useState(false)

  // console.log('router', router)
  const isGetLeftSideBar = () => {
    if (listHideLeftSideBar.includes(router.pathname)) {
      return false
    }
    return true
  }
  for (const i of ignoreHeaderURLsList) {
    if (i.startsWith('rgx')) {
      const rgxStr = i.split(':')[1]
      if (router.pathname.match(new RegExp(rgxStr))) {
        return <>{props.children}</>
      }
    } else if (i === router.pathname) return <>{props.children}</>
  }

  useEffect(() => {
    if (user) {
      router.replace('/home')
    }
  }, [])

  return (
    <>
      <StyledRoot>
        {/* {router.pathname !== '/' && <Header onOpenNav={() => setOpen(true)} />} */}
        {/* {router.pathname !== '/' && <Nav openNav={open} onCloseNav={() => setOpen(false)} />} */}
        {/* {router.pathname === '/' && <HomeHeader />} */}
        <HeaderV2 onOpenNav={() => setOpen(true)} />
        <StyledGrid
          container
          direction='row'
          columns={12}
          justifyContent={center.includes(router.pathname) ? 'center' : 'flex-start'}
          alignItems={center.includes(router.pathname) ? 'center' : 'flex-start'}
        >
          <Grid
            item
            lg={isGetLeftSideBar() ? 2 : 0}
            sx={{
              position: 'relative',
              // borderRight: router.pathname !== '/user/[slug]' && `1px solid ${theme.palette.divider}`,
              overflow: 'hidden',
              display: isGetLeftSideBar() ? 'block' : 'none'
            }}
          >
            {router.pathname === '/user/[slug]' ? <UserInfor /> : <SideBar openNav={open} onCloseNav={() => setOpen(false)} />}
          </Grid>

          <Grid
            item
            lg={isGetLeftSideBar() ? 8 : 10}
            md={12}
            sm={12}
            xs={12}
          >
            <StyledContent>
              <Main>
                {props.children}
              </Main>
            </StyledContent>
          </Grid>

          <Grid
            item
            lg={2}
            md={0}
            sm={0}
            xs={0}
            sx={{
              position: 'relative',
              borderLeft: `1px solid ${theme.palette.divider}`,
              overflow: 'hidden',
              display: listHideRightSideBar.includes(router.pathname) ? 'none' : 'block'
            }}
          >
            <SidebarRight />
          </Grid>

        </StyledGrid>
        <GoTop />
        <Toast />
      </StyledRoot>
      <SiteFooter />
    </>
  )
}

export default SiteLayout

const StyledRoot = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden',
  zIndex: 40
})

const StyledContent = styled('div')({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
})

const Main = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100vh',
  paddingTop: APP_BAR_MOBILE + 8,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 8,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}))

const StyledGrid = styled(Grid)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(0, 5)
  }
}))
