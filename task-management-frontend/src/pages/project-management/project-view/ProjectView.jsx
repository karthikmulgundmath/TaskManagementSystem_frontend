import { Button } from "@mui/material";
import "./ProjectView.css";
import { useEffect, useState } from "react";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import AddTask from "./add-task/AddTask";
import { useLocation } from "react-router-dom";
import { APICalls } from "../../../api-calls/ApiCalls";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AddComments from "./add-comments/AddComments";
import ViewComments from "./view-comments/ViewComments";

const ProjectView = () => {
  const [openAddTaskDialog, setOpenAddTaskDialog] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [openCommentDialog, setOpenCommentDialog] = useState(false);
  const [openViewCommentDialog, setOpenViewCommentDialog] = useState(false);
  const [taskComments, setTaskComments] = useState([]);
  const [selectedCommentDetails, setSelectedCommentDetails] = useState({});

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    getTaskDetails();
  }, [location.state]);

  const getTaskDetails = async () => {
    console.log(location.state.projectDetails?.id, "wwww");
    await APICalls.getDetails(`http://localhost:3000/tasks/query`)
      .then((res) => {
        if (res.status === 200) {
          setTasks(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCommentsByTaskId = async (taskId) => {
    await APICalls.getDetails(`http://localhost:3000/comments/task/${taskId}`)
      .then((res) => {
        if (res.status === 200) {
          setTaskComments(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenDialog = () => {
    setOpenAddTaskDialog(true);
  };

  const handleCloseDialog = (data) => {
    setSelectedTask({});
    if (data) getTaskDetails();
    setOpenAddTaskDialog(false);
  };

  const onClickOnEdit = (event, taskDetails) => {
    event.stopPropagation();
    handleOpenDialog();
    setSelectedTask(taskDetails);
    console.log(taskDetails, "taskDetails");
  };

  const onClickOnDelete = async (event, taskDetails) => {
    event.stopPropagation();
    await APICalls.deleteDetails(
      `http://localhost:3000/tasks/${taskDetails.id}`
    )
      .then((res) => {
        if (res.status === 200) {
          getTaskDetails();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleCommentDialogOpen = (event, task) => {
    event.stopPropagation();
    setOpenCommentDialog(true);
    setSelectedTask(task);
  };

  const handleCommentDialogClose = (data) => {
    setSelectedCommentDetails({});
    setOpenCommentDialog(false);
    if (data) getAllCommentsByTaskId(selectedTask?.id);
  };

  const handleViewCommentDialogOpen = (event, task) => {
    event.stopPropagation();
    setOpenViewCommentDialog(true);
    setSelectedTask(task);
    getAllCommentsByTaskId(task?.id);
    console.log(task, "task");
  };

  const handleViewCommentDialogClose = () => {
    setOpenViewCommentDialog(false);
  };

  const handleDeleteComment = async (commentId) => {
    await APICalls.deleteDetails(`http://localhost:3000/comments/${commentId}`)
      .then((res) => {
        if (res.status === 200) {
          getAllCommentsByTaskId(selectedTask?.id);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleUpdateComment = async (comment) => {
    setOpenCommentDialog(true);
    setSelectedCommentDetails(comment);
  };

  return (
    <div className="project-view-container">
      {openViewCommentDialog && (
        <ViewComments
          open={openViewCommentDialog}
          handleClose={handleViewCommentDialogClose}
          taskComments={taskComments}
          handleDeleteComment={handleDeleteComment}
          handleUpdateComment={handleUpdateComment}
          selectedCommentDetails={selectedCommentDetails}
        />
      )}
      {openCommentDialog && (
        <AddComments
          open={openCommentDialog}
          handleClose={handleCommentDialogClose}
          selectedProjectDetails={location.state.projectDetails}
          selectedTaskDetails={selectedTask}
          selectedCommentDetails={selectedCommentDetails}
        />
      )}
      {openAddTaskDialog && (
        <AddTask
          open={openAddTaskDialog}
          handleClose={handleCloseDialog}
          selectedProjectDetails={location.state.projectDetails}
          selectedTask={selectedTask}
        />
      )}
      <div className="project-view-header">
        <span onClick={() => navigate(-1)}>
          <ArrowBackIosNewIcon />
          {location.state.projectDetails?.name}
        </span>
        <Button onClick={handleOpenDialog} className="add-project">
          Add Task
        </Button>
      </div>
      <div className="task-management-body">
        <div className="task-list-header">
          Task List -{" "}
          {
            tasks?.filter(
              (task) => task?.project_id === location.state?.projectDetails?.id
            ).length
          }
        </div>
        <div className="task-list">
          {tasks.map((task, index) => {
            if (task?.project_id === location.state?.projectDetails?.id) {
              return (
                <div className="task-item" key={index}>
                  <div className="task-item-details">
                    <span className="task-item-text">
                      <span>Title: </span>
                      {task.title}
                    </span>
                    <span className="task-item-text">
                      <span>Description: </span>
                      {task.description}
                    </span>
                    <span className="task-item-text">
                      <span>Status: </span>
                      {task.status}
                    </span>
                    <span className="task-item-text">
                      <span>Priority: </span>
                      {task.priority}
                    </span>
                    <span
                      className="view-comments"
                      onClick={(event) =>
                        handleViewCommentDialogOpen(event, task)
                      }
                    >
                      View Comments
                    </span>
                  </div>
                  <div>
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.1rem",
                      }}
                      onClick={(event) => handleCommentDialogOpen(event, task)}
                    >
                      <AddIcon /> Add Comments
                    </span>
                    <EditIcon onClick={(event) => onClickOnEdit(event, task)} />
                    <DeleteIcon
                      onClick={(event) => onClickOnDelete(event, task)}
                    />
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>{" "}
    </div>
  );
};

export default ProjectView;
