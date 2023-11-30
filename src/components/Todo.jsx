import React from 'react'

const Todo = ({title,description,complete,id,mongoId,deleteFunction,updateTodo}) => {
  return (
    <>
    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {id+1}
                </th>
                <td className={`${complete ? 'line-through':''} px-6 py-4`}>
                {title}
                </td>
                <td className={`${complete ? 'line-through':''} px-6 py-4`}>
                {description}
                </td>
                <td className={`${complete ? 'line-through':''} px-6 py-4`}>
                   {complete ? 'complete':'un-complete'}
                </td>
                <td className="px-6 py-4">
                
                    { !complete && <button onClick={()=>updateTodo(mongoId)} className="font-medium text-blue-600 dark:text-blue-500 hover:underline p-2">Edit</button>}
                    <button onClick={()=>deleteFunction(mongoId)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                </td>
            </tr>
    </>
  )
}

export default Todo