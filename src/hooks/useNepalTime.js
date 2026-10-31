import { useState, useEffect } from "react";

export function useNepalTime() {
  const [nepalTime, setNepalTime] = useState("");

  useEffect(() => {
    const update = () => {
      try {
        const formatter = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kathmandu",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        });
        setNepalTime(formatter.format(new Date()));
      } catch {
        // Fallback calculation for UTC+5:45
        const now = new Date();
        const utc = now.getTime() + now.getTimezoneOffset() * 60000;
        const nepalDate = new Date(utc + (5 * 3600000 + 45 * 60000));
        setNepalTime(nepalDate.toLocaleTimeString("en-US"));
      }
    };

    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return nepalTime;
}

export default useNepalTime;
