import React, { useContext, useEffect, useRef, useTransition } from 'react'
import { Box, Button, Stack } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import { Controller, useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { addNotifications, postComment } from '@/apis/apis'
import { Context } from '@/hooks/context'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'

const validationSchema = yup.object().shape({
  content: yup.string().required('Nội dung không được để trống.')
})

function PostCommemt ({ setComments, comments, data: dataProps }) {
  const {
    control,
    handleSubmit,
    resetField,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const textareaRef = useRef(null)
  const router = useRouter()
  const { article, slug } = router.query
  const [isLoading, startLoading] = useTransition()
  const { user } = useContext(Context)
  const theme = useTheme()

  useEffect(() => {
    console.log(errors)
    if (errors.content) {
      toast.warning(errors.content?.message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
    }
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

  console.log(dataProps)

  const onSubmmit = (data) => {
    resetField('content')
    if (user) {
      if (article) {
        const replacedString = data.content.trim().replace(/\n/g, '</br>')
        // console.log(replacedString)
        const comment = {
          article_id: article.split('.').reverse()[0],
          content: replacedString
        }
        startLoading(() => {
          postComment(comment).then(res => {
            // console.log(res.data)
            const newComments = [res.data, ...comments]
            setComments(newComments)
            const notification = {
              sender: user.id,
              recipient: dataProps.user.id,
              article: dataProps.id,
              thread: '',
              message: 'đã bình luận bài viết của bạn'
            }
            addNotifications(notification).then(res => {
              console.log(res.data)
            })
          })
        })
      } else {
        const comment = {
          thread_id: slug.split('.').reverse()[0],
          content: data.content
        }
        postComment(comment).then(res => {
          // console.log(res.data)
          const newComments = [res.data, ...comments]
          setComments(newComments)
        })
      }
    } else {
      toast.warning('Bạn cần đăng nhập để bình luận.', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        mb: 3,
        '& > span': {
          fontSize: '18px',
          fontWeight: 'bold',
          color: theme.palette.grey[900]
        }
      }}
    >
      <span>
        Bình luận
      </span>
      <form onSubmit={handleSubmit(onSubmmit)}>
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
          <Stack
            direction='row'
            spacing={1}
            alignItems='center'
            justifyContent='flex-end'
            mt={1}
          >
            <Button
              type='submit'
              variant='contained'
              disabled={isLoading}
              sx={{
                color: 'text.white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Iconify icon='mdi:message-outline' width={20} height={20} sx={{ mr: 1 }} />
              Bình luận
            </Button>
          </Stack>
        </StyledStack>
      </form>
    </Box>
  )
}

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%', // 100% of the parent
  height: '100%'
  // padding: theme.spacing(1),
  // borderRadius: Number(theme.shape.borderRadius) * 1.5,
  // backgroundColor: theme.palette.grey[200]
}))

const StyledTextarea = styled('textarea')(({ theme }) => ({
  width: '100%',
  height: 'auto',
  minHeight: '100px',
  border: `1px solid ${theme.palette.grey[400]}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  outline: 'none',
  padding: theme.spacing(1),
  backgroundColor: 'transparent',
  fontSize: theme.typography.subtitle2.fontSize,
  marginTop: '16px'
}))

export default PostCommemt
