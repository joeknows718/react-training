var React = require('react'),
	ReactDom = require('react-dom'),
	PropTypes = require('prop-types'),
	App = require('./components/App');

require('./index.css');




ReactDom.render(
	<App />,
	document.getElementById('app')
)

