# ReactReduxSinglePageEs6
A simple Single Page App Listing beer application in React on ES6

# Set Up the project

This is the most difficult part of the project.
I will not talk about npm init of course.
We need to set up :
- Babel (see the conf file .babelrc)
- WebPack (see the conf file webpack.config.dev.js)
- Express (I have created a file on ./scripts/srcServer.js. That show you how to connect the webPack conf file with WebPack)

Now that the set up is finished
We need to add on our package.json the EntryPoint.
For that we will need to install babel-node that is inside [babel-cli](https://babeljs.io/docs/usage/cli/).
```bash
 npm install --save-dev babel-cli
```

On our package.json we will add 
```json
"scripts": { 
    "start": "babel-node scripts/srcServer.js"
}
```

if you have to "-parallel" a lot of script please install [concurrently](https://www.npmjs.com/package/concurrently).

Now that we have finished to set up the project lets start creating our first components

# Create First pages

## Create the first page index.html

So on src, I have created a index.html really simple, it will be our unique html page :D

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>List Of Beers</title>
</head>
<body>
<div id="app"></div>
<script src="/bundle.js"></script>
</body>
</html>
```

I said to you that it was a simple one.

Create also a index.js very simple (with a console.log inside) that should be transformed by webpack on bundle.js

```javascript
console.log('hi');
```

At this point if you do a 
```bash
npm start
```

You should be able to see on http://localhost:3000 an empty page, but with a console log 'hi' :D

## Create our First components

We will create 4 components : 
- The Home Page
- The About Page
- One Header to naviagte between these components
- And a Layout.

### AboutPage and HomePage

The AboutPage and the HomePage will be the same (at the begining of course just the anme of the page change)
I will create them in a folder ./src/components/about and ./src/components/home

```javascript
import React from 'react';

class AboutPage extends React.Component {
  render() {
    return (
      <div className="jumbotron">
        <h1>About</h1>
        <p>Some text about this application.</p>
      </div>
    );
  }
}

export default AboutPage;
```

Do the same for HomePage changing the name.

### Header

On the folder ./src/components/common I have created a file named Header.js

```javascript
import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';

const Header = () => {
  return (
    <nav>
      <IndexLink to="/" activeClassName="active">Home</IndexLink>
      {" | "}
      <Link to="/about" activeClassName="active">About</Link>
    </nav>
  );
};

export default Header;
```

I know that you saw react-router inside, but don't ask, it's in the next next chapter.

### Layout

On the folder ./src/components I have created the Layout.js

```javascript
import React, {PropTypes} from 'react';
import Header from './common/Header';

class Layout extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <Header/>
        {this.props.children}
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.object.isRequired
};

export default Layout;
```

You can see that I used my Header like an htlm element.
And all the others page must be a property.children of my Layout (this.props.children).
So on the next chapter I will connect the layout with the html page, and with the children components.

## Do it on a Single Page App

Now we will link all our components thanks to react-router, in a Single Page App.

create a file for our routing
For that : 
- we will create a file for our routing.
- we will modify our index.js (that for now only has a console.log useless)

### Routing

```javascript
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import HomePage from './components/home/HomePage';
import AboutPage from './components/about/AboutPage';

export default (
  <Route path="/" component={Layout}>
    <IndexRoute component={HomePage} />
    <Route path="about" component={AboutPage} />
  </Route>
);

```

So I have imported my components, and I create the routes.

### Connect our routing with the index.html page

In Order to render our components we need to connect them with the index.html page.
For that we will use our index.js that is the javascript file of the index.html.

```javascript
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import './styles/styles.css'; //Webpack can import CSS files too!
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

render(
  <Router history={browserHistory} routes={routes} />, 
  document.getElementById('app')
);
```

As you can see, we get our routes, and we replace the div id app, by our rendering.

That it. We can npm start our project to be able to see our components rendered.

# What is Redux

TODO :


- What is Redux
- talk about immutability
- create actions
- create reducers
- create store
- connect store
- How it works
