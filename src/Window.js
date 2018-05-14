import { PureComponent } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import { connect } from 'react-redux';
import { actionTypes } from './reducer';

export class Window extends PureComponent {
    static defaultProps = {
        menubar: '0',
        toolbar: '0',
        titlebar: '0',
        scrollbars: '1',
        status: '0',
    }

    window = null;
    
    getFeaturesString = () => Object.entries({
            top: this.props.y,
            left: this.props.x,
            width: this.props.width,
            height: this.props.height,
            menubar: this.props.menubar,
            toolbar: this.props.toolbar,
            titlebar: this.props.titlebar,
        }).map(([key, value]) => `${key}=${value}`).join();
    
    onBeforeUnload = () => {
        if(this.props.onClose) this.props.onClose(this.window);
    }

    componentDidMount() {
        const { url, name, title } = this.props;
        this.window = window.open(url, name, this.getFeaturesString());
        
        if(!this.window) {
            if(this.props.onBlocked) this.props.onBlocked();
        } else {   
            this.window.document.title = title;
            this.window.addEventListener('beforeunload', this.onBeforeUnload, { once: true });
            const root = document.createElement('div');
            this.window.document.body.appendChild(root);
            if(this.props.onLoad) this.props.onLoad(this.window);

            // NOTE: Reason to use unstable_renderSubtreeIntoContainer:
            // https://twitter.com/dan_abramov/status/774591045980024833?lang=en
            unstable_renderSubtreeIntoContainer(
                this, 
                this.props.children(this.window),
                root,
            );
        }
    }

    componentWillUnmount() {
        this.window = null;
    }

    render() {
        return null;
    }
}

const mapStateToProps = (state) => ({
    isOpen: state.openWindow,
    width: state.lastSize[0],
    height: state.lastSize[1],
    x: state.lastPosition[0],
    y: state.lastPosition[1],
});

const mapDispatchToProps = (dispatch) => ({
    onClose: (window) => dispatch({ type: actionTypes.CLOSE_WINDOW, payload: window }),
});

export default connect(mapStateToProps, mapDispatchToProps)(Window);