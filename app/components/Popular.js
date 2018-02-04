import React from 'react';
import PropTypes from 'prop-types';
import api =  from'../utilis/api';
import Loading from './Loading';

//display prop is stateless functional component - no state, just props - renders and returns ui

function SelectLanguage(props){
	var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']
	return (
		<ul className="languages">
			{languages.map(function(lang){

				return (
					<li key={lang}
						style={lang === props.selectedLanguage ? {color: '#d0021b'}:null }
						onClick={props.onSelect.bind(null, lang)}> 
						{lang} 
					</li>
					)
			})} 
		</ul>
		)
}




// class SelectLanguage extends React.Component{

// 	render(){
// 		var languages = ['All', 'Javascript', 'Ruby', 'Java', 'CSS', 'Python']

// 		return(
// 			<ul className="languages">
// 				{languages.map(function(lang){

// 					return (
// 						<li key={lang}
// 							style={lang === this.props.selectedLanguage ? {color: '#d0021b'}:null }
// 							onClick={this.props.onSelect.bind(null, lang)}> 
// 							{lang} 
// 						</li>
// 						)
// 				}, this)} 
// 			</ul>
// 		)

// 	}
// }


function ReposGrid(props){
	return (
		<ul className="popular-list">
			{props.repos.map(function(repo, index){
				return (
					<li className="popular-item" key={repo.name}>
						<div className="popular-rank">
							#{index + 1}
							<ul className='space-list-items'>
								<li>
									<img className="avatar" 
										src={repo.owner.avatar_url} 
										alt={"Avatar for " +repo.owner.login} />
								</li>
								<li>
									<a href={repo.html_url}>{repo.name}</a>
								</li>
								<li>
									@{repo.owner.login}
								</li>
								<li>
									{repo.stargazers_count} stars
								</li>
							</ul>
						</div>
					</li>
				)
			})}
		</ul>
		)
}

SelectLanguage.PropTypes = {
	selectedLanguage : PropTypes.string.isRequired,
	onSelect : PropTypes.func.isRequired
}

ReposGrid.PropTypes = {
	repos : PropTypes.array.isRequired,
}


class Popular extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			selectedLanguage: 'All',
			repos: null,
		};

		this.updateLanguage = this.updateLanguage.bind(this);
		//this binds the update fn to the this keyword associated with the 
		//component, so that it always works and can not be used
		//outside of context
	}

	componentDidMount(){
		//AJAX HERE
		this.updateLanguage(this.state.selectedLanguage);
	}

	updateLanguage(lang){
		this.setState(function(){

			return {
				selectedLanguage: lang,
				repos:null
			}
		});

		//AJAX HERE
		api.fetchPopularRepos(lang)
			.then(function(repos){
				this.setState(function(){
					return {
						repos: repos,
					}
				})
			}.bind(this));
	}

	render(){

		return(
				<div>
					<SelectLanguage 
					selectedLanguage={this.state.selectedLanguage}
					onSelect={this.updateLanguage} />
					{!this.state.repos
					? <Loading text="Downloading"/>
					: <ReposGrid repos={this.state.repos} />}
				</div>
			)
	}
}
export default Popular;