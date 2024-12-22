import TextField from "@mui/material/TextField";

const InputField = (props) => {
  return (
    <TextField
      {...props}
      id="outlined-basic"
      variant="outlined"
      sx={{ width: "100%", borderRadius: "12px" }}
    />
  );
};

export default InputField;
