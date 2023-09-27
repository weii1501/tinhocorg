'use client'

import React, { useState } from 'react'
import {
  Autocomplete,
  Button,
  ClickAwayListener,
  IconButton,
  Input,
  InputBase,
  Slide,
  Stack
} from '@mui/material'
import Iconify from '@/components/iconify'
import { styled, useTheme } from '@mui/material/styles'
import Link from 'next/link'
import algoliasearch from 'algoliasearch/lite'
import { ALGOLIA_API_KEY, ALGOLIA_APPLICATION_ID } from '@/constants'
import { useRouter } from 'next/router'
import { createAutocomplete } from '@algolia/autocomplete-core'
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia'
import useResponsive from '@/hooks/useResponsive'

const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)

const HEADER_MOBILE = 64

function SearchbarSlide () {
  const theme = useTheme()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [autocompleteState, setAutocompleteState] = React.useState({})
  const [searchType, setSearchType] = React.useState('articles_index')
  const isDesktop = useResponsive('up', 'lg')

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(false)
    setAutocompleteState({})
  }

  const handleSearch = () => {
    router.push(`/search?q=${autocompleteState.query}&search_type=${searchType}`)
    setAutocompleteState({})
    setOpen(false)
  }

  const autocomplete = React.useMemo(
    () =>
      createAutocomplete({
        onStateChange ({ state }) {
          // (2) Synchronize the Autocomplete state with the React state.
          setAutocompleteState(state)
        },
        getSources () {
          return [
            // (3) Use an Algolia index source.
            {
              sourceId: searchType === 'articles_index' ? 'articles' : 'threads',
              getItemInputValue ({ item }) {
                return item.query
              },
              getItems ({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: searchType,
                      query,
                      params: {
                        hitsPerPage: 4,
                        highlightPreTag: '<mark>',
                        highlightPostTag: '</mark>'
                      }
                    }
                  ]
                })
              },
              getItemUrl ({ item }) {
                return item.url
              }
            }
          ]
        }
      }),
    [searchType]
  )

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton
            onClick={handleOpen}
            sx={{
              display: isDesktop ? 'none' : 'block'
            }}
          >
            <Iconify icon='eva:search-fill' />
          </IconButton>
        )}

        <Slide direction='down' in={open} mountOnEnter unmountOnExit>
          <StyledRootSeachbar>
            <Stack
              direction='row'
              justifyContent='space-between'
              alignItems='center'
              spacing={2}
              sx={{ width: '100%' }}
            >
              <Input
                fullWidth
                autoFocus
                disableUnderline
                inputProps={{
                  'aria-label': 'search articles'
                }}
                sx={{ paddingLeft: 3, ml: 1, fontSize: '14px' }}
                {...autocomplete.getInputProps({
                  placeholder: 'Tìm kiếm...'
                })}
              />
              <Stack
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                py={1}
                spacing={2}
                  // divider={<Divider orientation='vertical' flexItem />}
              >
                <Autocomplete
                  disablePortal
                  id='combo-box-demo'
                  defaultValue={options[0]}
                  onChange={(e, value) => {
                    setSearchType(value.value)
                  }}
                  clearIcon={null}
                  getOptionLabel={(option) => option.label}
                  options={options}
                  renderInput={(params) => {
                    const { InputLabelProps, InputProps, ...rest } = params
                    return <InputBase {...params.InputProps} {...rest} sx={{ width: '120px', fontSize: '14px', borderLeft: `1px solid ${theme.palette.grey[300]}`, paddingLeft: '8px' }} placeholder='Bài viết' />
                  }}
                />

              </Stack>
            </Stack>
            <Button
              variant='contained'
                // color={theme.palette.grey[300]}
              onClick={handleSearch}
              aria-label='Search for keyword'
              type='button'
              sx={{
                borderRadius: 0,
                height: '40px',
                borderTopRightRadius: '4px',
                borderBottomRightRadius: '4px',
                minWidth: '40px',
                // marginLeft: '12px',
                backgroundColor: theme.palette.grey[400],
                '&:hover': {
                  backgroundColor: theme.palette.grey[500]
                }
              }}
            >
              <Iconify icon='eva:search-fill' color={theme.palette.grey[900]} />
            </Button>
            {autocompleteState.isOpen &&
                autocompleteState.collections.map((collection, index) => {
                  const { source, items } = collection
                  return (
                    <StyledItemSearch key={`source-${index}`} className='aa-Source'>
                      {items.length > 0 && (
                        <ul className='aa-List' {...autocomplete.getListProps()}>
                          {items.map((item) => (
                            <li
                              key={item.objectID}
                              className='aa-Item'
                              {...autocomplete.getItemProps({
                                item,
                                source
                              })}
                            >
                              <StyledLink
                                className='aa-link'
                                href={`/${searchType === 'articles_index' ? 'article' : 'thread'}/${item.slug}.${item.id}`}
                                onClick={handleClose}
                              >
                                {item.title}
                              </StyledLink>
                            </li>
                          ))}
                        </ul>
                      )}
                    </StyledItemSearch>
                  )
                })}
          </StyledRootSeachbar>
        </Slide>
      </div>
    </ClickAwayListener>
  )
}

export default SearchbarSlide

const StyledItemSearch = styled('div')(({ theme }) => ({
  // ...bgBlur({ color: theme.palette.background.default }),
  backgroundColor: theme.palette.background.default,
  top: '104px',
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 0),
  boxShadow: theme.customShadows.z8,
  '& .aa-List': {
    width: '100%',
    backgroundColor: theme.palette.background.default
  },
  '& .aa-Item': {
    width: '100%',
    padding: theme.spacing(1, 0),
    underline: 'none',
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.palette.grey[200]
    }
  },
  '& .aa-link': {
    width: '100%'
  }
}))

const StyledRootSeachbar = styled('div')(({ theme }) => ({
  // ...bgBlur({ color: theme.palette.background.default }),
  backgroundColor: theme.palette.background.default,
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 1),
  boxShadow: theme.customShadows.z8
}))

const StyledLink = styled(Link)(({ theme }) => ({
  // font: 'inherit',
  color: theme.palette.text.primary,
  fontWeight: '400',
  fontSize: '14px',
  padding: theme.spacing(1, 3),
  margin: theme.spacing(0, 0),
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.grey[200]
  }
}))

const options = [
  { label: 'Bài viết', value: 'articles_index' },
  { label: 'Câu hỏi', value: 'threads_index' }
]
