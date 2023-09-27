'use client'
import React, { useTransition } from 'react'
import {
  Autocomplete,
  Box,
  Button, darken,
  Input, lighten,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import 'react-quill/dist/quill.snow.css'
import dynamic from 'next/dynamic'
import { styled, useTheme } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import {
  adminUpdateThread,
  getAllTopic,
  getTags,
  postNewArticle,
  postThread
} from '@/apis/apis'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import * as PropTypes from 'prop-types'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const TOOLBAR_OPTIONS = [
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['bold', 'italic', 'underline'],
  [{ align: [] }],
  ['image', 'blockquote'],
  ['clean']
]

function FormCreateArticle ({ thread, tags: tagsProp, topics: topicsProp, update, article }) {
  const [send, startSend] = useTransition()
  const {
    setValue,
    control,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const theme = useTheme()

  const [topics, setTopics] = React.useState([])

  const [tags, setTags] = React.useState([])

  const [editorLoaded, setEditorLoaded] = React.useState(false)

  const [categories, setCategories] = React.useState([])

  React.useEffect(() => {
    setEditorLoaded(true)
  }, [])

  React.useEffect(() => {
    if (thread) {
      setValue('topic', thread.topic ?? [{ category: '', title: '', value: '' }])
      setValue('title', thread.title ?? '')
      setValue('tags', thread.tags ?? [])
      setValue('content', thread.content ?? '')
    }
  }, [setValue, thread])

  React.useEffect(() => {
    getAllTopic().then(res => {
      // const newArr = res.data.map(category => {
      //   return category.topics.map(topic => {
      //     return {
      //       ...topic,
      //       category: category.name
      //     }
      //   })
      // })
      // const mergedArray = newArr.reduce((accumulator, current) => {
      //   return [...accumulator, ...current]
      // }, [])
      // setTopics(mergedArray)

      const categoriesArr = res.data.map(category => {
        const subcategories = category.children.map(subcategory => {
          return {
            group: category.name,
            ...subcategory
          }
        })
        return subcategories
      })
      console.log(categoriesArr.reduce((acc, curVal) => {
        return acc.concat(curVal)
      }, []))

      setCategories(categoriesArr.reduce((acc, curVal) => {
        return acc.concat(curVal)
      }, []))

      setTopics(categories[0]?.topics)
    })
    getTags().then(res => {
      // console.log(res.data)
      setTags(res.data.data)
    })
  }, [])

  const onSubmit = (data) => {
    const cleanedContent = data.content.replace(/<p>/g, '').replace(/<\/p>/g, '')
    const tags = data.tags.map(tag => tag.slug)
    // const sendData = {
    //   topic: data.topic.slug,
    //   title: data.title,
    //   content: cleanedContent,
    //   tags: tags.join(',')
    // }
    // console.log(data.cover)
    const sendData = new FormData()
    sendData.append('topic', data.topic.slug)
    sendData.append('title', data.title)
    sendData.append('content', cleanedContent)
    sendData.append('tags', tags.join(','))
    sendData.append('cover', data.cover)
    sendData.append('article_description', data.article_description)
    // console.log('submit article', sendData)
    startSend(() => {
      if (article) {
        // console.log('submit article', sendData)
        postNewArticle(sendData).then(res => {
          // console.log(res.data)
          toast.success('Bài viết của bạn sẽ được duyệt', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        }).catch(err => {
          // console.log(err)
          toast.error('Có lỗi xảy ra', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 3000
          })
        })
      } else {
        if (update) {
          // console.log('update')
          adminUpdateThread(thread.id, sendData).then(res => {
            // console.log(res.data)
            toast.success(res.data.msg, {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000
            })
          })
        } else {
          postThread(sendData).then(res => {
            // console.log(res.data)
            toast.success('Câu hỏi của bạn sẽ được duyệt', {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 3000
            })
          })
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction='column' spacing={3}>
        <Autocomplete
          id='category'
          options={categories}
          groupBy={(option) => option.group}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => <TextField {...params} label='Chuyên đề' variant='standard' />}
          renderGroup={(params) => (
            <li key={params.key}>
              <GroupHeader>{params.group}</GroupHeader>
              <GroupItems>{params.children}</GroupItems>
            </li>
          )}
          onChange={(e, value) => {
            setTopics(value.topics)
          }}
        />

        <Controller
          name='topic'
          required
          control={control}
          defaultValue=''
          render={({ field }) => (
            <Autocomplete
              id='topic'
              options={topics ?? []}
              value={field.value}
              getOptionLabel={(option) => option.title ?? ''}
              renderInput={(params) => <TextField {...params} label='Chủ đề' variant='standard' />}
              onChange={(e, value) => {
                // console.log(value)
                field.onChange(value)
              }}
            />
          )}
        />

        {/* <Controller */}
        {/*  name='topic' */}
        {/*  required */}
        {/*  control={control} */}
        {/*  defaultValue='' */}
        {/*  render={({ field }) => ( */}
        {/*    <Autocomplete */}
        {/*      disablePortal */}
        {/*      defaultValue={field.value} */}
        {/*      id='topic' */}
        {/*      value={field.value} */}
        {/*      options={topics ?? [{ category: '', title: '', value: '' }]} */}
        {/*      groupBy={(option) => option.category} */}
        {/*      renderGroup={(params) => ( */}
        {/*        <TreeView */}
        {/*          key={uuidv4()} */}
        {/*          aria-label='file system navigator' */}
        {/*          defaultCollapseIcon={<ExpandMoreIcon />} */}
        {/*          defaultExpandIcon={<ChevronRightIcon />} */}
        {/*        > */}
        {/*          <TreeItem key={params.key} nodeId={params.key.toString()} label={params.group}> */}
        {/*            {params.children} */}
        {/*          </TreeItem> */}
        {/*        </TreeView> */}
        {/*      )} */}
        {/*      getOptionLabel={(option) => option.title ?? ''} */}
        {/*      renderOption={(props, option) => ( */}
        {/*        <Box component='li' sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}> */}
        {/*          {option.title} */}
        {/*        </Box> */}
        {/*      )} */}
        {/*      onChange={(e, value) => { */}
        {/*        // console.log(value) */}
        {/*        field.onChange(value) */}
        {/*      }} */}
        {/*      sx={{ width: '100%' }} */}
        {/*      renderInput={(params) => <TextField {...params} label='Chủ đề' variant='standard' />} */}
        {/*    /> */}
        {/*  )} */}
        {/* /> */}

        <Controller
          name='title'
          required
          control={control}
          defaultValue=''
          render={({ field }) => (
            <TextField
              fullWidth
              name='title'
              value={field.value}
              onChange={field.onChange}
              label='Tiêu đề'
              variant='standard'
            />
          )}
        />

        {article && (
          <Controller
            name='article_description'
            required
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextField
                fullWidth
                multiline
                onChange={field.onChange}
                name='articleDescription'
                label='Mô tả bài viết'
                variant='standard'
                sx={{
                  '& textarea': {
                    fontSize: '14px !important'
                  }
                }}
              />
            )}
          />
        )}

        <Controller
          name='tags'
          required
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Autocomplete
              multiple
              id='tags-standard'
              value={field.value ?? []}
              options={tags ?? []}
              getOptionLabel={(option) => option.name}
              onChange={(e, value) => {
                // console.log(value)
                field.onChange(value)
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant='standard'
                  label='Tags'
                  placeholder='Tags'
                />
              )}
            />
          )}
        />
        {/* editor */}
        <Stack direction='column' alignItems='start' justifyContent='start' mt={3}>
          <Typography variant='caption' gutterBottom>
            Nhập nội dung
          </Typography>
          <Box
            sx={{
              mb: 1,
              width: '100%',
              '& .ql-toolbar': {
                backgroundColor: '#f0f2f5'
              },
              '& .ql-editor': {
                height: 400
              },
              '& .ql-container': {
                minHeight: '300px',
                color: theme.palette.text.primary
              },
              '& ::placeholder': {
                color: `${theme.palette.text.primary} !important`
              },
              '& .ql-active': {
                color: `${theme.palette.primary.main} !important}`
              },
              '& .ql-editor.ql-blank::before': {
                color: `${theme.palette.text.primary} !important`
              },
              '& .ql-snow .ql-editor img': {
                display: 'flex',
                margin: 'auto',
                maxWidth: 250,
                maxHeight: 250,
                borderRadius: 2,
                boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
                cursor: 'pointer'
              }
            }}
          >
            <Controller
              required
              control={control}
              name='content'
              render={({ field }) => (
                <ReactQuill
                  theme='snow'
                  value={field.value || ''}
                  modules={{
                    toolbar: TOOLBAR_OPTIONS
                  }}
                  onChange={field.onChange}
                  placeholder='Nhập nội dung'
                />
                // <Editor
                //   name='description'
                //   onChange={(data) => {
                //     field.onChange(data)
                //   }}
                //   editorLoaded={editorLoaded}
                // />

                // <MarkdownEditor />
              )}
            />
          </Box>

          {/* <Editor */}
          {/*  name='description' */}
          {/*  onChange={(data) => { */}
          {/*    setData(data) */}
          {/*  }} */}
          {/*  editorLoaded={editorLoaded} */}
          {/* /> */}

          {article && (
            <Controller
              name='cover'
              required
              control={control}
              defaultValue=''
              render={({ field }) => (
                <Input
                  type='file'
                  fullWidth
                  sx={{
                    p: 1
                  }}
                  onChange={(e) => {
                    field.onChange(e.target.files[0])
                  }}
                />
              )}
            />
          )}

          <Typography variant='body2' gutterBottom sx={{ mt: 0 }}>
            <strong>Lưu ý:</strong> Câu hỏi sẽ được duyệt trước khi hiển thị
          </Typography>

          <Button disabled={send} type='submit' variant='contained' startIcon={<Iconify icon='material-symbols:cloud-upload' />}>
            Lưu câu hỏi
          </Button>
        </Stack>
      </Stack>
    </form>
  )
}

export default FormCreateArticle

const GroupHeader = styled('div')(({ theme }) => ({
  position: 'sticky',
  top: '-8px',
  padding: '4px 10px',
  color: theme.palette.primary.main,
  backgroundColor:
      theme.palette.mode === 'light'
        ? lighten(theme.palette.primary.light, 0.85)
        : darken(theme.palette.primary.main, 0.8)
}))

const GroupItems = styled('ul')({
  padding: 0
})
