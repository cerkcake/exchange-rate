import { useEffect, useState } from "react";
import "./App.css";
import moneyImg from "./img/money.png";
import Currency from "./components/Currency";

function App() {
  // todo 2 : create state ที่เก็บ Array ของสกุลเงินของแต่ละประเทศ
  // todo 3 : passing props through currency to set rates options
  const [rateLists, setRateLists] = useState([]);
  // todo 3.1 : ทำใน file Curency.js

  // todo 4 : create 2 states เอามารับสกุลเงินตัวตั้งต้น และสกุลเงินที่ต้องการแปลง
  const [firstCrr, setFirstCrr] = useState("USD");
  const [secondCrr, setSecondCrr] = useState("THB");
  // todo 4.1 : ทำใน Render Zone.js

  // todo 5 : หลังจากที่เซ็ต initial แล้วจะไมาสามารถเลื่อก Choice ได้ (คือเลือกได้แหละ แต่ค่าในช่องมันไม่เปลี่ยน)
  // todo 5 ต่อ : จึงต้องมีการสร้าง propsที่เป็น function ที่จะทำการเปลี่ยนแปลงค่า initial render zone แล้วส่งไปให้ ดักจับ event Onchange ใน tag <select> (ใน component Currency )
  // todo 5.1 : ทำใน file Curency.js
  // todo 5.2 : สร้างฟังกฺชั่นที่ทำให้เกิดการเปลี่ยนแปลงสกุลเงิน ใน component <Currency/>

  // todo 7 : สร้าง state มาเก็บ จำนวนเงิน และอัตราการแลกเปลี่ยน
  const [amount, setAmount] = useState(1);
  const [exchange, setExchange] = useState(0);

  // todo 8 : เช็คว่า user กำลังกรอกข้อมูลจาก input ต้นทาง จริงหรือไม่
  const [checkCurrentInput, setCheckCurrentInput] = useState(true);
  let firstAmount, secondAmount;

  if (checkCurrentInput) {
    // todo 8.1 ถ้ากรอกจากต้นทาง (true) ให้ทำ...
    firstAmount = amount;
    secondAmount = amount * exchange;
  } else {
    // todo 8.2 ถ้าไม่กรอกจากต้นทาง (false) ให้ทำ...
    secondAmount = amount;
    firstAmount = amount / exchange;
  }
  // todo 9 : สร้างฟังก์ชั่นมาเก็บค่าที่กรอกลงใน input ต้นทาง/ปลายทาง
  // todo 9.1 ต้นทาง
  const inputFirstAmount = (e) => {
    setAmount(e.target.value);
    setCheckCurrentInput(true)
  };
  // todo 9.2 ปลายทาง
  const inputSecondAmount = (e) => {
    setAmount(e.target.value);
    setCheckCurrentInput(false)
  };

  // todo 1 : call API
  // useEffect(() => {
  //   const apiUrl = "https://api.exchangerate-api.com/v4/latest/usd";
  //   fetch(apiUrl) // todo 1.1 : fetch to call API
  //     .then((response) => response.json()) // todo 1.2 : สิ่งที่ได้รับมาจากการ Fetch API จะถูกเก็บในตัว response (แต่จริงๆจะตั้งชื่ออะไรก็ได้) แล้วสั่งให้มันคายออกมาในรูปแบบ JSON
  //     .then((data) => setRateLists([...Object.keys(data.rates)])); // todo 1.3 : ข้อมูล JSON จะถูกเก็บในตัวแปร ชื่อว่า data (แต่จริงๆตั้งชื่ออะไรก็ได้) แล้วสั่งให้มันทำอะไรต่อก็ได้ เช่น console.log(data) หรือ เอาไปเซ็ต useState
  // }, []); // การใส่ [] หมายความว่าต้องการให้ useEffect ทำงานแค่ครั้งเดียวเมื่อตอนโหลดหน้าครั้งแรก
  //            ถ้าไม่ใส่อะไรเลย จำทำงานวนไป แบบไม่สิ้นสุด จนคอมแหก

  // todo 6 : แก้ useEffect จากข้อ todo 1
  // todo 6.1 : แก้ apiUrl ให้เปลี่ยนแปลงตาม state first curr
  // todo 6.2 : แก้ dependency จากที่ให้จับการเปลี่ยนแปลงเฉพาะตอนโหลดหน้า ให้เปลี่ยนมาจับการเปลี่ยนแปลงทุกครั้งที่มีการเปลี่ยน firstCrr
  useEffect(() => {
    const apiUrl = `https://api.exchangerate-api.com/v4/latest/${firstCrr}`; // todo 6.1
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setRateLists([...Object.keys(data.rates)]); // todo 1.3 ได้ array ที่มีสกุลเงินของทุกประเทศ
        setExchange(data.rates[secondCrr]);
        // todo 7.1 : data.rates เป็น object ที่ประกอบไปด้วย สกุลเงิน:อัตราแลกเปลี่ยน โครงสร้างของ data.rates[secondCrr] คืออ => object[keys] ซึ่ง keys ก็คือ สกุลเงิน
        // todo 7.1.1 : ดังนั้น ในวงเล็บ setExchange(  จะเป็น "อัตราแลกเปลี่ยน" ที่ชื่อ keys ตรงกับ secondCrr )
        console.log("data : ", data);
        console.log("data.rates : ", data.rates);
      });
  }, [firstCrr, secondCrr]); // todo 6.2 : แก้เป็น [firstCrr] ---> todo 7.2 แก้เป็น [firstCrr,secondCrr]

  console.log("rateLists : ", rateLists);
  console.log("secondCrr : ", secondCrr);
  console.log("exchange : ", exchange);
  return (
    <div className="App">
      <img src={moneyImg} alt="" />
      <h1>Exchange Currency</h1>
      {/* 4.1 create props to set initial currency ของสกุลเงินตั้งต้น และ สกุลเงินที่ต้องการแปลง*/}
      <Currency
        rateLists={rateLists}
        initCrr={firstCrr} //4.1.1 สกุลเงินตั้งต้น
        changeInitCrr={(e) => setFirstCrr(e.target.value)}
        value={firstAmount}
        changeValue={inputFirstAmount}
      />
      <div> = </div>
      <Currency
        rateLists={rateLists}
        initCrr={secondCrr} //4.1.2 สกุลเงินที่ต้องการแปลง
        changeInitCrr={(e) => setSecondCrr(e.target.value)}
        value={secondAmount}
        changeValue={inputSecondAmount}
      />
    </div>
  );
}

export default App;
