import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actionTypes } from './reducer';
import Window from 'react-external-window';
import Form from './Form';


class App extends Component {
    onOpenBtnClick = () => {
        this.props.onOpenBtnClick();
    }

    render() {
        return (
            <div>
                <Form />
                <button onClick={this.onOpenBtnClick}>Open!</button>
                <div>{this.props.message}</div>
                {this.props.openWindow &&
                    <Window 
                        url=''
                        title='My Window'
                        name='child'
                        width={640}
                        height={480}
                        onClose={this.props.onCloseWindow}
                    >
                    {(window) => (
                        <React.Fragment>
                            <Form />
                            <button onClick={() => { window.close() }}>Close!</button>
                        </React.Fragment>
                    )}
                    </Window>
                }
            </div>
        );
    } 
}

const mapStateToProps = (state) => ({
    openWindow: state.openWindow,
    message: state.message,
});

const mapDispatchToProps = (dispatch) => ({
    onOpenBtnClick: () => dispatch({ type: actionTypes.OPEN_WINDOW }),
    onCloseWindow: (window) => dispatch({ type: actionTypes.CLOSE_WINDOW, payload: window }),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
