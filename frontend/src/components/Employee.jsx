import { useEffect, useState } from "react";
import axios from "axios";
import EmployeeData from "./EmployeeData";

const initialFieldsValue = {
  employeeID: 0,
  employeeUsername: '',
  employeePassword: '',
};

const Employee = () => {
  const [values, setValues] = useState(initialFieldsValue);
  const [errors, setErrors] = useState({});
  const [Employee, setEmployeed] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [addForEdit, setAddOrEdit] = useState(null);


  const handleInputChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };  

  const validate = () => {
    let temp = {};
    temp.employeeUsername = values.employeeUsername === "" ? false : true;
    temp.employeePassword = values.employeePassword === "" ? false : true;
    setErrors(temp);

    return Object.values(temp).every(x => x === true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append('employeeID', values.employeeID);
      formData.append('employeeUsername', values.employeeUsername);
      formData.append('employeePassword', values.employeePassword);
    }
  };

  useEffect(() => {
    refreshEmployeeData();
  }, []);

  const employeeAPI = (url = "http://localhost:8000/api/Employee/") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
    };
  };

  function refreshEmployeeData() {
    employeeAPI()
      .fetchAll()
      .then((res) => {
        setEmployeed(res.data);
      })
      .catch((err) => console.log(err));
  }

  const applyErrorClass = field => (field in errors && errors[field] === false ? ' invalid-field' : '');

  return (
    <>
      <div className="container text-center">
        <p className="lead">Employee</p>
      </div>
      <div className="col-md-4">
        <Employee addOrEdit={addForEdit} recordForEdit={recordForEdit} />
      </div>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleFormSubmit}
      >
        <div className="card">
            <div className="form-group">
              <input
                className={"form-control" + applyErrorClass('employeeUsername')}
                placeholder="Employee Username"
                name="employeeUsername"
                value={values.employeeUsername}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Employee Password"
                name="employeePassword"
                value={values.employeePassword}
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

export default Employee;