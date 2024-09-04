import { Link } from "react-router-dom";
import Cookies from "js-cookie"

export default function header() {
  const token = Cookies.get("token")
  function logout() {
    Cookies.remove("token")
  }
    return (
      <>
        <header className="bg-green-900 text-white py-4">
          <div className="container mx-10 flex justify-between items-center">
            <div className="flex items-center">
              <img src="./Tax Logo.png" className="rounded-full w-20"/>
              <h1 className="text-4xl font-bold mx-5">Hitung Pajak</h1>
              </div>
              <nav className="flex gap-8">
              <Link href="/" className="hover:text-gray-200 text-3xl font-bold">Home</Link>
              <Link to="/about" className="hover:text-gray-200 text-3xl font-bold">About</Link>
              {token && <button onClick={logout} className="hover:text-gray-200 text-3xl font-bold" >Logout</button>  }
            </nav>
          </div>
        </header>
        </>
    )
}