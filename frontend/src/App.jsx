
import { useState } from 'react'
import './App.css'
import axios from "axios";
import { BASE_URL } from './Helper/Helper';


function App() {
  // hook variable
  const [city, setCity] = useState('');
  const [business, setBusiness] = useState('');
  
  let handleChange = (e)=>{
    
    const { name, value } = e.target;

    if (name === 'city') {
      setCity(value);
    } else if (name === 'business') {
      setBusiness(value);
    }
  
  }

  let getBusiness = () => {
    console.log(city);
    console.log(business);
    window.location.href=`/${city}/search?q=${business}`
  }

  // let call the API
  try {
      axios.get(`${BASE_URL}/api/cities?populate=*&filters[businesses][business_name][$containsi]=${business}&filters[name][$containsi]=${city}`)
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });
    } catch (error) {
      console.log(error)
    }
    

  return (
    <>
        <div className="container mt-5 ">
      <div className="d-flex gap-3 justify-content-center ">
        <input
          type="text"
          placeholder="Select location"
          className="form-control"
          style={{ width: '200px', marginRight: '10px' }} 
            onChange={handleChange}
            name='city'
        />
        <input
          type="text"
          placeholder="Search for anything"
          className="form-control"
          style={{ width: '200px' }} 
            onChange={handleChange}
            name='business'
        />
        </div>       
       <div className="text-center">
        <button type="button" onClick={getBusiness} className="btn btn-danger">Danger</button>
      </div>

    </div>
  

    </>
  )
}

export default App
