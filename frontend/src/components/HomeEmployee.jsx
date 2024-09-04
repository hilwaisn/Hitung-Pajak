import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export default function HomeEmployee() {
    const [taxData, setTaxData] = useState(null)
    const token = JSON.parse(Cookies.get("token"))
    const navigate = useNavigate()

    function fetchData() {
        fetch("http://localhost:8000/api/TaxData/"+jwtDecode(token).user).then(res=>res.json())
        .then((res)=>{
            setTaxData(res)
            console.log(res)
        })
    }

    useEffect(()=>{
        fetchData()
        console.log(jwtDecode(token))
    },[])

    if (jwtDecode(token).role !== "employee") navigate("/")
    else
    return <>
    <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-200">
        <thead>
            <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Name</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">NIK</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Salary</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Allowance</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Position Tax</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">JKK Tax</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">JKM Tax</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">JPK Tax</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">JHT Tax</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">MNI Tax</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">ANI Tax</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">PTKP</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">PKP</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">Tax Owed</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">PPh21 (Year)</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700 border-b">PPh21 (Month)</th>
            </tr>
        </thead>
        <tbody>{taxData && (
            <tr>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData?.employeeName}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.employeeNik}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.employeeSalary}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.employeeAllowance}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.taxPositiom}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.taxJkk}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.taxJkm}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.taxJpk}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.taxJht}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.taxMni}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.taxANi}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.taxPtkp}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.taxPkp}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.taxOwed}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.taxPph21Year}</td>
                <td className="px-4 py-2 text-sm text-gray-700 border-b">{taxData.taxPph21Month}</td>
            </tr>)}
        </tbody>
    </table>
</div>

    </>
}