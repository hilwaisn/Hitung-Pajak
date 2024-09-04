import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"

const initialFieldsValue = {
  id: 0,
  username: '',
  password: '',
};

  const Home = () => {
    const [values, setValues] = useState(initialFieldsValue);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()
  
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

        const user = {
          employeeUsername: e.target.username.value,
          employeePassword: e.target.password.value,
          isAdmin: false
        };
        console.log(user)

        fetch("http://localhost:8000/api/Employee/login", {
          method: "POST",
          headers:{
            "Content-Type": "application/json"
          },
          body: JSON.stringify(user)
        }).then(res=>res.json())
        .then(res=>{
          const expire = new Date();
          expire.setDate(expire.getDate()+1)
          Cookies.set("token", JSON.stringify(res.token), {expires: expire})
          navigate("/home-employee")
        })
      }
    };
    
    const applyErrorClass = field => (field in errors && errors[field] === false ? ' invalid-field' : '');

      return (
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-green-900">
                Masuk Ke Akun Anda
            </h2>
          </div>
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form action="#" method="POST" className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="username" className="block text-2xl font-medium leading-6 text-green-900">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    name="username"
                    type="username"
                    required
                    autoComplete="username"
                    className={"form-control w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" + applyErrorClass('username')}
                    placeholder="Masukkan Username"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-2xl font-medium leading-6 text-green-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className={"form-control w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" + applyErrorClass('username')}
                    placeholder="Masukkan Password"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                  Masuk
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-black font-bold">
              Kamu Admin?{' '}
              <Link to="/admin" className="font-semibold leading-6 text-green-900 hover:text-black">
                Klik ini ya
              </Link>
            </p>
          </div>
        </div>
      </>
    )
  }; 

  export default Home;