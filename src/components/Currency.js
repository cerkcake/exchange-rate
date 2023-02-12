import React from "react";
import "./Currency.css";

const Currency = ({ rateLists,initCrr ,changeInitCrr,value,changeValue}) => {
  // todo 3.1 รับพร๊อปแล้ว .map()
  // todo 5.1 ดัก event onChange เมื่อมีการเลือกสกุลเงินใหม่ ให้ทำการเรียกฟังก์ชั่น changeInitCrr
  return (
    <div className="currency">
                                  {/*todo 5.1 */}
      <select value={initCrr} onChange={changeInitCrr}>
        {/*todo 3.1 */}
        {rateLists.map((rate) => (
          <option key={rate} value={rate}> 
            {rate}
          </option>
        ))}
      </select>
      <input type="number" value={value} onChange={changeValue}/>
    </div>
  );
};

export default Currency;
