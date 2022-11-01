import { render, screen, fireEvent } from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import LogIn from '../components/LogIn'

describe ('login tests', () => {
    test ('login form should be visible' , () => {
        const loginComponent = render(<BrowserRouter><LogIn/></BrowserRouter>)
        const inputNode = loginComponent.getByPlaceholderText('Username')
        expect(inputNode).toBeVisible
    })
    
    test('empty fields should display error message', () => {
        const loginComponent = render(<BrowserRouter><LogIn/></BrowserRouter>)
        const btnLogin = loginComponent.getByRole('button')
        fireEvent.click(btnLogin)
        expect(screen.getByRole('error')).toHaveTextContent('Username does not exist. Check spelling and try again.')
    })
})