// export enum Gender {
//   MALE,
//   FEMALE,
//   OTHER
// }

export type Gender = "MALE" | "FEMALE" | "OTHER"

export default interface ILyndaFriend {
  id?: string
  firstName: string
  lastName: string
  password: string,
  email: string
}
