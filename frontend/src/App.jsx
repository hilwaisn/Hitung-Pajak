import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Admin from './components/Admin';
// import Employee from './components/Employee';
// import EmployeeData from './components/EmployeeData';
// import TaxData from './components/TaxData';

function App() {
  return (
    <Router>
    <div>
      <Admin />
      {/* <Employee />
      <EmployeeData />
      <TaxData /> */}
    </div>
    </Router>
  );
};

export default App;