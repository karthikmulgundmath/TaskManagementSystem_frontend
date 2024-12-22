import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { APICalls } from "../../../api-calls/ApiCalls";

const AddProject = ({ open, handleClose, selectedProjectDetails }) => {
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    if (selectedProjectDetails?.name) {
      setProjectName(selectedProjectDetails?.name);
    }
  }, [selectedProjectDetails]);

  const handleChange = (event) => {
    setProjectName(event.target.value);
  };

  const handleSubmit = async () => {
    console.log(selectedProjectDetails, "selectedProjectDetails");
    if (selectedProjectDetails?.name) {
      await APICalls.updateDetails(
        `http://localhost:3000/projects/${selectedProjectDetails.id}`,
        {
          name: projectName,
        }
      )
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            handleClose(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await APICalls.postDetails("http://localhost:3000/projects", {
        name: projectName,
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
    }
  };

  return (
    <div className="add-project-container">
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>
          {selectedProjectDetails?.name ? "Update Project" : "Add Project"}
        </DialogTitle>
        <DialogContent sx={{ height: "100px" }}>
          <TextField
            autoFocus
            required
            value={projectName}
            margin="dense"
            id="projectName"
            name="projectName"
            label="Project Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit">
            {selectedProjectDetails?.name ? "Update Project" : "Add Project"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProject;
