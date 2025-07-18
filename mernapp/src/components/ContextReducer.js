// import React, { createContext, useContext, useReducer } from 'react'
// const CartStateContext = createContext();
// const CartDispatchContext = createContext();
// const reducer = (state,action)=>{
//     switch(action.type){
//         case"ADD":
//         return[...state,{id:action.id,name:action.name, qty:action.qty,
//                size:action.size, price:action.price,img:action.img}]

//         case "REMOVE":
//             let newArr=[...state]
//             newArr.splice(action.index,1)
//             return newArr;
            
//            case "DROP":
//             let empArray = []
//             return empArray
//         case "UPDATE":
//             let arr = [...state]
//             arr.find((food, index) => {
//                 if (food.id === action.id) {
//                     console.log(food.qty, parseInt(action.qty), action.price + food.price)
//                     arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
//                 }
//                 return arr
//             })
//             return arr


//         default:
//             console.log("Error in Reducer");
//             return state;
//     }

// }
// export const CartProvider = ({children})=>{
//     const[state,dispatch] =useReducer(reducer,[])
//     return (
//         <CartDispatchContext.Provider value = {dispatch}>
//             <CartStateContext.Provider value ={state}>
//                 {children}
//             </CartStateContext.Provider>
//         </CartDispatchContext.Provider>
//     )

// }
// export const useCart= ()=>useContext(CartStateContext);
// export const useDispatchCart =()=> useContext(CartDispatchContext);

















import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [
                ...state,
                {
                    id: action.id,
                    name: action.name,
                    qty: action.qty,
                    size: action.Size,
                    price: action.price,
                    img: action.img
                }
            ];

        case "REMOVE":
            let newArr = [...state];
            newArr.splice(action.index, 1);
            return newArr;

        case "DROP":
            let empArray =[]
            return empArray;

        case "UPDATE":
            let arr = [...state];
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id === action.id && arr[i].size === action.Size) {
                    arr[i] = {
                        ...arr[i],
                        qty: parseInt(action.qty) + arr[i].qty,
                        price: parseInt(action.price) + arr[i].price
                    };
                    break;
                }
            }
            return arr;

        default:
            console.log("Error in Reducer");
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    );
};

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext);
