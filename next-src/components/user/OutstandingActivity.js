import React, { useEffect } from 'react'
import { Stack } from '@mui/material'
import ActivityItem from '@/components/user/ActivityItem'
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'

import { FreeMode, Pagination } from 'swiper/modules'
import { userFilterArticles } from '@/apis/apis'
import { useRouter } from 'next/router'
import { v4 as uuidv4 } from 'uuid'

function OutstandingActivity ({ value }) {
  const router = useRouter()
  const [articles, setArticles] = React.useState([])
  useEffect(() => {
    userFilterArticles(value, router.query.slug.split('.').pop(), value === 'articles' ? 'comment' : 'reply').then(res => setArticles(res.data)).catch(err => console.log(err))
  }, [value])

  return (
    <Swiper
      slidesPerView={3.3}
      spaceBetween={10}
      freeMode
      modules={[FreeMode, Pagination]}
      className='mySwiper'
    >
      <Stack
        direction='row'
        spacing={1}
        justifyContent='start'
        alignItems='start'
        sx={{
          overflow: 'hidden'
        }}
      >
        {articles.map((article, index) => (
          <SwiperSlide key={uuidv4()}>
            <ActivityItem value={value} article={article} />
          </SwiperSlide>
        ))}
      </Stack>
    </Swiper>
  )
}

export default OutstandingActivity
