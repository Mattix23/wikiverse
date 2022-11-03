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
	
	const deleteArticle = async (slug) => {
		const response = await fetch(`${apiURL}/wiki/${slug}`, {
  		method: "DELETE"
		});
		await response.json();
	}
	
	return <>
		{articlePage ?
			<div>
			<h2 className='title'>Title : {articlePage.title}</h2>	
			<h3 className='author'>Author : {articlePage.author.name}</h3>
			<h4 className='published'>Published: {articlePage.createdAt}</h4>
			<h4 className='content'>Content: {articlePage.content}</h4>
			<h4 className='tags'>Tags: {articlePage.tags.map((tag) => {return  <div>{tag.name}<br/></div>})}</h4>		
			<button onClick={() => {deleteArticle(articlePage.slug)}}>Delete Article</button>
			<button onClick={() => {goBack()}}>Back to Wiki List</button>	
			</div>
			:
			pages.map((page, idx) => {
				return <Page page={page} key={idx} onClick={getPage}/>
			})
		}
	</>
} 
