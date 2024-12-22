import { Button } from "@mui/material";
import "./ProjectManagement.css";
import { useEffect, useState } from "react";
import AddProject from "./add-project/AddProject";
import { APICalls } from "../../api-calls/ApiCalls";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";

const ProjectManagement = () => {
  const [openAddProjectDialog, setOpenAddProjectDialog] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProjectDetails, setSelectedProjectDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    getProjectDetails();
    console.log("Iam calling");
  }, []);

  const handleOpenDialog = () => {
    setOpenAddProjectDialog(true);
  };

  const getProjectDetails = async () => {
    await APICalls.getDetails("http://localhost:3000/projects")
      .then((res) => {
        if (res.status === 200) {
          console.log(res, "sss");
          setProjects(res?.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCloseDialog = async (data) => {
    setSelectedProjectDetails({});
    if (data) {
      getProjectDetails();
    }
    setOpenAddProjectDialog(false); // Close the dialog
  };

  const onClickOnEdit = (event, projectDetails) => {
    event.stopPropagation();
    handleOpenDialog();
    setSelectedProjectDetails(projectDetails);
    console.log(projectDetails, "projectDetails");
  };

  const onClickOnDelete = async (event, projectDetails) => {
    event.stopPropagation();
    await APICalls.deleteDetails(
      `http://localhost:3000/projects/${projectDetails.id}`
    )
      .then((res) => {
        if (res.status === 200) {
          getProjectDetails();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onClickOnProjectItem = (projectDetails) => {
    navigate(`/project-management/project-view`, { state: { projectDetails } });
  };
  return (
    <div className="project-management-container">
      {openAddProjectDialog && (
        <AddProject
          open={openAddProjectDialog}
          handleClose={handleCloseDialog}
          selectedProjectDetails={selectedProjectDetails}
        />
      )}
      <div className="project-management-header">
        <Button onClick={handleOpenDialog} className="add-project">
          Add Project
        </Button>
      </div>
      <div className="project-management-body">
        <div className="project-list-header">
          Project List - {projects?.length}
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <div
              className="project-item"
              key={index}
              onClick={(event) => onClickOnProjectItem(project)}
            >
              <span>{project.name}</span>
              <div>
                <EditIcon onClick={(event) => onClickOnEdit(event, project)} />
                <DeleteIcon
                  onClick={(event) => onClickOnDelete(event, project)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectManagement;
