/** @jsx jsx */
import {jsx} from '@emotion/core'

import React from 'react'
import Tooltip from '@reach/tooltip'
import {FaSearch, FaTimes} from 'react-icons/fa'
import {Input, BookListUL, Spinner} from './components/lib'
import {BookRow} from './components/book-row'
import {client} from './utils/api-client'
import * as colors from 'styles/colors'

function DiscoverBooksScreen() {
  const [status, setStatus] = React.useState('idle')
  const [data, setData] = React.useState(null)
  const [error, setError] = React.useState(null)
  const [query, setQuery] = React.useState('')
  const [queried, setQueried] = React.useState(false)

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const isError = status === 'error'

  React.useEffect(() => {
    if (!queried) {
      return
    }
    setStatus('loading')
    client(`books?query=${encodeURIComponent(query)}`)
      .then(responseData => {
        console.log('data', responseData)
        setData(responseData)
        setStatus('success')
      })
      .catch(error => {
        console.log('Error', error)
        setError(error)
        setStatus('error')
      })
  }, [query, queried])

  function handleSearchSubmit(event) {
    event.preventDefault()
    setQueried(true)
    setQuery(event.target.elements.search.value)
  }

  return (
    <div
      css={{maxWidth: 800, margin: 'auto', width: '90vw', padding: '40px 0'}}
    >
      <form onSubmit={handleSearchSubmit}>
        <Input
          placeholder="Search books..."
          id="search"
          css={{width: '100%'}}
        />
        <Tooltip label="Search Books">
          <label htmlFor="search">
            <button
              type="submit"
              css={{
                border: '0',
                position: 'relative',
                marginLeft: '-35px',
                background: 'transparent',
              }}
            >
              {isLoading ? (
                <Spinner />
              ) : isError ? (
                <FaTimes aria-label="error" css={{color: colors.danger}} />
              ) : (
                <FaSearch aria-label="search" />
              )}
            </button>
          </label>
        </Tooltip>
      </form>

      {isError ? <p css={{color: colors.danger}}>{error.message}</p> : null}
      {isSuccess ? (
        data?.books?.length ? (
          <BookListUL css={{marginTop: 20}}>
            {data.books.map(book => (
              <li key={book.id}>
                <BookRow key={book.id} book={book} />
              </li>
            ))}
          </BookListUL>
        ) : (
          <p>No books found. Try another search.</p>
        )
      ) : null}
    </div>
  )
}

export {DiscoverBooksScreen}
