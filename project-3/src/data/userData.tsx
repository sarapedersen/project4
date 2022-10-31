import { atom, selector } from "recoil";
import { Country } from '../types';


async function fetchUser() {
    let defCountries: Country[] = []
    console.log("howrhgowrgfo")
    await fetch('http://localhost:4000/users')
        .then((response) => response.json())
        .then((data) => defCountries = data)
    return defCountries
  }

  
  export const UserState = atom({
    key: "countriesState",
    default: fetchUser()
  });
  