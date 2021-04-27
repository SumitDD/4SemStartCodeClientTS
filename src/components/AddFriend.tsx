import React, { useState } from "react";
import ILyndaFriend, { Gender } from "../interfaces/interfaces"
import { useMutation, gql } from "@apollo/client";
import { ALL_FRIENDS } from "./AllFriends"

const ADD_FRIEND = gql`
mutation createFriend($friend: FriendInput){
  createFriend(input: $friend) {
    id
    firstName
    lastName
    email
  }
}`

type AddFriendProps = {
  initialFriend?: ILyndaFriend
}

interface IKeyableFriend extends ILyndaFriend {
  [key: string]: any
}
const AddFriend = ({ initialFriend }: AddFriendProps) => {
  const EMPTY_FRIEND: ILyndaFriend = { firstName: "", lastName: "", password: "", email: "" }
  let newFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND }
  console.log(EMPTY_FRIEND)
  const [friend, setFriend] = useState({ ...newFriend })

  const [addFriend, { data }] = useMutation(ADD_FRIEND, {})

  const handleChange = (event: any) => {
    const id = event.currentTarget.id;
    let friendToChange: IKeyableFriend = { ...friend }
    friendToChange[id] = event.currentTarget.value;
    setFriend({ ...friendToChange })
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    //Todo save friend on servers
    addFriend({ variables: { friend: { ...friend } } })
    setFriend({ ...EMPTY_FRIEND })
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        FirstName<br />
        <input type="text" id="firstName" value={friend.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        LastName <br />
        <input type="text" id="lastName" value={friend.lastName} onChange={handleChange} />
      </label>
      <label>
        <br />
        Password <br />
        <input type="text" id="password" value={friend.password} onChange={handleChange} />
      </label>
      <label>
        <br />
        Email <br />
        <input type="text" id="email" value={friend.email} onChange={handleChange} />
      </label>
      <br />

      <br /><br />
      <input type="submit" value="Save Friend" />
    </form>
  );
}

export default AddFriend;