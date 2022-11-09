import { render, screen, fireEvent } from '@testing-library/react'
import {BrowserRouter} from 'react-router-dom'
import LogIn from '../components/LogIn'
import { RecoilRoot } from 'recoil'

describe ('login tests', () => {
    test ('login form should be visible' , () => {
        const loginComponent = render(<RecoilRoot><BrowserRouter><LogIn/></BrowserRouter></RecoilRoot>)
        const inputNode = loginComponent.getByPlaceholderText('Username')
        expect(inputNode).toBeVisible
    })
    
    test('empty fields should display error message', () => {
        const loginComponent = render(<RecoilRoot><BrowserRouter><LogIn/></BrowserRouter></RecoilRoot>)
        const btnLogin = loginComponent.getByRole('button')
        fireEvent.click(btnLogin)
        expect(screen.getByRole('error')).toHaveTextContent('Username does not exist. Check spelling and try again.')
    })
})