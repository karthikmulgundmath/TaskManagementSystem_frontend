import { useEffect, useState } from "react";
import { APICalls } from "../../api-calls/ApiCalls";
import "./UserManagement.css";
import AddProject from "../project-management/add-project/AddProject";
import { Button } from "@mui/material";
import AddUser from "./add-user/AddUser";

const UserManagement = () => {
  const [openAddUserDialog, setOpenAddUserDialog] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserDetails();
    console.log("Iam calling");
  }, []);

  const handleOpenDialog = () => {
    setOpenAddUserDialog(true);
  };

  const getUserDetails = async () => {
    await APICalls.getDetails("http://localhost:3000/users")
      .then((res) => {
        if (res.status === 200) {
          console.log(res, "sss");
          setUsers(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCloseDialog = async (data) => {
    if (data) {
      getUserDetails();
    }
    setOpenAddUserDialog(false); // Close the dialog
  };

  // console.log(users, "users");
  return (
    <div className="user-management-container">
      {openAddUserDialog && (
        <AddUser open={openAddUserDialog} handleClose={handleCloseDialog} />
      )}
      <div className="user-management-header">
        <Button onClick={handleOpenDialog} className="add-user">
          Add User
        </Button>
      </div>
      <div className="user-management-body">
        <div className="user-list-header">Users List - {users?.length}</div>
        <div className="user-list">
          {users.map((project, index) => (
            <div key={index}>{project.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
