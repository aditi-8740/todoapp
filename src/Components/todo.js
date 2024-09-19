import React, { useState, useEffect } from 'react'
import './style.css'

// get the local Storage data back
const getLocalData = ()=>{
    const lists = localStorage.getItem("mytodolist") 

    if (lists) {    //we getting string data, but we want array..
        return JSON.parse(lists)
    }else{return []}
}

const ToDo = () => {
    const [inputData, setInputData] = useState("") //useState hook
    const [items , setItems] = useState(getLocalData())
    const [toEditItem , setToEditItem] = useState("")
    const [tooggleButton, settoggleButton] = useState(false)

    // add items function
    const addToDoItem = () =>{
        if (!inputData) {
            alert("please fill the data")
        }
        else if(tooggleButton){
            setItems(
                items.map((currElem)=>{
                    if (currElem.id === toEditItem) {
                        return {...currElem , name: inputData}
                    }else{
                        return currElem
                    }
                })
            )
            setInputData("")
            setToEditItem("")
            settoggleButton(false)

        }
        else{
            const myNewInputData ={
                id : new Date().getTime().toString(),
                name: inputData
            }
            setItems([...items, myNewInputData])
            setInputData("")
            
        }
    }

    // delete items function
    const deleteItem = (id)=>{
        const updatedItem = items.filter((currElement)=>{
            return  currElement.id !== id 
        })
        setItems(updatedItem)
    }

    //delete all items
    const RemoveAll = ()=>{
        setItems([])
    }

    //adding local storage  (Not only set ,but i also want to get data..)
    useEffect(() => {
      localStorage.setItem("mytodolist", JSON.stringify(items))      //local storage works in key:value pair,Eisme hum strings hi pass kr sakte ha, aur kuch nahi...
    }, [items])            //items ki value change hogi,tabhi useEffect run karega..
    
    // edit item function
    const editItem = (id)=>{
        const itemToEdit = items.find((currElement)=> { return currElement.id === id })
        setInputData(itemToEdit.name)
        setToEditItem(id)
        settoggleButton(true)
    }

  return (
    <>
      <div className="main-div">
        <div className="child-div">
            <figure>
                <img src="./images/todo.svg" alt="todologo" />
                <figcaption>Add your list here</figcaption>
            </figure>
            <div className="addItems"></div>
            <input type="text" 
            placeholder='Add item..' 
            className='form-control'
            value={inputData}
            onChange={(event)=> setInputData(event.target.value)}
            />
            {tooggleButton ? ( <svg className=" far fa-edit add-btn"  onClick= {addToDoItem}
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#7ed321"} fill={"none"}>
                <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg> )      : 
                ( <svg className='fa fa-plus add-btn' onClick= {addToDoItem}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"}> <path d="M12 4V20M20 12H4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>) }
                
            
            
            
            
            
            {/* show all items */}
            <div className="showItems">
                {items.map( (currElement) => {
                    return(
                        <>
                            <div className="eachItem" key={currElement.id}>
                                <h3>{currElement.name}</h3>
                                <div className="todo-btn">         
                                <svg className=" far fa-edit add-btn" onClick={()=> editItem(currElement.id)}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#7ed321"} fill={"none"}>
                                <path d="M16.2141 4.98239L17.6158 3.58063C18.39 2.80646 19.6452 2.80646 20.4194 3.58063C21.1935 4.3548 21.1935 5.60998 20.4194 6.38415L19.0176 7.78591M16.2141 4.98239L10.9802 10.2163C9.93493 11.2616 9.41226 11.7842 9.05637 12.4211C8.70047 13.058 8.3424 14.5619 8 16C9.43809 15.6576 10.942 15.2995 11.5789 14.9436C12.2158 14.5877 12.7384 14.0651 13.7837 13.0198L19.0176 7.78591M16.2141 4.98239L19.0176 7.78591" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M21 12C21 16.2426 21 18.364 19.682 19.682C18.364 21 16.2426 21 12 21C7.75736 21 5.63604 21 4.31802 19.682C3 18.364 3 16.2426 3 12C3 7.75736 3 5.63604 4.31802 4.31802C5.63604 3 7.75736 3 12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                <svg className=" far fa-trash-alt" onClick={()=> deleteItem(currElement.id)}
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#d0021b"} fill={"none"}> <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /> <path d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /> <path d="M9.5 16.5L9.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                <path d="M14.5 16.5L14.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                                </svg>
                                </div>
                            </div>
                        </>
                    )
                } )}
                
            </div>

            {/* remove all button */}
            
            <div className="showItems">
                <button className="btn effect04" onClick={RemoveAll}
                data-sm-link-text="Remove All" ><span>CHECK LIST</span></button>
            </div>
        </div>
      </div>
    </>
  )
}

export default ToDo
