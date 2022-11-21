import { atom, selector, } from "recoil"
import { defaultUser, User } from "../types"
import { updateUser, addUser } from "./queries"
import { recoilPersist } from 'recoil-persist'



/* RECOIL - DARK MODE */

const { persistAtom } = recoilPersist()

// Handles the darkmode button, and which state it is 
export const darkMode = atom ({
  key: "darkmode",
  default: false,
  effects_UNSTABLE: [persistAtom]
})

/* RECOIL - USERS (Login) */

// Handles the users login credentials
export const userLoginPage = atom ({
  key: "userLoginPage",
  default: defaultUser, 
  effects_UNSTABLE: [persistAtom]
})

// Handles the users registration inputs
export const userRegisterPage = atom ({
  key: "userRegisterPage",
  default: defaultUser 
})

// Handles the current user, and the updates made to this user
export const updateUserState = atom({
  key: "updateUserState", 
  default: defaultUser 
})

/* Communicates to backend when a user either logs in, register a new user or updates information about the 
user (updates my countries) and returns the corresponding user */
export const currentUser = selector({
  key: "userLogin",
  get: async ({get}) => {
    const update: User = get(updateUserState)
    if (update.id !== "") {
      const user = await updateUser(update.id, update.beenTo)
      return user
    }
    const loginPage: User = get(userLoginPage)
    const registerPage: User = get(userRegisterPage)
    if (registerPage.username !== ""){
      const user = await addUser(registerPage.username, registerPage.password, [])
      return user
    } else if (loginPage.username !== "") {
      return loginPage
    }
    return undefined
  }
});
  