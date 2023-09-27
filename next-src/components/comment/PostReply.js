import React, { useContext, useEffect, useRef, useTransition } from 'react'
import { Avatar, Box, CircularProgress, IconButton, Stack } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { postComment } from '@/apis/apis'
import { Context } from '@/hooks/context'

function PostReply ({
  setCommentReply,
  setOpenReply,
  commentReply,
  setComments,
  comment,
  index
}) {
  const {
    control,
    handleSubmit,
    resetField,
    setValue,
    formState: { errors }
  } = useForm()
  const textareaRef = useRef(null)
  const router = useRouter()
  const { article, slug } = router.query
  const [isLoading, startLoading] = useTransition()
  const { user } = useContext(Context)
  const theme = useTheme()

  useEffect(() => {
    setValue('content', `@${comment.user.username} `)
  })

  useEffect(() => {
    console.log(errors)
  }, [errors])

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [textareaRef])

  const handleTextareaChange = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }

  const onSubmmit = (data) => {
    resetField('content')
    startLoading(() => {
      if (article) {
        const commentData = {
          article_id: article.split('.').reverse()[0],
          content: data.content,
          comment_id: comment.id
        }
        postComment(commentData).then(res => {
          const newComment = [...commentReply, res.data]
          // console.log(res.data)
          setCommentReply(newComment)
          setOpenReply(false)
          setComments(prev => {
            prev[index] = {
              ...comment,
              children: newComment
            }
            return prev
          })
        })
      } else {
        const commentData = {
          thread_id: slug.split('.').reverse()[0],
          content: data.content,
          comment_id: comment.id
        }
        postComment(commentData).then(res => {
          const newComment = [...commentReply, res.data]
          setCommentReply(newComment)
          setOpenReply(false)
          setComments(prev => {
            prev[index] = {
              ...comment,
              children: newComment
            }
            return prev
          })
        })
      }
      // const commentData = {
      //   article_id: article,
      //   content: data.content,
      //   comment_id: comment.id
      // }
      // postComment(commentData).then(res => {
      //   const newComment = [...commentReply, res.data]
      //   console.log(res.data)
      //   setCommentReply(newComment)
      //   setOpenReply(false)
      //   setComments(prev => {
      //     prev[index] = {
      //       ...comment,
      //       children: newComment
      //     }
      //     console.log(prev)
      //     return prev
      //   })
      // })
    })
  }

  return (
    <Box sx={{ my: 0, width: '100%' }}>
      <Stack
        direction='row'
        spacing={1}
        justifyContent='start'
        alignItems='start'
        sx={{ width: '100%' }}
      >
        <Box sx={{ width: 'auto', height: 'auto' }}>
          <StyledAccount>
            <Avatar src={user.profileImage} alt='photoURL' />
          </StyledAccount>
        </Box>
        <form className='w-full' onSubmit={handleSubmit(onSubmmit)}>
          <StyledStack>
            <Controller
              name='content'
              control={control}
              required
              defaultValue=''
              render={({ field }) => (
                <StyledTextarea
                  {...field}
                  ref={textareaRef}
                  onChange={e => {
                    handleTextareaChange(e)
                    field.onChange(e)
                  }}
                  style={{ resize: 'none' }}
                  id='comment'
                  placeholder={null}
                />
              )}
            />
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'end'
              }}
            >
              <IconButton
                type='submit'
                disabled={isLoading}
                sx={{
                  color: 'text.secondary',
                  width: '36px',
                  height: '36px'
                }}
              >
                {isLoading
                  ? <CircularProgress size={24} />
                  : <Iconify icon='iconamoon:send-fill' size='large' color={theme.palette.primary.main} />}
              </IconButton>
            </Box>
          </StyledStack>
        </form>
      </Stack>
    </Box>
  )
}

const StyledAccount = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'start',
  justifyContent: 'end',
  borderRadius: Number(theme.shape.borderRadius) * 1.5
}))

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%', // 100% of the parent
  height: '100%',
  borderRadius: Number(theme.shape.borderRadius) * 1.5
}))

const StyledTextarea = styled('textarea')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  minHeight: '100px',
  border: `1px solid ${theme.palette.grey[300]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1,
  outline: 'none',
  padding: theme.spacing(1),
  backgroundColor: 'transparent',
  fontSize: theme.typography.subtitle2.fontSize
}))

export default PostReply
