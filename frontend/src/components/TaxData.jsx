import { useEffect, useState } from "react";
import EmployeeData from "./EmployeeData";
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

const TaxData = () => {
  const [TaxData, setTaxData] = useState([]);
  const [addOrEdit, setAddOrEdit]= useState[null];
  const [recordForEdit, setRecordForEdit] = useState(null);

  useEffect(() => {
    refreshTaxData();
  }, []);

  const employeeAPI = (url = "http://localhost:8000/api/TaxData/") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
      pdate: (id, updatedRecord) => axios.put(url + id, updatedRecord),
      delete: (id) => axios.delete(url + id),
    };
  };

  function refreshTaxData() {
    employeeAPI()
      .fetchAll()
      .then((res) => {
        setTaxData(res.data);
      })
      .catch((err) => console.log(err));
  }

  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("employeeID") == "0")
      employeeAPI()
        .create(formData)
        .then((res) => {
          onSuccess();
          refreshTaxData();
        })
        .catch((err) => console.log(err));
    else
      employeeAPI()
        .update(formData.get("employeeID"), formData)
        .then((res) => {
          onSuccess();
          refreshTaxData();
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
          refreshTaxData();
        })
        .catch((err) => console.log(err));
  };

  const employeeCard = data => (
    <div className="card" onClick={() => { showRecordDetails(data) }}>
        <div className="card-body">
            <h5>{data.employeeName}</h5>
            <span>{data.employeeNik}</span> 
            <span>{data.TaxDataalary}</span> 
            <span>{data.employeeAllowance}</span> 
            <span>{data.employeeGender}</span> 
            <span>{data.TaxDatatatus}</span> 
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
            <h1 className="display-4">Tax Data</h1>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <TaxData addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
      </div>
      <div className="col-md-8">
        <table>
          <tbody>
            {[...Array(Math.ceil(TaxData.length / 3))].map((e, i) => (
              <tr key={i}>
                <td>{employeeCard(TaxData[3 * i])}</td>
                <td>
                  {TaxData[3 * i + 1]
                    ? employeeCard(TaxData[3 * i + 1])
                    : null}
                </td>
                <td>
                  {TaxData[3 * i + 2]
                    ? employeeCard(TaxData[3 * i + 2])
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

export default TaxData;
