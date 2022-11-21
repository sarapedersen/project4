import { atom, selector, selectorFamily } from "recoil"
import { defaultUser, User } from "../types"
import { checkUsername, updateUser, findUser, addUser } from "./queries"
import { recoilPersist } from 'recoil-persist'



// RECOIL - DARK MODE

const { persistAtom } = recoilPersist()

// handles the darkmode button, and which state it is 
export const darkMode = atom ({
  key: "darkmode",
  default: false,
  effects_UNSTABLE: [persistAtom]
})

// RECOIL - USERS (username)

// handles all the usernames in the database
export const checkName = atom ({
  key: "checkName", 
  default: ""
})

export const usernamesExists = selectorFamily({
  key: "usernamesExists", 
  get: (name: string) => async () => {
    console.log("tester")
    return await checkUsername(name)
  }
})

// RECOIL - USERS (Login)

// handles the users login credentials
export const userLoginPage = atom ({
  key: "userLoginPage",
  default: defaultUser, 
  effects_UNSTABLE: [persistAtom]
})

// handles the users registration inputs
export const userRegisterPage = atom ({
  key: "userRegisterPage",
  default: defaultUser 
})

// handles the current user, and the updates made to this user
export const updateUserState = atom({
  key: "updateUserState", 
  default: defaultUser 
})

// communicates to backend when a user either logs in, register a new user or updates information about the user (updates my countries) and returns the corresponding user
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
      const user: User | undefined = await findUser(loginPage.username, loginPage.password)
      if (user === null) {
        return defaultUser
      }
      return user
    }
    return undefined
  }
});
  