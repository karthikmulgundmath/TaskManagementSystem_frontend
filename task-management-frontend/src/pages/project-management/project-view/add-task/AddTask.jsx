import { useEffect, useState } from "react";
import "./AddTask.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { APICalls } from "../../../../api-calls/ApiCalls";

const AddTask = ({
  open,
  handleClose,
  selectedProjectDetails,
  selectedTask,
}) => {
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
    status: "completed",
    priority: "high",
    due_date: dayjs(new Date()),
  });

  useEffect(() => {
    if (selectedTask?.title) {
      setTaskDetails({
        title: selectedTask?.title,
        description: selectedTask?.description,
        status: selectedTask?.status,
        priority: selectedTask?.priority,
        due_date: selectedTask?.due_date,
      });
    }
  }, [selectedTask]);

  const handleChange = (event) => {
    setTaskDetails({
      ...taskDetails,
      [event.target.name]: event.target.value,
    });
  };

  const handleChangeDate = (event) => {
    setTaskDetails({
      ...taskDetails,
      ["due_date"]: dayjs(event).toISOString(),
    });
  };

  const handleSubmit = async () => {
    const payload = {
      ...taskDetails,
      project_id: selectedProjectDetails.id,
      assigned_user_id: "8a23c69b-b7d7-4d3b-aaa1-22cc75f8b7a9",
    };
    if (selectedTask?.title) {
      await APICalls.updateDetails(
        `http://localhost:3000/task/${selectedTask.id}`,
        payload
      )
        .then((res) => {
          if (res.status === 201) {
            handleClose(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await APICalls.postDetails(`http://localhost:3000/tasks`, payload)
        .then((res) => {
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
          {selectedTask?.title ? "Update Task" : " Add Task"}
        </DialogTitle>
        <DialogContent sx={{ height: "400px" }}>
          <TextField
            autoFocus
            required
            value={taskDetails.title}
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <TextField
            autoFocus
            required
            value={taskDetails.description}
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
          <FormControl fullWidth sx={{ mt: 2.5 }}>
            <InputLabel id="demo-simple-select-label">Status</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskDetails.status}
              label="status"
              name="status"
              onChange={handleChange}
            >
              <MenuItem value={"inProgress"}>InProgress</MenuItem>
              <MenuItem value={"pending"}>Pending</MenuItem>
              <MenuItem value={"completed"}>Completed</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2.5 }}>
            <InputLabel id="demo-simple-select-label">Priority</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={taskDetails.priority}
              label="Priority"
              name="priority"
              onChange={handleChange}
            >
              <MenuItem value={"high"}>High</MenuItem>
              <MenuItem value={"low"}>Low</MenuItem>
              <MenuItem value={"medium"}>Medium</MenuItem>
            </Select>
          </FormControl>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <DemoItem label="Select Due Date">
                <DatePicker
                  defaultValue={dayjs(new Date())}
                  onChange={handleChangeDate}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit">
            {selectedTask?.title ? "Update Task" : " Add Task"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTask;
