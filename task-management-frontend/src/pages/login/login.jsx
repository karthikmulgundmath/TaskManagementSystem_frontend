import { Button } from "@mui/material";
import "./Login.css";
import { useEffect, useState } from "react";
import InputField from "../../components/text-field/InputField";
import { APICalls } from "../../api-calls/ApiCalls";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  useEffect(() => {}, []);
  const onChangeOfCredField = (event) => {
    const { name, value } = event.target;
    console.log(name, value);
    setCredentials({ ...credentials, [name]: value });
  };

  const onClickOnSubmit = async () => {
    console.log(credentials);
    return await APICalls.Login("http://localhost:3000/auth/login", credentials)
      .then((res) => {
        if (res.status === 201) {
          localStorage.setItem("authToken", res?.data?.access_token);
          window.location.href = "/project-management";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-fields">
          <div className="login-text">Login</div>
          <InputField
            name="email"
            onChange={onChangeOfCredField}
            label="Email"
          />
          <InputField
            name="password"
            onChange={onChangeOfCredField}
            label="Password"
          />
          <Button onClick={onClickOnSubmit} className="button">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
