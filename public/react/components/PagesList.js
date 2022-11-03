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
			<h3>Title : {articlePage.title}</h3>	
			<h3>Author : {articlePage.author.name}</h3>
			<h3>Published: {articlePage.createdAt}</h3>
			<h3>Content: {articlePage.content}</h3>
			<h3>Tags: {articlePage.tags.map((tag) => {return tag.name})}</h3>		
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
