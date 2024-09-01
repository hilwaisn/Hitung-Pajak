import { useState } from "react";
import axios from "axios";

const initialFieldsValue = {
  id: 0,
  username: '',
  password: '',
};

const Admin = () => {
  const [values, setValues] = useState(initialFieldsValue);
  const [errors, setErrors] = useState({});

  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };  

  const validate = () => {
    let temp = {};
    temp.username = values.username === "" ? false : true;
    temp.password = values.password === "" ? false : true;
    setErrors(temp);

    return Object.values(temp).every(x => x === true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append('adminID', values.employeeID);
      formData.append('username', values.username);
      formData.append('password', values.password);
    }
  };

  const employeeAPI = (url = "http://localhost:8000/api/Admin/") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
    };
  };
  
  const applyErrorClass = field => (field in errors && errors[field] === false ? ' invalid-field' : '');

  return (
    <>
      <div className="container text-center">
        <p className="lead">Admin</p>
      </div>

      <form
        autoComplete="off"
        noValidate
        onSubmit={handleFormSubmit}
      >
        <div className="card">
            <div className="form-group">
              <input
                className={"form-control" + applyErrorClass('username')}
                placeholder="Username"
                name="username"
                value={values.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
      </form>
    </>
  );
};

export default Admin;