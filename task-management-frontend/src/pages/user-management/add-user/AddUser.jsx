import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { APICalls } from "../../../api-calls/ApiCalls";

const AddUser = ({ open, handleClose }) => {
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    password: "",
    role: "contributor",
  });

  const handleChange = (event) => {
    setUserDetails({
      ...userDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async () => {
    await APICalls.postDetails("http://localhost:3000/users", {
      ...userDetails,
    })
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          handleClose(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="add-project-container">
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent sx={{ height: "auto", rowGap: "20px" }}>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="User Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="email"
            name="email"
            label="User Email"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="User Password"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <FormControl fullWidth sx={{ mt: 2.5 }}>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={userDetails.role}
              label="role"
              name="role"
              onChange={handleChange}
            >
              <MenuItem value={"contributor"}>contributor</MenuItem>
              <MenuItem value={"cont"}>cont</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit">
            Add User
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddUser;
