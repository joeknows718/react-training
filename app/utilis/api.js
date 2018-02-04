var axios = require('axios');
//var id = "YOUR_CLIENT ID";
//var secret = "CLIENT_SECRET";
//var params = "?client_id=" + id + "&client_secret=" + secret;

function getProfile(username){
	
	return axios.get('https://api.github.com/users/' + username ) // + params
			.then(function(user){
				return user.data;
			})
}

function getRepos(username){
	return axios.get('https://api.github.com/users/' + username + '/repos?per_page=100' )
}

function getStarCount(repos){
	return repos.data.reduce(function(count, repo){
		return count + repo.stargazers_count;
	},0)
}

function calculateScore(profile, repos){
	var followers = profile.followers;
	var totalStars = getStarCount(repos);

	return (followers*3)+ totalStars;
}

function handleError(error){
	console.log(error);
	return null;
}

function getUserData(player){
	return axios.all([  //this runs multiple promises at once in an array
			getProfile(player),
			getRepos(player)
		]).then(function(data){
			var profile = data[0];
			var repos = data[1];
			debugger
			return {
				profile: profile,
				score: calculateScore(profile, repos)
			};
		})
}

function sortPlayers (players){
	console.log(players)
	return players.sort(function(a,b){
		return b.score - a.score
	})
}

module.exports = {
	battle: function(players){
		
		return axios.all(players.map(getUserData))
			.then(sortPlayers)
			.catch(handleError)
	},

	fetchPopularRepos: function(lang){
		var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + lang + '&sort=stars&orderdesc&type=Repositories');

		return axios.get(encodedURI)
			.then(function(response){
				return response.data.items;
			});
	}
}

