import * as React from 'react'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Label from '@mui/icons-material/Label'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { v4 as uuidv4 } from 'uuid'

import { TreeView } from '@mui/x-tree-view/TreeView'
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem'

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: 'var(--tree-view-color)'
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit'
    }
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2)
    }
  }
}))

const StyledTreeItem = React.forwardRef(function StyledTreeItem (props, ref) {
  const theme = useTheme()
  const {
    bgColor,
    color,
    labelIcon: LabelIcon,
    labelInfo,
    labelText,
    colorForDarkMode,
    bgColorForDarkMode,
    ...other
  } = props

  const styleProps = {
    '--tree-view-color': theme.palette.mode !== 'dark' ? color : colorForDarkMode,
    '--tree-view-bg-color':
            theme.palette.mode !== 'dark' ? bgColor : bgColorForDarkMode
  }

  return (
    <StyledTreeItemRoot
      label={
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 0.5,
            pr: 0
          }}
        >
          <Box component={LabelIcon} color='inherit' sx={{ mr: 1 }} />
          <Typography variant='body2' sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant='caption' color='inherit'>
            {labelInfo}
          </Typography>
        </Box>
            }
      style={styleProps}
      {...other}
      ref={ref}
    />
  )
})

export default function TreeNavSection ({ data }) {
  return (
    <TreeView
      aria-label='gmail'
      defaultExpanded={['3']}
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: 500, flexGrow: 1, maxWidth: 400, overflowY: 'auto' }}
    >
      <StyledTreeItem nodeId='1' labelText='Tất cả chuyên mục' labelIcon={Label}>
        {data.map((item, index) => (
          <StyledTreeItem
            key={uuidv4()}
            nodeId={item.id}
            labelText={item?.title}
            color='#1a73e8'
            bgColor='#e8f0fe'
            colorForDarkMode='#B8E7FB'
            bgColorForDarkMode='#071318'
          />
        ))}
      </StyledTreeItem>
    </TreeView>
  )
}
