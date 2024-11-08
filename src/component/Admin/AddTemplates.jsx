import React, { useState } from 'react'

const AddTemplates = () => {

  const handleSubmit=(event)=>{
    event.preventDefault()
   const data = new FormData(event.currentTarget);

    const userData = {
      templateName: data.get("templateName"),
      htmlContent: data.get("htmlContent"),
    };

     console.log("userdata", userData);


  }
  console.log("template data",template)
  return (
    <div>
    <div>AddTemplates</div>
    <form onSubmit={handleSubmit}>
      <input type="text" name='templateName' />
      <input type="text" name='htmlContent'/>
      <button type='submit'>Submit</button>

    </form>
    </div>
  )
}

export default AddTemplates