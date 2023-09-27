import React from 'react'
import { Avatar, Box, Stack } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import {
  StyledDate, Styledp,
  StyledTitle,
  StyledUsername
} from '@/components/articles/styles'
import Link from 'next/link'
import { fDateTime } from '@/utils/formatTime'

function ActivityItem ({ article, value }) {
  const theme = useTheme()
  const redict = value === 'articles' ? 'article' : 'thread'
  // console.log(article)
  return (
    <Box
      sx={{
        // width: '100%',
        height: 'auto',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: '4px',
        padding: '12px',
        maxWidth: '350px'
      }}
    >
      <Stack
        direction='row'
        spacing={1}
        justifyContent='start'
        alignItems='start'
      >
        <Avatar
          src={article?.user?.profileImage}
          alt='avatar'
          sx={{
            width: 34,
            height: 34
          }}
          imgProps={{
            width: '100%',
            height: 'auto',
            loading: 'lazy'
          }}
        />

        <Stack
          direction='column'
          justifyContent='start'
          alignItems='start'
        >
          <StyledUsername href={`/user/${article?.user?.username}.${article?.user?.id}?type=article`}>
            @{article?.user?.username}
          </StyledUsername>
          <StyledDate
            sx={{
              marginTop: '0px'
            }}
          >
            {fDateTime(article?.createdAt)}
          </StyledDate>
        </Stack>
      </Stack>

      <Stack
        direction='column'
        spacing={0}
      >
        <StyledTitle
          href={`/${redict}/${article?.slug}.${article?.id}`}
          sx={{
            fontSize: '14px',
            display: 'inline-block', /* Đảm bảo liên kết hiển thị trên cùng một dòng */
            whiteSpace: 'nowrap', /* Ngăn chặn ngắt dòng cho nội dung dài */
            overflow: 'hidden', /* Ẩn phần nội dung vượt quá kích thước của thẻ */
            textOverflow: 'ellipsis' /* Hiển thị '...' cho nội dung vượt quá kích thước */
            // maxWidth: '100%' /* Giới hạn chiều rộng của thẻ */
          }}
        >
          {article?.title}
        </StyledTitle>

        <Styledp
          sx={{
            // width: '100%',
            color: theme.palette.grey[700],
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            lineHeight: '20px',
            maxHeight: '63px',
            marginBottom: '0px',
            minHeight: '63px'
          }}
        >
          {article?.articleDescription ?? article?.content}
        </Styledp>

        <Box
          component={Link}
          href={`/${redict}/${article?.slug}.${article?.id}`}
          sx={{
            // width: '100%',
            textAlign: 'right',
            fontSize: '13px',
            fontWeight: '600',
            textDecoration: 'none',
            color: theme.palette.primary.main
          }}
        >
          xem chi tiết
        </Box>
      </Stack>
    </Box>
  )
}

export default ActivityItem
