/* eslint-disable react/jsx-key */
import React from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from "@material-ui/core";

const User = ({ users }) => {
  if (users === null) {
    return <div></div>;
  } else
    return (
      <div>
        <h1>Users</h1>

        <TableContainer component={Paper}>
          <Table style={{ width: "80%", marginLeft: "60px" }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>User</strong>
                </TableCell>
                <TableCell style={{ fontsize: "50" }}>
                  <strong>Blogs</strong>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
};

export default User;
