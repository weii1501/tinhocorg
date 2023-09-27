import React, { useContext } from 'react'
import { styled } from '@mui/material/styles'
import {
  AppBar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  Modal,
  Toolbar
} from '@mui/material'
import Logo from '@/components/logo'
import Searchbar from '@/components/header-v2/Searchbar'
import Iconify from '@/components/iconify'
import NotificationsPopover from '@/components/header/NotificationsPopover'
import AccountPopover from '@/components/header/AccountPopover'
import { Context } from '@/hooks/context'
import { FormCreateArticle } from '@/components/articles'
import useWebSocket from '@/hooks/useWebSocket'
import useResponsive from '@/hooks/useResponsive'
import SearchbarSlide from '@/components/header-v2/SearchbarSlide'

const HEADER_MOBILE = 64

const HEADER_DESKTOP = 64

const StyledRoot = styled(AppBar)(({ theme }) => ({
  // ...bgBlur({ color: theme.palette.background.default }),
  backgroundColor: theme.palette.background.paper,
  boxShadow: 'none',
  borderBottom: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up('lg')]: {
    width: `calc(100% - ${0}px)`
  }
}))

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}))

function HeaderV2 ({ onOpenNav }) {
  // const theme = useTheme()
  const { user } = useContext(Context)
  const [open, setOpen] = React.useState(false)
  // const { message } = useWebSocket('notifications')
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  // console.log(message)
  return (
    <StyledRoot>
      <StyledToolbar>
        <Grid
          container
          direction='row'
          columns={{
            lg: 12,
            xs: 2
          }}
        >
          {/* Brand */}
          <Grid
            item
            lg={2}
            xs={1}
          >
            <Box
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'start',
                alignItems: 'center',
                paddingLeft: {
                  lg: '40px',
                  xs: '0px'
                }
              }}
            >
              <IconButton
                onClick={onOpenNav}
                sx={{
                  color: 'text.primary',
                  display: { lg: 'none' }
                }}
              >
                <Iconify icon='eva:menu-2-fill' />
              </IconButton>
              <Logo />
            </Box>
          </Grid>

          {/*  tim kiem  */}
          <Grid
            item
            lg={7}
            md={0}
          >
            <Searchbar />
          </Grid>

          {/*  them cau hoi */}
          <Grid
            item
            lg={2}
            md={2}
          >
            <Box
              sx={{
                width: '100%',
                maxHeight: '40px',
                display: {
                  lg: 'flex',
                  xs: 'none'
                },
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              <Button
                onClick={handleOpen}
                variant='contained'
                sx={{
                  height: '40px',
                  fontSize: '12px'
                }}
              >
                <Iconify icon='icons8:plus' sx={{ width: 14, height: 14, marginRight: '2px' }} />
                Thêm câu hỏi
              </Button>
            </Box>
          </Grid>

          {/*    avt */}
          <Grid
            item
            lg={1}
            xs={1}
          >
            <Box
              sx={{
                width: '100%',
                maxHeight: '40px',
                display: 'flex',
                justifyContent: {
                  lg: 'center',
                  xs: 'end'
                },
                alignItems: 'center',
                overflow: 'hidden'
              }}
            >
              <SearchbarSlide />
              {user && <NotificationsPopover />}
              <AccountPopover />
            </Box>
          </Grid>
        </Grid>
      </StyledToolbar>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Card sx={{ p: 2 }}>
            <FormCreateArticle />
          </Card>
        </Box>
      </Modal>
    </StyledRoot>
  )
}

export default HeaderV2

const style = {
  width: '70%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24
}

// const StyledBrand = styled('span')(({ theme }) => ({
//   color: theme.palette.primary.main,
//   height: '100%',
//   textAlign: 'center',
//   display: 'flex',
//   justifyContent: 'center',
//   alignItems: 'center',
//   fontWeight: 'bolder',
//   fontSize: '20px',
//   marginLeft: '8px'
// }))
