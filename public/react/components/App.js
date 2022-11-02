import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [isAddingArticle, setIsAddingArticle] = useState(false)

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}

	useEffect(() => {
		fetchPages();
	}, []);

	return (
		<main>	
      <h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
			{
				isAddingArticle ? 
				<div>
					<form>
						<h4>Add an Article</h4>
						<input type='text'
						placeholder='Title'
						aria-label='title'/>
						<input type='text'
						placeholder='Article Content'
						aria-label='article content'/>
						<input type='text'
						placeholder='Author Name'
						aria-label='author name'/>
						<input type='text'
						placeholder='Author Email'
						aria-label='author email'/>
						<input type='text'
						placeholder='Tags'
						aria-label='tags'/>
					</form>
					
				</div>
				: 
				<PagesList pages={pages} setPages={setPages} />
			}
			<button onClick={() => setIsAddingArticle(!isAddingArticle)}> Create Page</button>

			
		</main>
	)
}