import React, {useContext, createContext, useReducer} from 'react';

export const StateContext = createContext(null);

//@ts-ignore
export const StateProvider = ({reducer, initialState, children}) => (
    //@ts-ignore
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

export const useStateValue = () => useContext(StateContext);




