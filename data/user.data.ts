import { User } from "./user.type";

export function getUserData(): User {
  return {
    USERNAME: process.env.USER || "john.doe",
    PASSWORD: process.env.PASSWORD || "Qwerty123",
  };
}
