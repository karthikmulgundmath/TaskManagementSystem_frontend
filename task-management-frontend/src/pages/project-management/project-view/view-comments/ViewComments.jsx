import "./ViewComments.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const ViewComments = ({
  open,
  handleClose,
  taskComments,
  handleDeleteComment,
  handleUpdateComment,
  selectedCommentDetails,
}) => {
  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>Add Comment</DialogTitle>
        <DialogContent sx={{ height: "300px", overflowY: "scroll" }}>
          {taskComments?.map((comment, index) => {
            return (
              <div key={index} className="comment-item">
                <p>{comment?.content}</p>
                <span>
                  <EditIcon
                    onClick={() => handleUpdateComment(comment)}
                    sx={{ cursor: "pointer" }}
                  />
                  <DeleteIcon
                    onClick={() => handleDeleteComment(comment?.id)}
                    sx={{ cursor: "pointer" }}
                  />
                </span>
              </div>
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {/* <Button onClick={handleSubmit} type="submit">
            {selectedCommentDetails?.comment ? "Update Comment" : "Add Comment"}
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewComments;
