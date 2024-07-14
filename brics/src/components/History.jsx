import React, { useState } from 'react';

const History = () => {
  return (
    <>
        
        <div className="h-screen ">
        <div class="overflow-x-auto ">
          <h3 className='mt-10 mb-20 text-3xl uppercase font-bold tracking-widest text-center '>Transaction History</h3> 
       
        <table class="table-compact table ">
          <thead>
            <tr >
              <th  ><p className='text-purple-600'>Amount</p></th>
               <th><p className='text-purple-600'>Asset</p></th> 
               <th><p className='text-purple-600'>Direction</p></th>
                <th><p className='text-purple-600'>Protocol</p></th>
                 <th><p className='text-purple-600'>Status</p></th> 
                 <th><p className='text-purple-600'>Date</p></th> 
                 <th><p className='text-purple-600'>More Info</p></th> 
                 <th><p className='text-purple-600'>Actions</p></th>
            </tr></thead> 
        <tbody>
        <tr>
              <td>0</td>
               <td>XLM</td> 
               <td>-</td>
                <td>-</td>
                 <td>-</td> 
                 <td>12/02/11</td> 
                 <td>-</td> 
                 <td>-</td>
            </tr>
            <tr>
              <td>0</td>
               <td>XLM</td> 
               <td>-</td>
                <td>-</td>
                 <td>-</td> 
                 <td>12/02/11</td> 
                 <td>-</td> 
                 <td>-</td>
            </tr>
          </tbody>
          
          </table> 
          
          </div>
          
          </div>
          {/* <table class="table">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table> */}
    </>
  );
};

export default History;