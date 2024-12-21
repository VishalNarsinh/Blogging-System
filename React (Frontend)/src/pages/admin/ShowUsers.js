import React, { useEffect, useState } from "react";
import Base from "../../components/Base";
import { getAllUsers, toggleStatus } from "../../services/user-service";
import { Table } from "reactstrap";
import { MDBBtn, MDBTooltip } from "mdb-react-ui-kit";

function ShowUsers() {
  const [users, setUsers] = useState([]);
  let aa = [];

  useEffect(() => {
    getAllUsers()
      .then((response) => {
        // console.log(response);
        setUsers(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    console.log(users);
  }, [users]);
  const handleToggleStatus = (id) => {
    toggleStatus(id)
      .then((response) => {
        console.log(response);
        // setUsers([...users]);
        const updatedUsers = users.map((user) =>
          user.id === id ? { ...user, live: response.status } : user
        );
        setUsers(updatedUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Base>
      <Table hover responsive>
        <thead>
          <tr>
            <th>#ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>LIVE</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 &&
            users.map((user) => (
              <tr key={user.id}>
                <th>{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.live !== undefined && ( // Check if user.live is defined
                    <MDBBtn
                      size="sm"
                      color="primary"
                      disabled={user.roles.some(
                        (role) => role.name === "ROLE_ADMIN"
                      )}
                      onClick={() => handleToggleStatus(user.id)}
                    >
                      {user.live ? "Disable" : "Enable"}
                    </MDBBtn>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Base>
  );
}

export default ShowUsers;
