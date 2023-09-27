import React from 'react'
import { useTheme } from '@mui/material/styles'
import { Box } from '@mui/material'
import Iconify from '@/components/iconify'
import { StyledDate } from '@/components/articles/styles'
import { numberFormatter } from '@/utils/utils'

function StatisticsItem ({ icon, number }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'auto',
        height: 'auto',
        color: theme.palette.grey[400],
      }}
    >
      <Iconify icon={icon} color={theme.palette.grey[500]} width={12} height={12} />
      <StyledDate sx={{ pl: '2px' }}>
        {numberFormatter(number, 1)}
      </StyledDate>
    </Box>
  )
}

export default StatisticsItem
