import './App.css';
import { useState } from 'react'

function App() {
  const [patients, setPatients] = useState('')
  const [age, setAge] = useState('')
  const [urea, setUrea] = useState('')
  const [creatinineRatio, setCreatinineRatio] = useState('')
  const [hemoglobinLevel, setHemoglobinLevel] = useState('')
  const [cholesterol, setCholesterol] = useState('')
  const [triglycerides, setTriglycerides] = useState('')
  const [hdlCholesterol, setHdlCholesterol] = useState('')
  const [lowDensityLipoprotein, setLowDensityLipoprotein] = useState('')
  const [veryLowDensityLipoprotein, setVeryLowDensityLipoprotein] = useState('')
  const [bmi, setBmi] = useState('')
  const [error, setError] = useState('')
  const [result, setResult] = useState('')
  
  const handleSubmit = async (e)=> {
    e.preventDefault()
    const data = {
      No_Pation: parseFloat(patients),
      AGE: parseFloat(age),
      Urea: parseFloat(urea),
      Creatinine_ratio: parseFloat(creatinineRatio),
      HbA1c: parseFloat(hemoglobinLevel),
      Cholesterol: parseFloat(cholesterol),
      Triglycerides: parseFloat(triglycerides),
      HDL_Cholesterol: parseFloat(hdlCholesterol),
      Low_density_lipoprotein: parseFloat(lowDensityLipoprotein),
      VLDL: parseFloat(veryLowDensityLipoprotein),
      BMI: parseFloat(bmi)
    }
    
    try {
      const run_diagnosis = await fetch("http://localhost:8000/predict", {
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify(data)
      })
      const response = await run_diagnosis.json()
      console.log("RESPONSE===>",response)
      setResult(response.message)
      if (response.error){
        setError(response.error)
      }else{
        setPatients('')
        setAge('')
        setUrea('')
        setCreatinineRatio('')
        setHemoglobinLevel('')
        setCholesterol('')
        setTriglycerides('')
        setHdlCholesterol('')
        setLowDensityLipoprotein('')
        setVeryLowDensityLipoprotein('')
        setBmi('')
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return (
    <div className='app'>
      <img src={require('./image/download-3.jpeg')} alt="" className='img'/>
      <div className='wrapper'>
      <img src={require('./image/red1.png')} alt="" className='redcross'/>
        <h4 className='header'>Complete the following enteries to confirm your diabetes status:</h4>
        <form action="" className='form-doc'>
          <input className='form-input' type="text" onChange={e=>setPatients(e.target.value)} value={patients} placeholder='Enter number of patients'/>
          <input className='form-input' type="text" onChange={e=>setAge(e.target.value)} value={age} placeholder='Enter age'/>
          <input className='form-input' type="text" onChange={e=>setUrea(e.target.value)} value={urea} placeholder='Enter urea level'/>
          <input className='form-input' type="text" onChange={e=>setCreatinineRatio(e.target.value)} value={creatinineRatio} placeholder='Enter creatinine ratio'/>
          <input className='form-input' type="text" onChange={e=>setHemoglobinLevel(e.target.value)} value={hemoglobinLevel} placeholder='Enter glycated hemoglobin level'/>
          <input className='form-input' type="text" onChange={e=>setCholesterol(e.target.value)} value={cholesterol} placeholder='Enter Cholesterol level'/>
          <input className='form-input' type="text" onChange={e=>setTriglycerides(e.target.value)} value={triglycerides} placeholder='Enter fat lipid type(Triglycerides)'/>
          <input className='form-input' type="text" onChange={e=>setHdlCholesterol(e.target.value)} value={hdlCholesterol} placeholder='Enter high density lipoprotein level'/>
          <input className='form-input' type="text" onChange={e=>setLowDensityLipoprotein(e.target.value)} value={lowDensityLipoprotein} placeholder='Enter low density lipoprotein level'/>
          <input className='form-input' type="text" onChange={e=>setVeryLowDensityLipoprotein(e.target.value)} value={veryLowDensityLipoprotein} placeholder='Enter very low density lipoprotein level'/>
          <input className='form-input' type="text" onChange={e=>setBmi(e.target.value)} value={bmi} placeholder='Enter body mass iindex'/>
          <div className='submit' onClick={e=>handleSubmit(e)}>
            <p>run diagnosis</p>
          </div>
        </form>
        <div className="diagnosis_wrapper">
          <p className="diagnosis">{result}</p>
          <p className="diagnosis">This patient is not diabetic</p>
        </div>
      </div>
    </div>
  );
}

export default App;