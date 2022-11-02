import React, { useState } from 'react';



export const Page = (props) => {
  


  return <>
    <h3 onClick={() => props.onClick(props.page.slug)}>{props.page.title}</h3>
    
  </>
} 
	