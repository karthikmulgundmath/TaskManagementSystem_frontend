import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { APICalls } from "../../../../api-calls/ApiCalls";

const AddComments = ({
  open,
  handleClose,
  selectedProjectDetails,
  selectedTaskDetails,
  selectedCommentDetails,
}) => {
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (selectedCommentDetails?.content) {
      console.log(selectedCommentDetails, "selectedCommentDetails");
      setComment(selectedCommentDetails?.content);
    }
  }, []);

  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = async () => {
    if (selectedCommentDetails?.content) {
      await APICalls.updateDetails(
        `http://localhost:3000/comments/${selectedCommentDetails?.id}`,
        {
          content: comment,
        }
      )
        .then((res) => {
          if (res.status === 200) {
            handleClose(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await APICalls.postDetails(`http://localhost:3000/comments`, {
        task_id: selectedTaskDetails?.id,
        author_id: selectedProjectDetails?.owner_id,
        content: comment,
      })
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
    <div className="add-comment-container">
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <DialogTitle>
          {selectedCommentDetails.content ? "Update Comment" : "Add Comment"}
        </DialogTitle>
        <DialogContent sx={{ height: "100px" }}>
          <TextField
            autoFocus
            required
            value={comment}
            margin="dense"
            id="comment"
            name="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} type="submit">
            {selectedCommentDetails?.content ? "Update Comment" : "Add Comment"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddComments;
