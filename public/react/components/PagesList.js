import React, {useState,useEffect} from 'react';
import { Page } from './Page';
import apiURL from '../api';


export const PagesList = ({pages, setPages}) => {
	const [articlePage, setArticlePage] = useState('')
  
  
  
	async function getPage(slug){
		  try {
			  const response = await fetch(`${apiURL}/wiki/${slug}`);
			  const pageData = await response.json();
			  setArticlePage(pageData);
		console.log(pageData)
		  } catch (err) {
			  console.log("Oh no an error! ", err)
		  }
	  }

	const goBack = async() => {
		try {
			const res = await fetch(`${apiURL}/wiki/`);
			const allData = await res.json();
			setPages(allData);
			setArticlePage();
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}  
	return <>
		{articlePage ?
			<div>
			<h3>Author : {articlePage.title}</h3>
			<h3>Published: </h3>
			<h3>Content: {articlePage.content}</h3>	
			<button onClick={() => {goBack()}}>Back to Wiki List</button>		
			</div>
			:
			pages.map((page, idx) => {
				return <Page page={page} key={idx} onClick={getPage}/>
			})
		}
	</>
} 
