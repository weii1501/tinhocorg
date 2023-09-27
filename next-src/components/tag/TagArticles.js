import React from 'react'
import { Paper, Stack } from '@mui/material'
import TagArticleItem from '@/components/tag/TagArticleItem'

function TagArticles ({ articles }) {
  return (
    <Paper
      elevation={0}
      sx={{
        mt: 2,
        backgroundColor: 'transparent'
      }}
    >
      <Stack
        direction='column'
        alignItems='start'
        justifyContent='start'
        spacing={{
          lg: 0,
          md: 0,
          sm: 4,
          xs: 5
        }}
      >
        {articles.map((article, index) => (
          <TagArticleItem
            key={index}
            article={article}
          />
        ))}
      </Stack>
    </Paper>
  )
}

export default TagArticles
