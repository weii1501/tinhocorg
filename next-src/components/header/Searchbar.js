import React, { useState } from 'react'
// @mui
import { styled } from '@mui/material/styles'
import { Input, Slide, Button, IconButton, InputAdornment, ClickAwayListener } from '@mui/material'
import Iconify from '@/components/iconify'
import { bgBlur } from '@/utils/cssStyles'
import algoliasearch from 'algoliasearch/lite'
import { createAutocomplete } from '@algolia/autocomplete-core'
import { getAlgoliaResults } from '@algolia/autocomplete-preset-algolia'
import { ALGOLIA_API_KEY, ALGOLIA_APPLICATION_ID } from '@/constants'
import Link from 'next/link'
import { useRouter } from 'next/router'

// ----------------------------------------------------------------------

const HEADER_MOBILE = 64
const HEADER_DESKTOP = 92

const StyledSearchbar = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: HEADER_MOBILE,
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    height: HEADER_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}))

const StyledItemSearch = styled('div')(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.default }),
  top: HEADER_MOBILE + 8,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'absolute',
  alignItems: 'center',
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 5)
  },
  '& .aa-List': {
    width: '100%'
  },
  '& .aa-Item': {
    width: '100%',
    padding: theme.spacing(1, 3),
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

const StyledLink = styled(Link)(({ theme }) => ({
  font: 'inherit',
  color: theme.palette.text.primary,
  fontWeight: '800',
  padding: theme.spacing(1, 3),
  margin: theme.spacing(0, 0),
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: theme.palette.grey[200]
  }
}))

// ----------------------------------------------------------------------
const searchClient = algoliasearch(ALGOLIA_APPLICATION_ID, ALGOLIA_API_KEY)

export default function Searchbar () {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [autocompleteState, setAutocompleteState] = React.useState({})

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
              sourceId: 'articles',
              getItemInputValue ({ item }) {
                return item.query
              },
              getItems ({ query }) {
                return getAlgoliaResults({
                  searchClient,
                  queries: [
                    {
                      indexName: 'articles_index',
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
    []
  )

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleClose = () => {
    setOpen(false)
    setAutocompleteState({})
  }

  const handleSearch = () => {
    router.push(`/search?q=${autocompleteState.query}&search_type=articles_index`)
    setAutocompleteState({})
    setOpen(false)
  }

  const handleKeyDown = (e) => {
    console.log(e)
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!open && (
          <IconButton
            id='labelbuttonsearch'
            ariaLabel='Search on any page'
            aria-labelledby='labelbutton'
            type='button'
            onClick={handleOpen}
          >
            <Iconify icon='eva:search-fill' color='text.primary' />
            <span id='labelbutton' className='hidden'>Search</span>
          </IconButton>
        )}

        <Slide direction='down' in={open} mountOnEnter unmountOnExit>
          <StyledSearchbar {...autocomplete.getRootProps({})}>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder='Search…'
              startAdornment={
                <InputAdornment position='start'>
                  <Iconify icon='eva:search-fill' sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
                            }
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
              onKeyDown={handleKeyDown}
              {...autocomplete.getInputProps({})}
            />
            <Button type='button' variant='contained' onClick={handleSearch}>
              Search
            </Button>
          </StyledSearchbar>
        </Slide>
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
                              href={`/article/${item.slug}.${item.id}`}
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
      </div>
    </ClickAwayListener>
  )
}
