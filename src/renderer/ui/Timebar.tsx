import React, { useState, useEffect } from 'react';

function DateTimeDisplay() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="flex space-x-2">
      <div className="stat-value">
        日期：{currentDateTime.toLocaleDateString()}
      </div>
      <div className="stat-value">
        时间：{currentDateTime.toLocaleTimeString()}
      </div>
    </div>
  );
}

export default DateTimeDisplay;
