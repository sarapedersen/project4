import { atom, selector } from "recoil";
import { defaultUser, User } from "../types";
import { getAllUsername, updateUser, findUser, addUser } from "./queries";

// RECOIL - USERS (username)


export const allUsernames = atom ({
  key: "allUsernames", 
  default: getAllUsername()
})

// RECOIL - USERS (Login)

export const userLoginPage = atom ({
  key: "userLoginPage",
  default: defaultUser 
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
      const user = await findUser(loginPage.username, loginPage.password)
      return user
    } else if (registerPage.username !== ""){
      const user = await addUser(registerPage.username, registerPage.password, [])
      return user
    }
    return defaultUser
  }
});
  