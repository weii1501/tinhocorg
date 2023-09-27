import PropTypes from 'prop-types'
import { useContext, useEffect, useState } from 'react'

// @mui
import { alpha, styled } from '@mui/material/styles'
import {
  Avatar,
  Box,
  Button,
  Drawer,
  Link,
  Stack,
  Typography
} from '@mui/material'
// mock
// hooks
import useResponsive from '@/hooks/useResponsive'
// components
import Logo from '@/components/logo'
import Scrollbar from '@/components/scrollbar'
import NavSection from '@/components/nav/nav-section'
//
import { useRouter } from 'next/router'
import { Context } from '@/hooks/context'
import { getAllCategories, getTags } from '@/apis/apis'
import SvgColor from '@/components/svg-color'
import Iconify from '@/components/iconify'

// ----------------------------------------------------------------------

const NAV_WIDTH = 280

const HEADER_DESKTOP = 64

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12)
}))

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func
}

export default function Nav ({ openNav, onCloseNav }) {
  const router = useRouter()
  const { pathname } = router
  const { user } = useContext(Context)
  const [categortiesExpand, setCategoriesExpand] = useState(false)
  const [tagsExpand, setTagsExpand] = useState(false)
  const [navCategories, setNavCategories] = useState([])
  const [navTags, setNavTags] = useState([])

  useEffect(() => {
    getAllCategories().then((res) => {
      // console.log(res.data)
      const array = res.data.map((category) => {
        if (category.parent === null) {
          return {
            title: category.name,
            path: `/${category.slug}/`,
            icon: icon('ic_tags')
          }
        } else {
          return {
            title: category.name,
            path: `/${category.parent.slug}/${category.slug}/`,
            icon: icon('ic_tags')
          }
        }
      })
      // console.log(array)
      setNavCategories([...array])
    })

    getTags().then((res) => {
      // console.log(res.data)
      const array = res.data?.data?.map((tag) => {
        return {
          title: tag.name,
          path: `/tag/${tag.slug}/`,
          icon: icon('ic_tags')
        }
      })
      setNavTags([...array])
    })
  }, [])

  const isDesktop = useResponsive('up', 'lg')

  useEffect(() => {
    if (openNav) {
      onCloseNav()
    }
  }, [pathname])

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3, display: 'inline-flex' }}>
        <Logo />
      </Box>

      {user && (
        <Box sx={{ mb: 5, mx: 2.5 }}>
          <Link underline='none'>
            <StyledAccount>
              <Avatar
                src={user?.profileImage}
                alt='photoURL'
                imgProps={{
                  width: '500',
                  height: '600',
                  loading: 'lazy',
                  title: 'avt-user'
                }}
              />

              <Box sx={{ ml: 2 }}>
                <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                  {user?.username}
                </Typography>

                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  admin
                </Typography>
              </Box>
            </StyledAccount>
          </Link>
        </Box>
      )}

      <Box
        sx={{
          height: 640
          // overflowY: 'scroll'
        }}
      >
        <Button
          fullWidth
          onClick={() => setCategoriesExpand(!categortiesExpand)}
          variant='text'
          sx={{
            textAlign: 'left',
            justifyContent: 'left'
          }}
        >
          <Stack
            spacing={1}
            direction='row'
            alignItems='center'
            justifyContent='start'
            pl={2}
          >
            <Iconify icon={categortiesExpand ? 'teenyicons:down-solid' : 'teenyicons:right-solid'} sx={{ width: 14, height: 14 }} />
            <StyledSpan>
              Tất Cả Chuyên Mục
            </StyledSpan>
          </Stack>
        </Button>
        {categortiesExpand && <NavSection data={navCategories} />}

        <Button
          fullWidth
          onClick={() => setTagsExpand(!tagsExpand)}
          variant='text'
          sx={{
            textAlign: 'left',
            justifyContent: 'left'
          }}
        >
          <Stack
            spacing={1}
            direction='row'
            alignItems='center'
            justifyContent='start'
            pl={2}
          >
            <Iconify icon={tagsExpand ? 'teenyicons:down-solid' : 'teenyicons:right-solid'} sx={{ width: 14, height: 14 }} />
            <StyledSpan>
              Tất Cả Tags
            </StyledSpan>
          </Stack>
        </Button>
        {tagsExpand && <NavSection data={navTags} />}
      </Box>
    </Scrollbar>
  )

  return (
    <Box
      component='nav'
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop
        ? (
          <Drawer
            open
            variant='permanent'
            PaperProps={{
              sx: {
                width: NAV_WIDTH,
                bgcolor: 'background.default',
                borderRightStyle: 'dashed'
              }
            }}
          >
            {renderContent}
          </Drawer>
          )
        : (
          <Drawer
            open={openNav}
            onClose={onCloseNav}
            ModalProps={{
              keepMounted: true
            }}
            PaperProps={{
              sx: { width: NAV_WIDTH }
            }}
          >
            {renderContent}
          </Drawer>
          )}
    </Box>
  )
}

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />

const StyledSpan = styled('span')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontSize: '14px'
}))
