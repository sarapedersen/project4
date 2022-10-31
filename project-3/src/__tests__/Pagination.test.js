import { render, fireEvent, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import PaginatedCountryList from "../components/PaginatedCountryList"

//test block
test("next page", () => {
    // render the component on virtual dom
    render(<RecoilRoot>
             <PaginatedCountryList />
           </RecoilRoot>)


    // const countryList = screen.getByTestId("countries")
    const rightArrow = screen.getByTestId("rightArrow")
    const leftArrow = screen.getByTestId("leftArrow")

    fireEvent.click(rightArrow)

    // expect(countryList).toHaveTextContent("Argentina")

})