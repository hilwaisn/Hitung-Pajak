import { useEffect, useState } from "react";
import axios from "axios";
import { House, Info } from "lucide-react";
import { Link } from "react-router-dom";

const initialFieldsValue = {
  id: 0,
  username: '',
  password: '',
};

const Admin = () => {
  const [values, setValues] = useState(initialFieldsValue);
  const [errors, setErrors] = useState({});
  const [Admin, setAdmin] = useState([]);


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

  useEffect(() => {
    refreshAdmin();
  }, []);

  const employeeAPI = (url = "http://localhost:8000/api/Admin/") => {
    return {
      fetchAll: () => axios.get(url),
      create: (newRecord) => axios.post(url, newRecord),
    };
  };

  function refreshAdmin() {
    employeeAPI()
      .fetchAll()
      .then((res) => {
        setAdmin(res.data);
      })
      .catch((err) => console.log(err));
  }

  const applyErrorClass = field => (field in errors && errors[field] === false ? ' invalid-field' : '');

  return (
    <>
      <header className="flex w-full items-center justify-between bg-slate-100 p-4 shadow-lg">
      <div className="flex w-1/2  items-center gap-1">
        <img src="https://www.canva.com/design/DAGPk408xO0/4lRWfjNb50z3IDFqFMpVyw/view?utm_content=DAGPk408xO0&utm_campaign=designshare&utm_medium=link&utm_source=editor" alt="" />
        <h1 className="text-2xl font-bold">Hitung Pajak</h1>
      </div>
      <nav className="flex w-1/2">
            <House className="w-6 h-6" />
            <Link to="/" className="text-gray-800 hover:text-gray-900">Home</Link>
            <Info className="w-6 h-6" />
            <Link to="/about" className="text-gray-800 hover:text-gray-900">About</Link>
      </nav>
    </header>
      <div className="container text-center mt-10">
        <h2 className="text-3xl font-bold mb-4">LOGIN</h2>
      </div>
      <form
        autoComplete="off"
        noValidate
        onSubmit={handleFormSubmit}
        className="container mt-8"
      >
        <div className="card p-6 rounded-lg shadow-md">
            <div className="form-group mb-4">
              <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
              <input
                type="text"
                id="username"
                className={"form-control w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" + applyErrorClass('username')}
                placeholder="Masukkan Username"
                name="username"
                value={values.username}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group mb-4">
              <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
              <input
                type="password"
                id="password"
                className="form-control w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Masukkan Password"
                name="password"
                value={values.password}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary px-6 py-2 rounded-md bg-blue-500 text-white font-bold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                Submit
              </button>
            </div>
          </div>
      </form>
    </>
  );
};

export default Admin;