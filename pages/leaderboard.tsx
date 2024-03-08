import React from 'react'

const Leaderboard = () => {
  return (
    <div className='text-white bg-black'>
       <table className="table-auto w-full">
    <thead>
      <tr>
        <th className=" px-4 py-2 text-left">Header 1</th>
        <th className=" px-4 py-2">Header 2</th>
        <th className=" px-4 py-2">Header 3</th>
      </tr>
    </thead>
    <tbody>
      <tr className='border-b-[1px]'>
        <td className=" px-4 py-2">Row 1, Cell 1</td>
        <td className=" px-4 py-2">Row 1, Cell 2</td>
        <td className=" px-4 py-2">Row 1, Cell 3</td>
      </tr>
      <tr className='border-b-[1px]'>
        <td className=" px-4 py-2">Row 2, Cell 1</td>
        <td className=" px-4 py-2">Row 2, Cell 2</td>
        <td className=" px-4 py-2">Row 2, Cell 3</td>
      </tr>
   
    </tbody>
  </table>
    </div>
  )
}

export default Leaderboard