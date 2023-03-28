import './App.css';
import { UploadInput } from './components'
import { readFile } from './services/ReadFile'
import { getSalaries } from './services/apis/salary'
import React, { useState } from 'react'

const App =() => {
  const [salaries, setSalaries] = useState()
  const [error, setError ] = useState()

  const handleFileUpload = async (e) =>{

    
    if(e.target.files?.[0]?.type !== 'text/plain'){
      setError('The file must be .txt')
      setSalaries(null)
      console.log('here f')
      return
    }
    setError(null)
    const data = await readFile(e.target.files[0])

    if(!validateText(data)){
      setError('The text is not formatted well')
      setSalaries(null)
      console.log('here data',data)
      return
    }
    const result = await getSalaries(data)
    setSalaries(result)
    e.target.value = null
  }
  const validateText = (schedule) => {
    const regex = /^([A-Z]+)=((MO|TU|WE|TH|FR|SA|SU)[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2}(,(MO|TU|WE|TH|FR|SA|SU)[0-9]{2}:[0-9]{2}-[0-9]{2}:[0-9]{2})*)$/;
    for (const item of schedule) {
      if (!regex.test(item)) {
        return false;
      }
    }
    return true;
  }
  return (
    <div className="App">
      <header className="App-header"> 
        <p>Upload File</p>      
        <UploadInput  onChange={handleFileUpload}/>
        <p>{error}</p>
        <ul>
          {salaries &&
            salaries.map((salary, index) => (
              <li key={index}>
                <h3>{salary}</h3>
              </li>
            ))}
      </ul>
      </header>
    </div>
  );
}

export default App;
