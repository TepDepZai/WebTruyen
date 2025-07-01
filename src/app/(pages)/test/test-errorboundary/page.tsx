"use client"

import { useEffect, useState } from "react";

const TestErrorBoundaryPage = () => {
   const [triggerError, setTriggerError] = useState(false);
  const [errorCount, setErrorCount] = useState(0);

  // Method gây lỗi "Cannot read properties of undefined"
  const causeError = () => {
    const obj:any = undefined;
    return obj.property; // Gây lỗi
  };

  // Tự động kích hoạt lỗi nhiều lần để test giới hạn dung lượng
  useEffect(() => {
    if (triggerError && errorCount < 10) { // Tạo 10 lỗi để test
      try {
        causeError();
      } catch (error) {
        console.log(`Lỗi số ${errorCount + 1}:`, error);
        setErrorCount((prev) => prev + 1);
      }
      const interval = setInterval(() => {
        try {
          causeError();
        } catch (error) {
          console.log(`Lỗi số ${errorCount + 1}:`, error);
          setErrorCount((prev) => prev + 1);
        }
      }, 100); // Tạo lỗi mỗi 100ms

      return () => clearInterval(interval); // Dọn dẹp interval khi unmount
    }
  }, [triggerError, errorCount]);

  return (
    <div>
      <h2>Test Log Component</h2>
      <p>Số lỗi đã tạo: {errorCount}</p>
      <button onClick={() => setTriggerError(true)}>Bắt đầu tạo lỗi</button>
      <button onClick={() => setTriggerError(false)}>Dừng tạo lỗi</button>
        {triggerError && <div>{causeError()}</div>}
    </div>
  );
}
 
export default TestErrorBoundaryPage;