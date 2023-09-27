import React, { useEffect, useState } from 'react'
import { Box, Drawer } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import Link from 'next/link'
import { getAllCategories, getTags } from '@/apis/apis'
import { v4 as uuidv4 } from 'uuid'
import { useRouter } from 'next/router'
import useResponsive from '@/hooks/useResponsive'
import Scrollbar from '@/components/scrollbar'

const NAV_WIDTH = 300

function SideBar ({ openNav, onCloseNav }) {
  const router = useRouter()
  const theme = useTheme()
  const [navCategories, setNavCategories] = useState([])
  const [navTags, setNavTags] = useState([])
  const isDesktop = useResponsive('up', 'lg')

  useEffect(() => {
    getAllCategories().then((res) => {
      // console.log(res.data)
      const array = res.data.map((category) => {
        if (category.parent === null) {
          const children = category?.children?.map((child) => {
            return {
              title: child.name,
              path: `/${category.slug}/${child.slug}/`,
              icon: child.icon
            }
          })
          return {
            title: category.name,
            path: `/${category.slug}/`,
            icon: category.icon,
            children
          }
        } else {
          return {
            title: category.name,
            path: `/${category.parent.slug}/${category.slug}/`,
            icon: category.icon
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
          path: `/tag/${tag.slug}/`
        }
      })
      setNavTags([...array])
    })
  }, [])

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box
        component='div'
        sx={{
          flexShrink: { lg: 0 },
          width: {
            lg: 'calc(100%/12 * 2.18)',
            md: NAV_WIDTH - 1,
            sm: NAV_WIDTH - 1,
            xs: NAV_WIDTH - 1
          },
          backgroundColor: 'transparent',
          height: '100px',
          position: 'fixed',
          paddingTop: isDesktop ? '80px' : '16px',
          paddingLeft: {
            lg: '52px',
            md: '52px',
            sm: '8px',
            xs: '8px'
          },
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}
      >
        <Box
          component='nav'
          sx={{
            width: '100%',
            height: 'auto',
            position: 'sticky'
          }}
        >
          <StyledSpan>
            CHUYÊN MỤC
          </StyledSpan>
          {navCategories.map((item) => (
            // eslint-disable-next-line react/jsx-key
            <Box
              component='div'
              key={uuidv4()}
              sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <StyledCategory
                href={item.path}
                onClick={onCloseNav}
                sx={() => {
                  if (router.asPath === item.path) {
                    return {
                      fontWeight: '600',
                      borderLeft: `4px solid ${theme.palette.primary.main}`,
                      backgroundColor: theme.palette.grey[200],
                      color: theme.palette.primary.main,
                      paddingLeft: '12px',
                      '&:hover': {
                        borderLeft: `4px solid ${theme.palette.primary.main}`
                      }
                    }
                  }
                }}
              >
                <Iconify
                  icon={item.icon ?? 'streamline:interface-edit-pin-2-pin-push-thumbtack'}
                  width={12}
                  height={12}
                />
                <StyledSpanItem
                  sx={() => {
                    if (router.asPath === item.path) {
                      return {
                        fontWeight: '600',
                        backgroundColor: theme.palette.grey[200],
                        color: theme.palette.primary.main,
                        paddingLeft: '4px'
                      }
                    }
                  }}
                >
                  {item.title}
                </StyledSpanItem>
              </StyledCategory>

              {router.asPath.includes(item.path) && item.children?.map((child) => (
                <Box
                  component='div'
                  key={uuidv4()}
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    paddingLeft: '14px'
                  }}
                >
                  <StyledCategory
                    href={child.path}
                    onClick={onCloseNav}
                    sx={() => {
                      if (router.asPath.includes(child.path)) {
                        return {
                          fontWeight: '600',
                          borderLeft: `4px solid ${theme.palette.primary.main}`,
                          backgroundColor: theme.palette.grey[200],
                          color: theme.palette.primary.main,
                          paddingLeft: '12px',
                          '&:hover': {
                            borderLeft: `4px solid ${theme.palette.primary.main}`
                          }
                        }
                      }
                    }}
                  >
                    <Iconify
                      icon={child.icon ?? 'la:thumbtack'}
                      width={12}
                      height={12}
                    />
                    <StyledSpanItem
                      sx={() => {
                        if (router.asPath.includes(child.path)) {
                          return {
                            fontWeight: '600',
                            backgroundColor: theme.palette.grey[200],
                            color: theme.palette.primary.main,
                            paddingLeft: '4px'
                          }
                        }
                      }}
                    >
                      {child.title}
                    </StyledSpanItem>
                  </StyledCategory>
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </Scrollbar>
  )

  return (
    <Box
      component='nav'
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH }
      }}
    >
      {isDesktop
        ? (

          <Drawer
            open
            variant='permanent'
            PaperProps={{
              sx: {
                width: 'calc(100%/12 * 2.18)',
                zIndex: 1
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

export default SideBar

const StyledSpan = styled('span')(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: '12px',
  fontWeight: '600'
}))

const StyledSpanItem = styled('span')(({ theme }) => ({
  color: theme.palette.grey[900],
  fontSize: '14px',
  // maxWidth: '135px',
  paddingLeft: '4px'
}))

const StyledCategory = styled(Link)(({ theme }) => ({
  color: theme.palette.grey[900],
  height: 'auto',
  width: '100%',
  fontSize: '14px',
  fontWeight: '400',
  paddingTop: '3px',
  paddingBottom: '3px',
  paddingLeft: '12px',
  textDecoration: 'none',
  display: 'flex',
  alignItems: 'center',
  borderLeft: '4px solid transparent',
  '&:hover': {
    fontWeight: '600'
  }
}))
