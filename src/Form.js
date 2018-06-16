import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionTypes } from './reducer';

export class Form extends Component {
  onInputChange = e => {
    this.props.onInputChange(e.target.value);
  };

  onIncrementBtnClicked = e => {
    this.props.onIncrementBtnClicked();
  };

  render() {
    return (
      <div className="form">
        <input onChange={this.onInputChange} value={this.props.query} />
        <div>Count: {this.props.counts.join(', ')}</div>
        <button onClick={this.onIncrementBtnClicked}>Increment!</button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  counts: state.counts,
  query: state.query,
});

const mapDispatchToProps = dispatch => ({
  onInputChange: query =>
    dispatch({ type: actionTypes.INPUT_CHANGED, payload: query }),
  onIncrementBtnClicked: () => dispatch({ type: actionTypes.INCREMENT }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
