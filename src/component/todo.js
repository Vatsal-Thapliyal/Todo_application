import React, { useState, useEffect } from 'react'

const getLocalStorage = () => {
  const list = localStorage.getItem('itemsInStorage');

  return JSON.parse(list);
}

const Todo = () => {
  const [inputData, setNewData] = useState('');
  const [items, setNewItem] = useState(getLocalStorage);
  const handleInputData = (event) => {
      setNewData(event.target.value);
  };
  

  useEffect(() => {
      localStorage.setItem('itemsInStorage',JSON.stringify(items));
  },[items]);


  const addItem = () => {
    if(inputData !== '')
    {
      const myInputData = {
        id : new Date().getTime().toString() ,
        name : inputData
      }

      setNewItem([...items, myInputData]);
      setNewData('');
    }
    else{
      alert('Please Enter an Item');
    }
  };

  const deleteItem = (id) => {

    const updatedItems = items.filter((currentItem) => {
        return (id !== currentItem.id);
    })
    setNewItem(updatedItems);
  };

  const removeAll = () => {
    setNewItem([]);
  }

  return (
   <>
        <div className='flex items-center justify-center my-40' >
        <div className='flex flex-col items-center'>
            <img className=" my-3 h-18 w-20" src={require('./todo_logo.png')} alt="Todo_img" />

            <h1 className="my-2 text-yellow-400 text-lg">Add Your List Here</h1>
            <div>
                <input className="w-80 h-10 px-2 rounded" type="text" placeholder='Add Item...' value={inputData} onChange={handleInputData}/>
                <button className="mx-2 bg-transparent hover:bg-yellow-400 text-yellow-400 font-bold hover:text-slate-800 py-1 px-3 border border-yellow-400 hover:border-transparent rounded text-lg" onClick={addItem} >+</button>
            </div>
            
            
            <div className='items-container m-5'>

              {items.map((item) => (
                <div className='each-item flex justify-center m-3' key={item.id}>
                <div className='item-name flex justify-center py-2 w-60 text-white border-white rounded border-solid border-1 bg-violet-900'>
                    <h1 className='font-bold'>{item.name}</h1>
                </div>
                <div className='todo-btn flex justify-center'>
                        <button className='item-name flex justify-center py-2 px-2 mx-3 text-white border-white rounded border-solid border-1 bg-green-500 hover:bg-green-700'>Edit</button>
                        <button className='item-name flex justify-center py-2 px-2 text-white border-white rounded border-solid border-1 bg-red-500 hover:bg-red-700' onClick={() => deleteItem(item.id)} >Delete</button>
                </div>
                </div>
              ))};

            </div>



            <button className="w-80 bg-transparent hover:bg-yellow-400 text-yellow-400 font-semibold hover:text-slate-800 py-2 px-4 border border-yellow-400 hover:border-transparent rounded my-4" onClick={removeAll}>
                 Remove All
            </button>
        </div>
        </div>
   </> 
  )
}

export default Todo