import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import ILyndaFriend from "../interfaces/interfaces";

interface IFriendResult {
  getOneFriend: ILyndaFriend;
}

interface IVariableInput {
  input: string;
}

const GET_FRIEND = gql`
query getOneFriend($input: String!) {
  getOneFriend(input: $input) {
    id
    firstName
    lastName
    email
    role
  }
}`


export default function FindFriend() {
  const [input, setInput] = useState("");
  const [getOneFriend, { loading, called, data }] = useLazyQuery<IFriendResult, IVariableInput>
    (GET_FRIEND, { fetchPolicy: "cache-and-network" });

  const fetchFriend = () => {
    alert(`Find friend with id: ${input}`);
    getOneFriend({ variables: { input } }); // eller id:id
  };

  return (
    <div>
      ID:
      <input
        type="txt"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
        }}
      />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br />
      <br />
      {called && loading && <p> Loading... </p>}
      {data && (
        <div>
          <p> {data.getOneFriend.firstName}</p>
          <p> {data.getOneFriend.lastName}</p>
          <p> {data.getOneFriend.email}</p>
        </div>
      )}
      <h2>Fetch a friend using the provided id</h2>
    </div>
  );
}