import { render, screen } from '@testing-library/react'
import Header from '../components/Header'

test('renders the Header', () => {
  render(<Header/>)

  // Check if it renders the searchbar and log out button
  expect(screen.getByPlaceholderText('Search for a country'))
  expect(screen.getByRole('button')).toBeVisible

})