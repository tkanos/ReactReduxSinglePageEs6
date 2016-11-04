import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as beerActions from '../../actions/beerActions';

class HomePage extends React.Component {
  constructor(props, context) {
      super(props, context);
      
      this.state = {
        beer : {
          name : ""
        }
      };

      this.OnNameChanged = this.OnNameChanged.bind(this);
      this.onClickSave = this.onClickSave.bind(this);
  }

  OnNameChanged(event) {
    const beer = this.state.beer;
    beer.name = event.target.value;
    this.setState({beer: beer});
  }

  onClickSave() {
    this.props.actions.createBeer(this.state.beer); //actions come from mapDispatchToProps
  }

  beerRow(beer, index) {
    return <div key={index}>{beer.name}</div>;
  }

  render() {
    return (
      <div className="jumbotron">
        <h1>Beers List</h1>

        {this.props.beers.map(this.beerRow)}

        <h2>Add New Beer</h2>
        <input type="text" onChange={this.OnNameChanged} value={this.state.beer.name} />
        <input type="submit" onClick={this.onClickSave} value="Save" />

      </div>
    );
  }
}

HomePage.propTypes = {
  beers: PropTypes.array.isRequired,
  actions: PropTypes.func.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    beers: state.beerReducer //from rootReducer
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(beerActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
