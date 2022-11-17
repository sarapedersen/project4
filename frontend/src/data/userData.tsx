import { atom, selector } from "recoil"
import { defaultUser, User } from "../types"
import { getAllUsername, updateUser, findUser, addUser } from "./queries"
import { recoilPersist } from 'recoil-persist'



// RECOIL - DARK MODE

export const darkMode = atom ({
  key: "darkmode",
  default: false
})

// RECOIL - USERS (username)

export const allUsernames = atom ({
  key: "allUsernames", 
  default: getAllUsername()
})

// RECOIL - USERS (Login)
const { persistAtom } = recoilPersist()

export const userLoginPage = atom ({
  key: "userLoginPage",
  default: defaultUser, 
  effects_UNSTABLE: [persistAtom]
})

export const userRegisterPage = atom ({
  key: "userRegisterPage",
  default: defaultUser 
})

export const updateUserState = atom({
  key: "updateUserState", 
  default: defaultUser 
})

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
    if (loginPage.username !== "") {
      const user: User | undefined = await findUser(loginPage.username, loginPage.password)
      if (user === null) {
        return undefined
      }
      return user
    } else if (registerPage.username !== ""){
      const user = await addUser(registerPage.username, registerPage.password, [])
      return user
    }
    return defaultUser
  }
});
  