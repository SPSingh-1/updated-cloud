// import React, { useContext,useEffect} from 'react';
// import noteContext from '../context/notes/noteContext';
// const About = () => {
//     const a = useContext(noteContext)
//     useEffect(() => {
//       a.update();
//       // eslint-disable-next-line
//     }, []);
//     return (
//       <div>
//         This is About {a.state.name} and he is in class{a.state.class}
//       </div>
//     );
//   }
// //diffrent file NoteState
// import { useState } from 'react';
// import NoteContext from './noteContext';

// const NoteState = (props)=>{
//     const s1 = {
//         "name": "Shashi",
//         "class": "5b"
//     }
//     const [state, setstate] = useState(s1);
//     const update = ()=>{
//         setTimeout(() => {
//             setstate({
//                 "name":"Pratap",
//                 "class":"10b"
//             })
//         }, 1000);
//     }
//     return (
//         <NoteContext.Provider value={{state,update}}>
//             {props.children}
//         </NoteContext.Provider>
//     )
// }

// export default NoteState;

// //notecontext
// import { createContext } from "react";

// const noteContext = createContext();

// export default noteContext;