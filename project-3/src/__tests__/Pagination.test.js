import { render, screen } from '@testing-library/react'
import Pagination from '../components/Pagination'

const testData = {
    countriesPerPage: 9,
    totalCountries: 100,
    currentPage: 1,
    totalPages: 10
}

test('check if pagination is limited to just pages with content', () => {
  render(<Pagination data={testData}/>)
  
  const leftArrow = screen.getByAltText('<')
  leftArrow.click
  expect(screen.getByTestId('current')).toHaveTextContent('/')

})