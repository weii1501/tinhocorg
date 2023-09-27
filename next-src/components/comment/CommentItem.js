import React, { useEffect } from 'react'
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import ReactHtmlParser from 'react-html-parser'
import { StyledDate } from '@/components/articles/styles'
import { fDateTime } from '@/utils/formatTime'
import Iconify from '@/components/iconify'
import PostReply from '@/components/comment/PostReply'
import CommentReply from '@/components/comment/CommentReply'

function CommentItem ({
  comment,
  setComments,
  index
}) {
  const [commentReply, setCommentReply] = React.useState(comment.children)
  const [openReply, setOpenReply] = React.useState(false)
  const [expanded, setExpanded] = React.useState(false)
  const theme = useTheme()
  useEffect(() => {
    setCommentReply(comment.children)
  }, [comment])
  // console.log(comment)
  const handleReply = () => {
    console.log('reply')
    setOpenReply(!openReply)
  }

  return (
    <Stack
      direction='row'
      spacing={1}
      justifyContent='start'
      alignItems='start'
      sx={{ width: '100%' }}
    >
      <Box sx={{ width: 'auto' }}>
        <Avatar
          src={comment.user.profileImage}
          alt='photoURL'
          imgProps={{
            width: '500',
            height: '600',
            loading: 'eager'
          }}
        />
      </Box>
      <Stack
        direction='column'
        alignItems='start'
        justifyContent='start'
        sx={{ width: '100%' }}
      >
        <StyledMessage>
          <StyledUsername>
            @{comment.user.username}
          </StyledUsername>
          <StyledDate>
            {fDateTime(comment.createdAt)}
          </StyledDate>
          <Typography variant='body2' sx={{ color: 'text.primary' }}>
            {ReactHtmlParser(comment.content)}
          </Typography>
        </StyledMessage>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            mt: 1,
            mb: 1,
            color: theme.palette.grey[700]
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

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& span': {
                  fontSize: '14px',
                  pl: '2px'
                },
                '& span:hover': {
                  cursor: 'pointer',
                  color: theme.palette.primary.main
                }
              }}
            >
              <Iconify icon='fluent-mdl2:reply-mirrored' width={18} height={18} />
              <span onClick={handleReply}>Trả lời</span>
            </Box>
          </Stack>
        </Box>

        {openReply &&
          <PostReply
            comment={comment}
            setCommentReply={setCommentReply}
            setOpenReply={setOpenReply}
            setComments={setComments}
            commentReply={commentReply}
            index={index}
          />}

        <Box
          sx={{
            // display: 'flex',
            display: commentReply.length > 0 ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'space-between',
            cursor: 'pointer',
            mb: 1,
            transform: openReply ? 'translateY(-30px)' : 'translateY(0)',
            '& span': {
              color: theme.palette.primary.main,
              fontSize: '12px'
            }
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Iconify icon={expanded ? 'mingcute:up-line' : 'mingcute:down-line'} size='large' color={theme.palette.grey[400]} />
          <span>{expanded ? 'Ẩn các câu trả lời' : 'Hiên các câu trả lời'} </span>
        </Box>

        {expanded &&
          <Stack
            direction='column'
            alignItems='start'
            justifyContent='start'
            sx={{ width: '100%' }}
            divider={<Divider flexItem />}
          >

            {commentReply && commentReply.map((reply, index) => (
              <CommentReply key={index} reply={reply} />
            ))}
          </Stack>}
      </Stack>

      {/* <Grid item xs={4} sm={5} md={15} lg={15}> */}
      {/*  {commentReply && commentReply.map((reply, index) => ( */}
      {/*    <CommentReply key={index} reply={reply} /> */}
      {/*  ))} */}
      {/*  {openReply && */}
      {/*    <PostReply */}
      {/*      comment={comment} */}
      {/*      setCommentReply={setCommentReply} */}
      {/*      setOpenReply={setOpenReply} */}
      {/*      setComments={setComments} */}
      {/*      commentReply={commentReply} */}
      {/*      index={index} */}
      {/*    />} */}
      {/* </Grid> */}
    </Stack>
  )
}

export default CommentItem

const StyledMessage = styled('div')(({ theme }) => ({
  width: '100%', // 100% of the parent
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'start',
  flexDirection: 'column'
}))

const StyledUsername = styled('span')(({ theme }) => ({
  fontSize: '14px',
  fontWeight: '700',
  color: 'text.primary',
  '&:hover': {
    color: 'primary.main',
    textDecoration: 'underline'
  }
}))
