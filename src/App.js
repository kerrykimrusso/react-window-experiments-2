import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionTypes } from './reducer';
import Window from './components/Window';
import Form from './Form';
import './index.css';

class App extends Component {
  onOpenBtnClick = () => {
    this.props.onOpenBtnClick();
  };

  render() {
    return (
      <div>
        <Form />
        <button onClick={this.onOpenBtnClick}>Open!</button>
        <div>{this.props.message}</div>
        {this.props.openWindow && (
          <Window
            url=""
            title="My Window"
            name="child"
            width={640}
            height={480}
            onClose={this.props.onCloseWindow}
            resources={[
              [document.querySelectorAll('style'), 'append', 'head'],
              [document.querySelector('svg'), 'prepend', 'body'],
              'https://kerryrusso.com/blog/wp-content/themes/grateful/css/reset.css?ver=4.9.6',
              'https://kerryrusso.com/blog/wp-content/themes/grateful/style.css?ver=4.9.6',
              'https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css',
              [
                'https://kerryrusso.com/blog/wp-content/themes/grateful/style',
                'css',
              ],
              ['https://unpkg.com/jquery', 'js'],
            ]}
          >
            {window => (
              <React.Fragment>
                <Form />
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    window.close();
                  }}
                >
                  Close!
                </button>
              </React.Fragment>
            )}
          </Window>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  openWindow: state.openWindow,
  message: state.message,
});

const mapDispatchToProps = dispatch => ({
  onOpenBtnClick: () => dispatch({ type: actionTypes.OPEN_WINDOW }),
  onCloseWindow: window =>
    dispatch({ type: actionTypes.CLOSE_WINDOW, payload: window }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
