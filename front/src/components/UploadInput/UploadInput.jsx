import React from 'react'

const UploadInput = ({onChange}) => (
  <div >
    <input role='uploadInput' type="file" onChange={onChange} ></input>
  </div>  
)

export default UploadInput
