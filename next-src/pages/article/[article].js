import React, { useContext, useEffect, useTransition } from 'react'
import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Modal,
  Stack,
  Typography
} from '@mui/material'
import { styled } from '@mui/material/styles'
import Iconify from '@/components/iconify'
import { WrapComments } from '@/components/comment'
import { getArticle, postArtilceLike, postView } from '@/apis/apis'
import { fDateTime } from '@/utils/formatTime'
import ReactHtmlParser, {
  convertNodeToElement,
  processNodes
} from 'react-html-parser'
import Link from 'next/link'
import BreadcrumbsContainer from '@/components/breadcrumbs/BreadcrumbsContainer'
import { Context } from '@/hooks/context'
import { toast } from 'react-toastify'
import { StyledTag } from '@/components/articles/styles'
import { ArticleJsonLd, NextSeo } from 'next-seo'
import { BRAND_NAME, SITE_BASE_URL } from '@/constants'
import { CopyToClipboard } from 'react-copy-to-clipboard'

// import { node } from 'prop-types'

export async function getServerSideProps (context) {
  const { article } = context.params
  const data = await getArticle(article.split('.').reverse()[0]).then(res => res.data)
  const breadcrumbs = [
    {
      label: 'Trang chủ',
      url: '/'
    },
    {
      label: 'Bài viết',
      url: '/article'
    },
    {
      label: data[0]?.title,
      url: `/article/${data[0]?.slug}.${data[0]?.id}`
    }
  ]

  return {
    props: {
      article,
      breadcrumbs,
      data: data[0]
    }
  }
}

function Article ({ article, data, breadcrumbs }) {
  const { user, setTableOfContents } = useContext(Context)
  // console.log(store)
  const [isLike, startLike] = useTransition()
  const [like, setLike] = React.useState(data?.isLiked)
  const [openComment, setOpenComment] = React.useState(true)
  const [src, setSrc] = React.useState('')
  const [open, setOpen] = React.useState(false)
  const [likeCount, setLikeCount] = React.useState(data?.totalLikes)
  useEffect(() => {
    const view = {
      article_id: article.split('.').reverse()[0]
    }
    postView(view).then(res => {
      console.log(res.data)
    }).catch(err => {
      console.log(err)
    })
    setTableOfContents(data)
  }, [])

  const handleClose = () => setOpen(false)
  const handleOpen = (src) => {
    setOpen(true)
    setSrc(src)
  }
  const handleLike = () => {
    setLikeCount(likeCount + 1)
    setLike(!like)
    startLike(() => {
      const dataLike = {
        article_id: article.split('.').reverse()[0],
        action: 'like'
      }
      postArtilceLike(dataLike).then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
        setLike(!like)
        setLikeCount(likeCount - 1)
      })
    })
  }

  const handleComment = () => {
    if (user) {
      setOpenComment(!openComment)
    } else {
      toast.success('Ban cần đăng nhập để bình luận', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000
      })
    }
  }

  const handleShare = () => {
    console.log('share')
  }

  const button = [
    {
      icon: 'bx:like',
      text: 'Thích',
      onClick: handleLike
    }
    // {
    //   icon: 'bx:share',
    //   text: 'Chia sẻ',
    //   onClick: handleShare
    // }
  ]
  console.log(data)
  return (
    <StyledRoot>
      {/* <TableOfContents */}
      {/*  data={data} */}
      {/* /> */}
      <NextSeo
        title={`${data?.title} - ${BRAND_NAME}`}
        description={data?.articleDescription}
        canonical={`${SITE_BASE_URL}/article/${data?.slug}.${data?.id}`}
        openGraph={{
          title: data?.title,
          description: data?.articleDescription,
          url: `${SITE_BASE_URL}/article/${data?.slug}.${data?.id}`,
          type: 'article',
          article: {
            publishedTime: data?.createdAt,
            section: data?.isTopic?.name,
            authors: [
              `${SITE_BASE_URL}/user/${data?.user?.username}.${data?.user?.id}`
            ],
            tags: data?.tags?.map(tag => tag.name)
          },
          images: [
            {
              url: data?.cover ?? `${SITE_BASE_URL}/assets/images/covers/cover_3.jpg`,
              width: 850,
              height: 650,
              alt: 'Cover of the article'
            }
          ]
        }}
      />

      <ArticleJsonLd
        useAppDir={false}
        url={`${SITE_BASE_URL}/article/${data?.slug}.${data?.id}`}
        title={data?.title}
        images={[
          data?.cover ?? `${SITE_BASE_URL}/assets/images/covers/cover_1.jpg`
        ]}
        datePublished={data?.createdAt}
        authorName={[
          {
            name: data?.user?.username,
            url: `${SITE_BASE_URL}/user/${data?.user?.username}.${data?.user?.id}`
          }
        ]}
        description={data?.articleDescription}
        isAccessibleForFree
      />

      <BreadcrumbsContainer
        breadcrumbs={breadcrumbs}
        maxWidth='lg'
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <img
          src={src}
          alt='img'
          width='auto'
          height='auto'
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            height: 'auto',
            boxShadow: 24
          }}
        />
      </Modal>
      <Container
        maxWidth='lg'
      >
        <Stack
          direction='column'
          alignItems='start'
        >
          <StyledTitle>
            {data.title}
          </StyledTitle>
          <Divider flexItem />
          <Box sx={{ mb: 2, mt: 1 }}>
            <StyledAccount>
              <Link href={`/profile/${data.user.id}/summary`}>
                <Avatar
                  src={`${data.user.profileImage}`}
                  alt='photoURL'
                  imgProps={{
                    width: 32,
                    height: 32,
                    loading: 'eager',
                    title: `avatar - ${data.user.username}`
                  }}
                />
              </Link>
              <Box sx={{ ml: 1 }}>
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'start'
                }}
                >
                  <StyledLink href={`/user/${data.user.username}.${data.user.id}`}>
                    <StyledUsername>
                      {data.user.username}
                    </StyledUsername>
                  </StyledLink>
                  <Iconify
                    icon='eva:checkmark-circle-2-fill'
                    sx={{
                      width: 16,
                      height: 16,
                      ml: 0.5,
                      color: 'blue'
                    }}
                  />
                </Box>
                <Typography variant='caption'>
                  {fDateTime(data.createdAt)}
                </Typography>
              </Box>
            </StyledAccount>
          </Box>
        </Stack>

        <Typography
          variant='body1'
          gutterBottom
          sx={{
            fontSize: {
              lg: '18px',
              md: '18px',
              sm: '15px',
              xs: '15px'
            },
            fontWeight: '600'
          }}
        >
          {data?.articleDescription}
        </Typography>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            mb: 4
          }}
        >
          <StyledImg
            src={data?.cover ?? '/assets/images/covers/cover_3.jpg'}
            alt={data?.title}
            title={data?.title}
            width='auto'
            height='auto'
            loading='lazy'
            sx={{ cursor: 'auto' }}
          />
        </Box>
        <Box
          component='div'
          sx={{
            mb: 1,
            fontSize: {
              lg: '16px',
              md: '16px',
              sm: '14px',
              xs: '14px'
            },
            '& > ol': {
              pl: 4
            },
            '& > ol > li': {
              listStyleType: 'circle'
            },
            '& > pre': {
              whiteSpace: 'pre-wrap',
              backgroundColor: 'grey.200',
              py: 2,
              px: 4
            },
            '& p': {
              fontSize: '12px'
            }
          }}
        >
          {HTMLCanvas(data.content, handleOpen)}
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 'auto'
          }}
        >
          <Stack
            direction='row'
            spacing={1}
            alignItems='start'
            justifyContent='start'
            flexWrap='wrap'
            useFlexGap
            mb={1}
          >
            {data?.tags?.map((tag, index) => (
              <StyledTag key={index} href={`/tag/${tag.slug}`}>
                {tag?.name}
              </StyledTag>
            ))}
          </Stack>
        </Box>

        <StyledDiv>
          <Stack
            direction='row'
            spacing={1}
            alignItems='start'
            justifyContent='start'
          >
            {button.map((icon, index) => (
              <StyledButton
                key={index}
                type='button'
                disabled={icon.icon === 'bx:like' && isLike}
                onClick={icon.onClick}
                startIcon={Icon(like, icon.icon)}
                sx={{
                  ...((like && (icon.icon === 'bx:like')) &&
                                                { color: 'blue' })
                }}
              >
                {icon.text}
              </StyledButton>
            ))}

            <StyledButton
              type='button'
              onClick={handleShare}
              startIcon={Icon(null, 'bx:share')}
            >
              Chia sẻ
            </StyledButton>
          </Stack>
        </StyledDiv>
        <WrapComments
          openComment={openComment}
          data={data}
        />
      </Container>
    </StyledRoot>
  )
}

export default Article

const Icon = (action, icon) => {
  if (icon === 'bx:like') {
    const liked = action ? 'bxs:like' : 'bx:like'
    return (
      <Iconify icon={liked} width={16} height={16} />
    )
  }
  return (
    <Iconify icon={icon} width={16} height={16} />
  )
}

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 0)
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

const StyledDiv = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `solid 1px ${theme.palette.divider}`,
  marginTop: '16px'
}))

const StyledRoot = styled('div')(({ theme }) => ({
  width: '100%',
  position: 'relative'
}))

const StyledButton = styled(Button)(({ theme }) => ({
  width: 'auto',
  color: theme.palette.text.secondary,
  fontWeight: 400,
  fontSize: '12px'
}))

const StyledTitle = styled('h1')(({ theme }) => ({
  fontSize: '32px',
  fontWeight: '700',
  marginBottom: '8px',
  marginTop: '16px'
}))

const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  color: theme.palette.text.primary
}))

const StyledImg = styled('img')(({ theme }) => ({
  display: 'flex',
  margin: 'auto',
  maxHeight: '300px',
  width: {
    lg: '60%',
    md: '60%',
    sm: '60%',
    xs: '100%'
  },
  my: 2,
  objectFit: 'cover',
  borderRadius: 2,
  boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
  cursor: 'pointer'
}))

const Styledp = styled('p')(({ theme }) => ({
  fontSize: '16px'
}))

function HTMLCanvas (htmlContent, handleOpen) {
  const onClick = (src) => {
    handleOpen(src)
  }
  const htmlParserTransform = (node, index) => {
    if (node.type === 'tag' && node.name === 'span') {
      return null
    }

    // Transform <ul> into <ol>
    // A node can be modified and passed to the convertNodeToElement function which will continue to render it and it's children
    if (node.type === 'tag' && node.name === 'ul') {
      node.name = 'ol'
      return convertNodeToElement(node, index, htmlParserTransform)
    }

    // return an <i> element for every <b>
    // a key must be included for all elements
    if (node.type === 'tag' && node.name === 'b') {
      return <i key={index}>{processNodes(node.children, htmlParserTransform)}</i>
    }

    if (node.type === 'tag' && node.name === 'h2') {
      return <h2 type='heading' id={`heading-${index}`} key={index}>{processNodes(node.children, htmlParserTransform)}</h2>
    }

    if (node.type === 'tag' && node.name === 'h3') {
      return <h3 type='heading' id={`heading-${index}`} key={index}>{processNodes(node.children, htmlParserTransform)}</h3>
    }

    if (node.type === 'tag' && node.name === 'h4') {
      return <h4 type='heading' id={`heading-${index}`} key={index}>{processNodes(node.children, htmlParserTransform)}</h4>
    }

    if (node.type === 'tag' && node.name === 'p') {
      return <Styledp key={index}>{processNodes(node.children, htmlParserTransform)}</Styledp>
    }

    // all links must open in a new window
    if (node.type === 'tag' && node.name === 'a') {
      node.attribs.target = '_blank'
      // console.log(node);
      // console.log(index);
      return convertNodeToElement(node, index, htmlParserTransform)
    }
    if (node.type === 'tag' && node.name === 'img') { // a tag named a
      const { src } = node.attribs // extract the actual url
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          key={index}
        >
          <StyledImg
            onClick={() => onClick(src)}
            src={src}
            alt={node.name}
            width='auto'
            height='auto'
          />
          <Typography variant='caption' color='text.secondary' gutterBottom mt={0.5}>
            Nhấn ảnh để xem ảnh đầy đủ
          </Typography>
        </div>
      )
    }
    return convertNodeToElement(node, index, htmlParserTransform)
  }
  return ReactHtmlParser(
    htmlContent, // or whatever
    { transform: htmlParserTransform }
  )
}
