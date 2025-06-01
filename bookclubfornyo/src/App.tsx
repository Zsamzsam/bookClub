import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css'


interface member {
  id: number;
  name: string;
  gender: string;
  birth_date: string;
  created_at: number;
}

interface memberDto {
  name?: string;
  gender?: string;
  birth_date?: Date;
}


function App() {

  const [members, setMembers] = useState<member[]>([]);
  const [newMember, setNewMember] = useState<memberDto>({
    name: undefined,
    birth_date: undefined,
  })

  const [error, setError] = useState<string[] | null>(null);
  const [response, setResponse] = useState<string[] | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const response = await fetch("http://localhost:3000/api/members", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newMember)
    })

    if (!response.ok) {
      const errorData = await response.json();
      setError(errorData.message);
      return
    }

    setNewMember({
      name: undefined,
      birth_date: undefined,
      gender: undefined,
    })

    fetchData();
  }

  const handlePay = async (id: number) => {
    const response = await fetch(`http//:localhost:3000/api/members/${id}/pay`, {
      method: "POST"
    })
    if(!response.ok){
      const erroData = await response.json();
      setResponse(erroData.message);
      return
    }
    setResponse(["Siker"])
  
  } 

  const fetchData = async () => {
    const response = await fetch("http://localhost:3000/api/members")
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
      return
    };

    const data = await response.json();
    setMembers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewMember(prev => ({
      ...prev,
      [name]: name === "birth_date" ? new Date(value): value,
    }))
  }


  return (
    <>
      <div className="container text-start">
        {response && (response[0] === "Siker" ? <p className='alert alert-success'>{response}</p> : <p className='alert alert-danger'>{response}</p>)}
        <div className="row">
          {members.map((member) => (
            <div className="card col-lg-4 col-md-6 col-sm-12" key={member.id} >
              <div className="card-body">
                <h5 className="card-title">{member.name}</h5>
                <p className="card-text">{member.birth_date} <br />
                  {member.created_at}</p>
                <img src={member.gender ? `${member.gender}.png` : "other.png"} className="card-img-top" alt="..."></img>
                <button onClick={() =>{
                  handlePay(member.id)
                }}>Tagdíj befizetés</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className='card'>
        {error &&
          error.map((e) => (
            <p className='alert alert-danger'>{e}</p>
          ))}
        <form onSubmit={handleSubmit} id='form'>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name: </label>
            <input type="text" className="form-control" id="name" name='name' value={newMember.name} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="birth_date" className="form-label">Birt date: </label>
            <input type="date" className="form-control" name='birth_date' id="birth_date"
              value={newMember.birth_date ? newMember.birth_date.toISOString().split("T")[0] : ""} onChange={handleChange} />
          </div>
          <div className="mb-3 form-check">
            <input type="radio" name='gender' className="form-check-input" id="radioCheck" value="M" onChange={handleChange} />
            <label className="form-check-label" htmlFor="exampleCheck1">Male</label>
          </div>
          <div className="mb-3 form-check">
            <input type="radio" name='gender' className="form-check-input" id="radioCheck" value="F" onChange={handleChange} />
            <label className="form-check-label" htmlFor="exampleCheck1">Female</label>
          </div>
          <button type="submit" className="btn btn-primary">Tagfelvétel</button>
        </form>
      </div>
    </>
  )
}

export default App
