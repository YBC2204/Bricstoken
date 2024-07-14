import React, { useState } from 'react';

const History = () => {
  return (
    <>
        
        <div className="h-screen btoken-container">
        <div class="overflow-x-auto ">
          <h3 className='drop-item'>Transaction History</h3> 
       
        <table class="table-compact table ">
          <thead>
            <tr>
              <th>Amount</th>
               <th>Asset</th> 
               <th>Direction</th>
                <th>Protocol</th>
                 <th>Status</th> 
                 <th>Date</th> 
                 <th>More Info</th> 
                 <th>Actions</th>
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