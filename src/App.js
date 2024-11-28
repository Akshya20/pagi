import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [data, setdata] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const itemperpage = 10;

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const result = await response.json();
      setdata(result);
    };
    fetchData()
  }, [])

  let Indexoflastitem = currentpage * itemperpage;
  let Indexoffirstitem = Indexoflastitem - itemperpage;
  let currentitem = data.slice(Indexoffirstitem, Indexoflastitem);

  const totalpages = Math.ceil(data.length / itemperpage);

  const handlepagechange = (pagenumber) => {
    setcurrentpage(pagenumber);
  }

  return (
    <div>
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th> ID </th>
            <th> Name </th>
            <th> Email </th>
            <th> Role </th>
          </tr>
        </thead>
        <tbody>
          {
            currentitem.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))
          }
        </tbody>
      </table>

      <div>
        <button onClick={()=>handlepagechange(currentpage-1)}
           >
          Previous
        </button>
        <span>
          {currentpage}
        </span>
        <button onClick={()=>handlepagechange(currentpage+1)}
          >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
