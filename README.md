# ReactReduxSinglePageEs6
A simple Single Page App Listing beer application in React on ES6
This page is a documentation of the big point i follow to create my simple app, it's not a tutorial so don't expect to follow it and have the same result as I have on my github source. On the other side, you can use this documentation to understand the code above.

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

[Redux](http://redux.js.org/) is an implementation of the [Flux Architecture](https://facebook.github.io/flux/docs/overview.html) made by facebook for React.

This architecture was designed to render the page after an action, based on events (Dipsatch/listeners).

![Flux Architecture](https://github.com/Tkanos/ReactReduxSinglePageEs6/blob/master/img/FluxArchitecture.png).

So as you can see an Action (click on a button for example) call a dispatcher of events, that update the store, and the state being changed the component is rendered again with the new data.

Redux changed a little bit this architecture to use :

![Redux Flow](https://github.com/Tkanos/ReactReduxSinglePageEs6/blob/master/img/ReduxFlow.jpg)

So on this flow, the store dispatch the action (click on a button for example), to all reducers.
The reducer that know the action message respond by creating a new immutable state (very important), the state being changed, the react the component is rendered again with the new data.

## State Immutability

As seen previously the new state must be immuatble, what does it means.
It means that the new state MUST be a new object.

For example if my state is a point { x : 100, y: 100, z: 100 }, and an action change the x to x = 101.
I will not update my state object I will create a new one { x : 101, y: 100, z: 100 }, so to upadte my state i have to return a new object.

To help me on that, I will use the [Object.assign](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)(target, ... sources) function on es6 (it can be also used on es5), but if you prefer use [immutable.js](https://facebook.github.io/immutable-js) is your right..

On the case of my point it'll be with object.assign:
```javascript
Object.assign({}, myPreviousState, {x: 101});
```

So that code means : that i will mix an empty object {}, with myPreviousState and changing the x property.

Why the state must be immustable ?

The state is immutable and only changed by the reducers.
Thanks to this principle it's easy to know who changed the state (the reducers), and we have a gain of performance, because like this, Redux don't have to scroll through all properties of the state (on our case only 3  [x, y and z], but it can be worst), to know if one of them has changed. With immutability, a simple if(currentState !== newState) is enought.


## Create an action

As you are going to see an action is really simple : 

```javascript
export function createBeer(beer) {
    return {type : 'Beer:Create',  beer};
}
```

So here I send a new object with a string type, and my object.

## Create a Reducer

Create a reducer is as simple as an action.

```javascript
export default function beerReducer(state = [], action) {
    switch(action.type) {
        case 'Beer:Create':
            return [...state, Object.assign({}, action.beer)];
        default:
            return state;
    }
}
```

I know you are maybe surprise by the [Spread Operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator) ...state that allow me to use an array as arguments to a function, and i can also use to copy my array like arr.slice().

Well for our first reducer, we also have to create a RootReducer (that i will use for all others reducer i may have)

```javascript
import {combineReducers} from 'redux';
import beerReducer from './beerReducer'; // my reducer I create above

const rootReducer = combineReducers({
  beerReducer
});

export default rootReducer;
```

## Create our Store

The store is the magic that will connect actions on reducer.
```javascript
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/rootReducer';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState
  );
}
```

Don't worry you should'nt have to touch to it again.

## Connect the Store with my component.

Here are the most tricky part, but don't worry, it's simple.
On my Component, I have to import 

```javascript
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
```

I also have to create 2 functions mapStateToProps that map a state with the props, thanks to that our state.beers will become for our render this.props.beers. 

```javascript
function mapStateToProps(state, ownProps) {
  return {
    beers: state.beerReducer //from rootReducer
  };
}
```

And mapDispatchToProps, that will dispatch the actions.
```javascript 
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(beerActions, dispatch)
  };
}
```

Thanks to that on my event function I can do :
```javascript 
onClickSave() {
    this.props.actions.createBeer(this.state.beer); //actions come from mapDispatchToProps
  }
```
and to finish instead of do : 

```javascript
export default HomePage;
```

T will connect my HomePage and my functions to the store.
```javascript
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
```

## How it works

When I click on my Save button, it will dispatch the action throught the store to all reducers, my beerReducer will also have the message so it will Treat it creating a new beers state (immutable).
The state being changed, the component will call render() function that will update the list of beers on the props (the function mapStateToProps have taken the new state and have put it on the props of the component).


# Remains
- Add a Fake Api to simulate a Rest Api
- Separate the HomePage render on various little beer components
- Add a button to rate the beer
- Add a button to update the beer name (on a new page)
- Test React
- Test Redux
- Deploy on production
