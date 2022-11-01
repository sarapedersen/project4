import { render, screen } from '@testing-library/react'
import Header from '../components/Header'
import {BrowserRouter} from 'react-router-dom'

test('renders the Header', () => {
  render(<BrowserRouter><Header/></BrowserRouter>)

  // Check if it renders the searchbar and log out button
  expect(screen.getByPlaceholderText('Search for a country').toBeVisible)
  expect(screen.getByRole('logout').toBeVisible)

})
