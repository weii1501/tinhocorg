import React from 'react'
// @mui
import { styled } from '@mui/material/styles'
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Stack,
  Toolbar
} from '@mui/material'
import { bgBlur } from '@/utils/cssStyles'
import Iconify from '@/components/iconify'
import { useRouter } from 'next/router'
import Logo from '@/components/logo'

const HEADER_MOBILE = 64

const HEADER_DESKTOP = 92

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  boxShadow: 'none',
  [theme.breakpoints.up('lg')]: {
    width: '100%'
  }
}))

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,
  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}))

function Header (props) {
  const router = useRouter()
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <StyledRoot>
      <StyledToolbar>
        <IconButton
          onClick={() => console.log('click')}
          type='button'
          sx={{
            mr: 1,
            color: 'text.primary',
            display: { lg: 'none' }
          }}
        >
          <Iconify icon='eva:menu-2-fill' />
        </IconButton>
        <Box sx={{ mt: 1, px: 2.5, py: 3, display: 'inline-flex' }}>
          <Logo />
        </Box>

        <Input
          autoFocus
          fullWidth
          disableUnderline
          placeholder='Search…'
          startAdornment={
            <InputAdornment position='start'>
              <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', width: 20, height: 20 }} />
            </InputAdornment>
          }
          sx={{
            mr: 1,
            fontWeight: 'fontWeightBold',
            maxWidth: '1000px',
            border: '1px solid #e0e0e0',
            borderRadius: '4px',
            padding: '4px 8px',
            display: { lg: 'flex', md: 'flex', sm: 'none', xs: 'none' }
          }}
        />

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction='row'
          alignItems='center'
          spacing={{
            xs: 0.5,
            sm: 1
          }}
        >
          <Button
            type='button'
            variant='outlined'
            onClick={() => router.push('/login')}
            sx={{
              fontSize: {
                lg: '14px',
                md: '12px',
                sm: '10px',
                xs: '8px'
              },
              p: {
                lg: '5px 15px',
                md: '4px 10px',
                sm: '2px 4px',
                xs: '2px 4px'
              }
            }}
          >
            Log in
          </Button>
          <Button
            type='button'
            variant='outlined'
            onClick={() => router.push('/register')}
            sx={{
              backgroundColor: '#296bd3',
              color: '#fff',
              fontSize: {
                lg: '14px',
                md: '12px',
                sm: '10px',
                xs: '8px'
              },
              p: {
                lg: '5px 15px',
                md: '4px 10px',
                sm: '2px 4px',
                xs: '2px 4px'
              },
              '&:hover': {
                color: '#296bd3'
              }
            }}
          >
            Sign up
          </Button>
        </Stack>
      </StyledToolbar>
    </StyledRoot>
  )
}

export default Header

const style = {
  width: '70%',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  boxShadow: 24
}
