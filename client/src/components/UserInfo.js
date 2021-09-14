/* eslint-disable react/jsx-key */
import React from "react";
import { Table, TableCell, TableRow } from "@material-ui/core";
const UserInfo = ({ userList, match }) => {
  console.log(userList);
  console.log(match.params.id);

  const user = match
    ? userList.find((user) => user.id === match.params.id)
    : null;
  console.log(user);

  if (!user) {
    return null;
  }
  return (
    <div>
      <h1>
        {user.name} {"'s blog"}:
      </h1>
      <h3>Added blogs:</h3>
      <Table style={{ width: "40%" }}>
        {user.blogs.map((user) => (
          <TableRow key={user.id}>
            {" "}
            <TableCell>{user.title}</TableCell>
          </TableRow>
        ))}
      </Table>
    </div>
  );
};

export default UserInfo;
