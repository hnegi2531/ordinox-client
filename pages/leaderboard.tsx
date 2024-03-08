import React from 'react'

const Leaderboard = () => {
  return (
    <div className='text-white bg-black px-20'>
       <table className="table-auto w-full ">
    <thead>
      <tr>
        <th className="px-4 py-2 text-left uppercase">Rank</th>
        <th className="px-4 py-2 text-left uppercase">usename</th>
        <th className="px-4 py-2 text-left uppercase">invited by</th>
        <th className="px-4 py-2 text-right uppercase">points earned</th>
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

