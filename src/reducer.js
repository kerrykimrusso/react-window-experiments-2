const initialState = {
    openWindow: false,
    message: 'Dare ya to click open...',
    counts: [0,0,0],
    query: '',
    lastPosition: [60, 90],
    lastSize: [640, 480],
}

export const actionTypes = Object.freeze({
    OPEN_WINDOW: 'OPEN_WINDOW',
    INCREMENT: 'INCREMENT',
    CLOSE_WINDOW: 'CLOSE_WINDOW',
    INPUT_CHANGED: 'INPUT_CHANGED',
});

const reactions = {
    [actionTypes.OPEN_WINDOW](state, action) {
        return Object.assign({}, {
            ...state,
            openWindow: true,
            message: 'You created a child! Parenthood is the greatest...',
        });
    },
    [actionTypes.INCREMENT](state, action) {
        const idx = Math.floor(Math.random() * state.counts.length)
        const nextCounts= state.counts.slice();
        nextCounts[idx] += 1;
        return Object.assign({}, {
            ...state,
            counts: nextCounts,
        });
    },
    [actionTypes.CLOSE_WINDOW](state, action) {
        const window = action.payload;
        return Object.assign({}, {
            ...state,
            openWindow: false,
            message: 'Child closed!',
            lastPosition: [window.screenX, window.screenY],
            lastSize: [window.innerWidth, window.innerHeight],
        });
    },
    [actionTypes.INPUT_CHANGED](state, action) {
        const query = action.payload;
        return Object.assign({}, {
            ...state,
            query,
        });
    },
}

const rootReducer = (state = initialState, action) => {
    return action.type in reactions
        ? reactions[action.type](state, action)
        : state;
};

export default rootReducer;
