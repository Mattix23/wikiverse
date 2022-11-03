import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';

// import and prepend the api url to any fetch calls
import apiURL from '../api';
import { Page } from './Page';

export const App = () => {

	const [pages, setPages] = useState([]);
	const [isAddingArticle, setIsAddingArticle] = useState(false)
	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [tags, setTags] = useState('')

	async function fetchPages(){
		try {
			const response = await fetch(`${apiURL}/wiki`);
			const pagesData = await response.json();
			setPages(pagesData);
		} catch (err) {
			console.log("Oh no an error! ", err)
		}
	}
	
	
	
	const handleSubmit = async (e) => {
		console.log(e)
		const response = await fetch(`${apiURL}/wiki`, {
  		method: "POST",
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(
			{title: title, content: content, name: name, email: email, tags: tags} 
  		)
	});
	const data = await response.json();
		}

	useEffect(() => {
		fetchPages();
	}, []);

	return (
		<main>	
			<div className="jumbotron jumbotron-fluid">
  			<div className="container">
    		<img src='https://thumbs.dreamstime.com/b/project-complex-like-puzzle-pictured-as-word-project-puzzle-pieces-to-show-project-can-be-difficult-needs-164219955.jpg' alt='Project text image'/>
			<h2 className="display-4">WikiVerse Project</h2>
    		<p className="lead">Welcome to my WikiVerse project, below you will find a list of articles and other button functionalities.</p>
  			</div>
			</div>
			<div className='homePage'>

				
			<h1>WikiVerse</h1>
			<h2>An interesting 📚</h2>
			{
				isAddingArticle ? 
				<div>
					<form onSubmit={handleSubmit}>
						<h4>Add an Article</h4>
						<input type='text'
						placeholder='Title'
						aria-label='title'
						onChange = {(e) => setTitle(e.target.value)}
						value={title}/>
						<input type='text'
						placeholder='Article Content'
						aria-label='article content'
						onChange = {(e) => setContent(e.target.value)}
						value={content}/>
						<input type='text'
						placeholder='Author Name'
						aria-label='author name'
						onChange = {(e) => setName(e.target.value)}
						value={name}/>
						<input type='text'
						placeholder='Author Email'
						aria-label='author email'
						onChange = {(e) => setEmail(e.target.value)}
						value={email}/>
						<input type='text'
						placeholder='Tags'
						aria-label='tags'
						onChange = {(e) => setTags(e.target.value)}
						value={tags}/>
						<button type='submit'>Submit Article</button>
						<button onClick={() => {goBack()}}>Back to Wiki List</button>
					</form>
					
				</div>
				: 
				<PagesList pages={pages} setPages={setPages} />
			}
			
			<button onClick={() => setIsAddingArticle(!isAddingArticle)}> Create Article</button>
			</div>


			
		</main>
	)
}