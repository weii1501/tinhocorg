import React from 'react'
import { Box } from '@mui/material'
import { styled } from '@mui/material/styles'
import Link from 'next/link'

function Section3 () {
  return (
    <Box
      sx={{
        width: '100%',
        mt: '64px',
        mx: 'auto',
        px: {
          lg: '50px',
          md: '50px',
          sm: '16px',
          xs: '16px'
        },
        display: 'flex',
        flexDirection: {
          lg: 'row',
          md: 'row',
          sm: 'column',
          xs: 'column'
        },
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <img
        src='/assets/icons/home-ic/community-svgrepo-com.svg'
        alt='community-svgrepo-com.svg'
        title='community-svgrepo-com.svg'
        height={48}
        width={48}
        loading='lazy'
      />
      <Styledh3>
        Tham gia vào <strong>cộng đồng Webtinhoc</strong> để nhận được nhiều thông tin hữu ích
      </Styledh3>
      <StyledLink href='/login'>
        Đăng nhập ngay
      </StyledLink>
    </Box>
  )
}

export default Section3

const Styledh3 = styled('h3')(({ theme }) => ({
  fontSize: '17px',
  paddingLeft: '20px',
  paddingRight: '20px',
  color: theme.palette.grey[800],
  [theme.breakpoints.down('sm')]: {
    /* Thay đổi các thuộc tính CSS cho kích thước màn hình nhỏ hơn hoặc bằng 'sm' (small) */
    paddingLeft: '0',
    paddingRight: '0',
    paddingTop: '16px',
    paddingBottom: '16px',
    textAlign: 'center'
  }
}))

const StyledLink = styled(Link)(({ theme }) => ({
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#0074cc',
  border: '1px solid #0074cc',
  borderRadius: '4px',
  padding: '8px 16px',
  '&:hover': {
    backgroundColor: '#eff9ff'
  },
  textDecoration: 'none'
}))
