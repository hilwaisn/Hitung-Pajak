import { useState, useEffect } from "react";
import {PlusCircle} from "lucide-react";
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { useNavigate } from "react-router-dom";

export default function Home() {
    //const { pajak, setPajak } = useContext();
    const [employee, setEmployee] = useState([]);
    const [updateEmployee, setUpdateEmlpoyee] = useState(null);
    const [newemployee, setNewemployee] = useState(null);
    const token = JSON.parse(Cookies.get("token"))
    const navigate = useNavigate()

    function handleDelete(id) {
        if (confirm("Apakah anda yakin akan menghapus karyawan ini?")) {
        fetch(`http://localhost:8000/api/EmployeeData/${id}`, {
            method: "DELETE",
            headers: {
              Authorization: "Bearer "+token,
              "Content-Type": "application/json",
            },
        })
            .then((response) => response.text())
            .then(() => {
            // setEmployee((prevEmployee) =>
            //   prevEmployee.filter((p) => p.id !== id)
            // );
            // alert(message);
          });
          fetchEmployeeData()
        }
    }

    function saveUpdate() {
      fetch(`http://localhost:8000/api/EmployeeData/${updateEmployee.employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token
        },
        body: JSON.stringify(updateEmployee),
      })
      // .then((response) => response.text())
      .then((message) => {
        console.log(message)
        // setEmployee((prevemployee) =>
        //   prevemployee.map((p) =>
        //     p.id === updateEmployee.id ? updateEmployee : p)
        // );
        // alert(message);
      });

      fetchEmployeeData()
      setUpdateEmlpoyee(null);
    }

    function handleAddNewemployee() {
        fetch(`http://localhost:8000/api/EmployeeData`, {
          method: "POST",
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        body: JSON.stringify(newemployee),
        })
        .then((response) => console.log(response))
        .then(() => {
            // fetch(`${import.meta.env.VITE_API_BASE_URL}/api/EmployeeData`)
            // .then((response) => response.json())
            // .then((employee) => setEmployee(employee));
          });
          fetchEmployeeData()
        setNewemployee(null);
    }

    function fetchEmployeeData(){
        fetch("http://localhost:8000/api/EmployeeData").then((res)=>res.json())
        .then((response)=>{
          setEmployee(response)
        })
    }

    useEffect(()=>{
      fetchEmployeeData()
    },[])



    if (jwtDecode(token).role !== "admin") navigate("/admin")
    else
    return (
    <div>
      <div className="flex items-center mt-1 w-full p-3 gap-2">
      <button onClick={() => setNewemployee({})}
      className="flex w-1/5 justify-center gap-2 p-4">
        <PlusCircle /> Add
        </button>
      </div>

        {/* table */}
        <div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
              <thead>
                  <tr>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">ID</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Name</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">NIK</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Salary</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Allowance</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Gender</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Status</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Dependents</th>
                      <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Action</th>
                  </tr>
              </thead>
              <tbody>
                {employee && employee.map((emp, i)=>(

                  <tr key={i}>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b">{i+1}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b">{emp.employeeName}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b">{emp.employeeNik}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b">{emp.employeeSalary}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b">{emp.employeeAllowance}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b">{emp.employeeGender}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b">{emp.employeeStatus}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b">{emp.employeeDependents}</td>
                      <td className="px-4 py-2 text-sm text-gray-700 border-b">
                        <button className="bg-green-600 p-2 rounded-full text-white" onClick={()=>setUpdateEmlpoyee(emp)}>Update</button>
                        <button className="bg-red-600 p-2 rounded-full text-white" onClick={()=>handleDelete(emp.employeeId)}>Delete</button>
                      </td>
                  </tr>
                ))}
                  {/* Tambahkan lebih banyak baris di sini jika diperlukan */}
              </tbody>
          </table>
      </div>

        </div>

      {updateEmployee && (
        <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 flex items-center justify-center text-black p-4">
          <form onSubmit={(e) => {
            e.preventDefault();
            // console.log(updateEmployee)
            saveUpdate();
          }}
          className="grid grid-cols-2 border border-black p-8 gap-4 bg-white">
          <label>Nama Karyawan</label>
            <input
            type="text"
            id="name"
            name="employeeName"
            className={"form-control w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"}
            value={updateEmployee.employeeName}
            onChange={(e) =>
            setUpdateEmlpoyee({
            ...updateEmployee,
            employeeName: e.target.value,
            })
            }/>
          <label>Nomor Induk Kependudukan</label>
            <input
            type="number"
            id="nik"
            name="employeeNik"
            value={updateEmployee.employeeNik}
            onChange={(e) =>
            setUpdateEmlpoyee({
            ...updateEmployee,
            employeeNik: parseInt(e.target.value),
            })
            }/>
          <label>Gaji Pokok</label>
            <input
            type="number"
            id="salary"
            name="employeeSalary"
            value={updateEmployee.employeeSalary}
                onChange={(e) =>
                  setUpdateEmlpoyee({
                    ...updateEmployee,
                    employeeSalary: e.target.value,
                  })
            }/>

          <label>Tunjangan</label>
            <input
            type="number"
            id="allowance"
            name="employeeAllowance"
            value={updateEmployee.employeeAllowance}
                onChange={(e) =>
                setUpdateEmlpoyee({
                  ...updateEmployee,
                  employeeAllowance: e.target.value,
                })
            }/>

                <label>Jenis Kelamin</label>
                <div className="flex justify-evenly">
                <input
                type="radio"
                id="gender"
                checked={updateEmployee.employeeGender === "Wanita"}
                value={updateEmployee.employeeGender}
                onChange={(e) =>
                  setUpdateEmlpoyee({
                    ...updateEmployee,
                    employeeGender: e.target.value,
                  })
                } />Wanita

                <input
                type="radio"
                id="gender"
                value={updateEmployee.employeeGender}
                checked={updateEmployee.employeeGender === "Pria"}
                onChange={(e) =>
                  setUpdateEmlpoyee({
                    ...updateEmployee,
                    employeeGender: e.target.value,
                  })
                } />Pria
                </div>

            <label>Status</label>
            <div className="flex justify-evenly">
              <input
                type="radio"
                id="status"
                name="employeeStatus"
                value={"Kawin"}
                checked={updateEmployee.employeeStatus === "Kawin"}
                onChange={(e) =>
                  setUpdateEmlpoyee({
                    ...updateEmployee,
                    employeeStatus: e.target.value,
                  })
                } />Kawin

                <input
                type="radio"
                id="status"
                name="employeeStatus"
                value={"Tidak Kawin"}
                checked={updateEmployee.employeeStatus === "Tidak Kawin"}
                onChange={(e) =>
                  setUpdateEmlpoyee({
                    ...updateEmployee,
                    employeeStatus: e.target.value,
                  })
                } />Tidak Kawin
                </div>
                
                <div>
                <label>Tanggunan</label>
                <p className="font-thin">(Maksimal 3 orang)</p>
                </div>
                <input
                type="number"
                id="dependents"
                name="employeeDependents"
                value={updateEmployee.employeeDependents}
                onChange={(e) =>
                  setUpdateEmlpoyee({
                    ...updateEmployee,
                    employeeDependents: e.target.value,
                  })
                }/>

              <button type="submit">Save</button>
              <button type="button" onClick={() => setUpdateEmlpoyee(null)}>
                Cancel
              </button>
            </form>
          </div>
        )}

        {newemployee && (
            <div className="w-full h-full bg-black bg-opacity-50 fixed top-0 flex items-center justify-center text-black p-4">
            <form onSubmit={(e) => {
              e.preventDefault();
              handleAddNewemployee();
          }}
            className="grid grid-cols-2 border border-black p-8 gap-4 bg-white"
            >
              <label>Nama Karyawan</label>
            <input
            type="text"
            id="name"
            name="employeeName"
            className={"form-control w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"}
            value={newemployee.employeeName}
            onChange={(e) =>
            setNewemployee({
            ...newemployee,
            employeeName: e.target.value,
            })
            }/>
          <label>Nomor Induk Kependudukan</label>
            <input
            type="number"
            id="nik"
            name="employeeNik"
            className={"form-control w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"}
            value={newemployee.employeeNik}
            onChange={(e) =>
            setNewemployee({
            ...newemployee,
            employeeNik: parseInt(e.target.value),
            })
            }/>
          <label>Gaji Pokok</label>
            <input
            type="number"
            id="salary"
            name="employeeSalary"
            className={"form-control w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"}
            value={newemployee?.employeeSalary}
                onChange={(e) =>
                  setNewemployee({
                    ...newemployee,
                    employeeSalary: parseInt(e.target.value),
                  })
            }/>

          <label>Tunjangan</label>
            <input
            type="number"
            id="allowance"
            name="employeeAllowance"
            className={"form-control w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"}
            value={newemployee?.employeeAllowance}
                onChange={(e) =>
                setNewemployee({
                  ...newemployee,
                  employeeAllowance: parseInt(e.target.value),
                })
            }/>

                <label>Jenis Kelamin</label>
                <div className="flex justify-evenly">
                  <input
                type="radio"
                id="gender"
                value="Wanita"
                className={"form-control rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"}
                onChange={(e) =>
                  setNewemployee({
                    ...newemployee,
                    employeeGender: e.target.value,
                  })
                } />Wanita
                <input
                type="radio"
                id="gender"
                value={"Pria"}
                className={"form-control rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"}
                onChange={(e) =>
                  setNewemployee({
                    ...updateEmployee,
                    employeeGender: e.target.value,
                  })
                } />Pria</div>

            <label>Status</label>
            <div className="flex justify-evenly">
              <input
                type="radio"
                id="status"
                name="employeeStatus"
                className={"form-control rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"}
                value="Kawin"
                onChange={(e) =>
                  setNewemployee({
                    ...newemployee,
                    employeeStatus: e.target.value,
                  })
                } />Kawin

                <input
                type="radio"
                id="status"
                name="employeeStatus"
                className={"form-control rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"}
                value="Tidak Kawin"
                onChange={(e) =>
                  setNewemployee({
                    ...newemployee,
                    employeeStatus: e.target.value,
                  })
                } />Tidak Kawin</div>
                
                <div>
                <label>Tanggunan</label>
                <p className="font-thin">(Maksimal 3 orang)</p>
                </div>
                <input
                type="number"
                id="dependents"
                name="employeeDependents"
                className={"form-control w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500"}
                value={newemployee?.employeeDependents}
                onChange={(e) =>
                  setNewemployee({
                    ...newemployee,
                    employeeDependents: e.target.value,
                  })
                }/>

                <label htmlFor="username">
                  Username
                </label>
                  <input
                    id="username"
                    name="employeeUsername"
                    type="username"
                    required
                    autoComplete="username"
                    className={"form-control w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" + ('username')}
                    placeholder="Masukkan Username"
                    onChange={(e) =>
                      setNewemployee({
                        ...newemployee,
                        employeeUsername: e.target.value,
                      })
                    }
                  />
                  <label htmlFor="password">
                    Password
                  </label>
                  <input
                    id="password"
                    name="employeePassword"
                    type="password"
                    required
                    autoComplete="current-password"
                    className={"form-control w-full px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500" + ('password')}
                    placeholder="Masukkan Password"
                    onChange={(e) =>
                      setNewemployee({
                        ...newemployee,
                        employeePassword: e.target.value,
                      })
                    }
                  />

              <button type="submit">Save</button>
              <button type="button" onClick={() => setNewemployee(null)}>
                Cancel
              </button>
          </form>
          
      </div>
    )}
    </div>
    );
}