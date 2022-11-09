import { render, screen } from "@testing-library/react"
import CountryList from "../components/CountryList"

const testData = [{
        name: "Norway",
        flagSvg: "https://flagcdn.com/no.svg",
        flagPng: "https://flagcdn.com/no.svg", 
        capital: "Oslo",
        population: 5425270,
        region: "Europe",
        area: 385207,
        languages: ["Norwegian"]
    },
    {
        name: "Sweden",
        flagSvg: "https://flagcdn.com/se.svg",
        flagPng: "https://flagcdn.com/se.png",
        capital: "Stockholm",
        population: 10481937,
        continent: "Europe",
        area: 450295,
        languages: ["Swedish"]
    }]


test('check if countrylist shows countries', () => {
    render(<CountryList countries={testData}/>)
    expect(screen.getByRole('list')).toHaveTextContent(['NorwaySweden'])

})