import {createContext, useContext} from React

export const Todocontext =createContext({
    todos:{
        id: 1,
        todo: "todo msg",
        completed: false,
    }
})


export const useTodo=()=>{
    return useContext(Todocontext)
}

export const Todoprovider=Todocontext.Provider