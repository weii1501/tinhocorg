import React from 'react'
import { Avatar, Box, Stack, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import { StyledDate } from '@/components/articles/styles'
import { fDateTime } from '@/utils/formatTime'
import Iconify from '@/components/iconify'

function CommentReply ({ reply }) {
  const theme = useTheme()

  return (
    <Stack
      direction='row'
      spacing={1}
      justifyContent='start'
      alignItems='start'
      mt={1}
    >
      <Box sx={{ width: 'auto' }}>
        <StyledAccount>
          <Avatar src={reply.user.profileImage} alt='photoURL' />
        </StyledAccount>
      </Box>
      <Stack
        direction='column'
        alignItems='start'
        justifyContent='start'
      >
        <StyledMessage>
          <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
            @{reply.user.username}
          </Typography>
          <StyledDate>
            {fDateTime(reply.createdAt)}
          </StyledDate>
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {reply.content}
          </Typography>
        </StyledMessage>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            mt: 1,
            mb: 2,
            color: theme.palette.grey[500]
          }}
        >
          <Stack
            direction='row'
            spacing={2}
            justifyContent='start'
            alignItems='center'
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& span': {
                  fontSize: '14px',
                  pl: '2px'
                }
              }}
            >
              <Iconify icon='bx:like' width={18} height={18} />
              <span>12</span>
            </Box>
          </Stack>
        </Box>
      </Stack>

    </Stack>
  )
}

export default CommentReply

const StyledAccount = styled('div')(({ theme }) => ({
  width: '100%', // 100% of the parent
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'end',
  borderRadius: Number(theme.shape.borderRadius) * 1.5
}))

const StyledMessage = styled('div')(({ theme }) => ({
  width: '100%', // 100% of the parent
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  flexDirection: 'column',
  borderRadius: Number(theme.shape.borderRadius) * 1.5
}))
