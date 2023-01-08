import React, { useState, useEffect, useRef} from 'react'

const Main = () => {

  const [val, setVal] = useState("");
  const [result, setResult] = useState([]);
  const [arr, setArr] = useState([]);
  const Inputvalue = useRef(null)
  const [style, setStyle] = useState();
  const [isLondon, setIsLondon] = useState(false);
  const [isYork, setIsYork] = useState(false);
  const [isLos, setIsLos] = useState(false);
  const [isLas, setIsLas] = useState(false);
  const [word, setWord] = useState("");

  useEffect(() => {
    (async _ => {
      const response = await fetch(`https://python3-dot-parul-arena-2.appspot.com/test?cityname=${val}`);
      const data = await response.json();
      data.name=val;
      setResult(data);
      if(val === 'London')setIsLondon(!isLondon);
      else if(val === 'New York')setIsYork(!isYork);
      else if(val === 'Los Angeles')setIsLos(!isLos);
      else if(val === 'Las Vegas')setIsLas(!isLas);
    })()
    // eslint-disable-next-line
  }, [val])


  useEffect(()=>{
    if(result.length !== 0 && result?.status!=='failed')
    setArr([...arr, result]);
    // eslint-disable-next-line
  }, [result]);



  const handleDel = (id) =>{
    console.log(id, "%%");
    const del = arr.filter((e, idx)=> idx !== id);
    return del  
  
  } 
  
  useEffect(() => {
    arr.forEach(element => {
        if(word===element.name){
            setTimeout(function () {
                setStyle({ backgroundColor:'transparent' });
              }, 3000);
        }
    });
    setStyle({ backgroundColor:'#FFFF00'})
    // eslint-disable-next-line
},[word])

  const onKeyDownHandler = (e) =>{
    if(e.keyCode === 13){
        e.preventDefault();
        const typeVal = Inputvalue.current.value; 
        setWord(typeVal)
    }
}

const onSubmit = (e) =>{
  e.preventDefault();
  const typeVal = Inputvalue.current.value; 
  setWord(typeVal)
}

const inHour = (date) =>{
  const old = new Date(date);
  var cur = new Date();
  var diff = old-cur;
  return(Math.floor(diff/2.5e+9))
}

  return (
    <div className='Main_container'>
      <aside className='Main_container_left'>
        <button>Get Weather</button>
        <table className='Main_container_left_table'>
          <tfoot>
            <tr>
              <td value={""} disabled>City</td>
              <td value="London" onClick={((e) => { setVal("London") })}>London</td>
              <td value="New York" onClick={((e) => { setVal("New York") })}>New York</td>
              <td value="Los Angeles" onClick={((e) => { setVal("Los Angeles") })}>Los Angeles</td>
              <td value="Las Angeles" onClick={((e) => { setVal("Las Vegas") })}>Las Vegas</td>
            </tr>
          </tfoot>
        </table>
      </aside>
      <div className='vertex_line'></div>
      <aside className='Main_container_right'>
        <section>
          <input ref={Inputvalue} type={"text"}  placeholder="City Name"
          onKeyDown={onKeyDownHandler}
            required
          />
          <button onClick={onSubmit}>Search</button>
        </section>
        <table className='Main_container_right_table'>
          <thead>
            <tr>
              <td>City</td>
              <td>Description</td>
              <td>Temperature (°C)</td>
              <td>Pressure (hPa)</td>
              <td>Date age (hrs)</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
          {arr.length === 0 ? (
            <h1 className='nodata'> NO DATA</h1>
          ) : (    
            arr.map((data, idx) => {
              return(
                <tr key={idx} style={word===data.name?(style):({backgroundColor:"transparent"})}>
                  <td>{data.name}</td>
                  <td>{data.description}</td>
                  <td>{data.temp_in_celsius}</td>
                  <td>{data.pressure_in_hPa}</td>
                  <td>{inHour(data.date_and_time)}</td>
                  <td><span onClick={handleDel(idx)}>Delete</span></td>
                </tr>
              )
            })
          )}
          </tbody>
        </table>
      </aside>
    </div>
  )
}
export default Main;