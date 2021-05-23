import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import * as XLSX from "xlsx";

<script className="max">
    function myFunction() {
      
  Math.max(1,1000000,1000)
    }
  </script>
function App() {
  const [items, setItems] = useState([]);
  

  const readExcel = (file) => {
    const promise = new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsArrayBuffer(file);

      fileReader.onload = (e) => {
        const bufferArray = e.target.result;

        const wb = XLSX.read(bufferArray, { type: "buffer" });

        const wsname = wb.SheetNames[0];

        const ws = wb.Sheets[wsname];

        const data = XLSX.utils.sheet_to_json(ws);

        resolve(data);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });

    promise.then((d) => {
      setItems(d);
    });
  };

  return (
    <div>
      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          readExcel(file);
      
        }}
      />

      <table >
        <thead className="tablecontainer">
          <tr>
            <th scope="col">instrument_token</th>
            <th scope="col">exchange_token</th>
            <th scope="col">tradingsymbol</th>
            <th scope="col">name</th>
            <th scope="col">last_price</th>
            <th scope="col">expiry</th>
            <th scope="col">strike</th>
            <th scope="col">tick_size</th>
            <th scope="col" onClick="myFunction()">lot_size</th>
            <th scope="col">instrument_type</th>
            <th scope="col">segment</th>
            <th scope="col">exchange</th>          </tr>
        </thead>
        <tbody>
          {items.map((d) => (
            <tr key={d.Item}>
               <td>{d.instrument_token}</td>
          <td>{d.exchange_token}</td>
          <td>{d.tradingsymbol}</td>
          <td>{d.name}</td>
          <td className="sizec">{d.last_price}</td>
          <td>{d.expiry}</td>
          <td>{d.strike}</td>
          <td className="sizec">{d.tick_size}</td>
          <td className="sizec" >
          
              {d.lot_size}</td>
          <td>{d.instrument_type}</td>
          <td className="sizec">{d.segment}</td>
          <td>{d.exchange}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;