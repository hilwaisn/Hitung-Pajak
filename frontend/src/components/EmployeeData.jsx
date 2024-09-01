import { useEffect, useState } from "react";
import axios from "axios";

const initialFieldsValue = {
  employeeID: 0,
  employeeName: '',
  employeeNik: '',
  employeeSalary: '',
  employeeAllowance: '',
  employeeGender: '',
  employeeStatus: '',
  employeeDependents: 0,
  employeeUsername: '',
  employeePassword: '',
};

const EmployeeData = () => {
  const [EmployeeData, setEmployeed] = useState([]);
  const [addOrEdit, setAddOrEdit]= useState[null];
  const [recordForEdit, setRecordForEdit] = useState(null);

  useEffect(() => {
    refreshEmployeeData();
  }, []);

  const employeeAPI = (url = "http://localhost:8000/api/EmployeeData/") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      pdate: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
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

  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("employeeID") == "0")
      employeeAPI()
        .create(formData)
        .then((res) => {
          onSuccess();
          refreshEmployeeData();
        })
        .catch((err) => console.log(err));
    else
      employeeAPI()
        .update(formData.get("employeeID"), formData)
        .then((res) => {
          onSuccess();
          refreshEmployeeData();
        })
        .catch((err) => console.log(err));
  };

  const showRecordDetails = (data) => {
    setRecordForEdit(data);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this record?"))
      employeeAPI()
        .delete(id)
        .then(() => {
          refreshEmployeeData();
        })
        .catch((err) => console.log(err));
  };

  const employeeCard = data => (
    <div className="card" onClick={() => { showRecordDetails(data) }}>
        <div className="card-body">
            <h5>{data.employeeName}</h5>
            <span>{data.employeeNik}</span> 
            <span>{data.EmployeeDataalary}</span> 
            <span>{data.employeeAllowance}</span> 
            <span>{data.employeeGender}</span> 
            <span>{data.employeeStatus}</span> 
            <span>{data.employeeDependents}</span>
            <span>{data.employeeUsername}</span> 
            <span>{data.employeePassword}</span> <br />
            <button className="btn btn-light delete-button" onClick={e => onDelete(e, parseInt(data.employeeID))}>
                <i className="far fa-trash-alt"></i>
            </button>
        </div>
    </div>
  )

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="jumbotron jumbotron-fluid py-4">
          <div className="container text-center">
            <h1 className="display-4">Employee Data</h1>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <EmployeeData addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </div>
      <div className="col-md-8">
        <table>
          <tbody>
            {[...Array(Math.ceil(EmployeeData.length / 3))].map((e, i) => (
              <tr key={i}>
                <td>{employeeCard(EmployeeData[3 * i])}</td>
                <td>
                  {EmployeeData[3 * i + 1]
                    ? employeeCard(EmployeeData[3 * i + 1])
                    : null}
                </td>
                <td>
                  {EmployeeData[3 * i + 2]
                    ? employeeCard(EmployeeData[3 * i + 2])
                    : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeData;
