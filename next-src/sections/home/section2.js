import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'

function Section2 () {
  const theme = useTheme()
  return (
    <Box
      sx={{
        width: '100%',
        mt: '64px'
      }}
    >
      <Stack
        direction={{
          lg: 'row',
          md: 'row',
          sm: 'column',
          xs: 'column'
        }}
        spacing={2}
        sx={{
          width: '100%'
        }}

      >
        <Box
          sx={{
            width: {
              lg: '50%',
              md: '50%',
              sm: '100%',
              xs: '100%'
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            src='/assets/images/covers/cover_3.jpg'
            alt='cover'
            width={500}
            height={500}
            loading='lazy'
            style={{
              borderRadius: '16px'
            }}
          />
        </Box>
        <Box
          sx={{
            width: {
              lg: '50%',
              md: '50%',
              sm: '100%',
              xs: '100%'
            },
            display: 'flex',
            justifyContent: 'start',
            alignItems: 'start'
          }}
        >
          <Stack
            direction='column'
            spacing={2}
          >
            <span
              style={{
                color: theme.palette.grey[300],
                fontSize: '14px',
                paddingLeft: '16px',
                borderLeft: '1px solid #fff'
              }}
            >
              Webtinhoc Có Những Gì?
            </span>

            <Styledh2>
              Chuyên về công nghệ, kỹ thuật lập trình
            </Styledh2>
            {intro.map((item, index) => (
              <Stack
                key={`${index}.${item.title}`}
                direction='row'
                spacing={4}
                alignItems='center'
                justifyContent='start'
              >
                <span
                  style={{
                    backgroundColor: '#565a6a',
                    color: theme.palette.grey[300],
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '70px',
                    height: '70px',
                    borderRadius: '24px',
                    fontSize: '20px',
                    fontWeight: '700'
                  }}
                >
                  {item.title}
                </span>
                <Styledp>
                  {item.content}
                </Styledp>
              </Stack>
            ))}
          </Stack>
        </Box>
      </Stack>
    </Box>
  )
}

export default Section2

const Styledh2 = styled('h2')(({ theme }) => ({
  fontSize: '52px',
  fontWeight: '700',
  lineHeight: '1.2',
  width: '70%',
  color: theme.palette.grey[100],
  [theme.breakpoints.down('sm')]: {
    /* Thay đổi các thuộc tính CSS cho kích thước màn hình nhỏ hơn hoặc bằng 'sm' (small) */
    fontSize: '40px',
    textAlign: 'start',
    width: '100%'
  }
}))

const Styledp = styled('p')(({ theme }) => ({
  fontSize: '18px',
  maxWidth: '300px',
  display: 'flex',
  alignItems: 'center',
  color: theme.palette.grey[300],
  [theme.breakpoints.down('sm')]: {
    /* Thay đổi các thuộc tính CSS cho kích thước màn hình nhỏ hơn hoặc bằng 'sm' (small) */
    maxWidth: '60%'
  }
}))

const intro = [
  {
    title: '01',
    content: 'Cung cấp những bài viết có tính hữu dụng và thực tế'
  },
  {
    title: '02',
    content: 'Phát triển của cộng đồng, tranh luận cùng nhau'
  },
  {
    title: '03',
    content: 'Đăng ký thành viên và gửi bài viết và được nhuận bút'
  }
]
