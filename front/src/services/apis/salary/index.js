export const getSalaries = async (schedule) => {
    const res = await fetch('http://localhost:3100/api/salary', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({data:schedule})
      })    
  
      const data = await res.json()
      return data.salaries
  }
  
  export default {
    getSalaries,
  }
  