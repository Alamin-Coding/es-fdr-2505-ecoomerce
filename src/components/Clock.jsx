import { useEffect, useState } from "react";

// Starts at 2 days, 6 hours, 5 minutes, 30 seconds (as in the design).
const DEFAULT_SECONDS = 2 * 86400 + 6 * 3600 + 5 * 60 + 30;

const pad = (n) => String(n).padStart(2, "0");

function TimeBox({ value, label }) {
  return (
    <div className="flex flex-col items-center gap-[15px]">
      <div className="flex h-[76px] w-[76px] items-center justify-center rounded-[10px] bg-white shadow-[0_2px_10px_rgba(0,0,0,0.12)]">
        <span className="font-['Orbitron',monospace] text-[32px] font-medium leading-none tracking-[0.02em] text-[#484848]">
          {pad(value)}
        </span>
      </div>
      <span className="font-poppins text-[24px] font-normal leading-[120%] text-[#484848]">
        {label}
      </span>
    </div>
  );
}

export default function CountdownOffer({
  initialSeconds = DEFAULT_SECONDS,

}) {
  const [left, setLeft] = useState(initialSeconds);

  useEffect(() => {
    const id = setInterval(() => setLeft((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(id);
  }, []);

  const days = Math.floor(left / 86400);
  const hours = Math.floor((left % 86400) / 3600);
  const mins = Math.floor((left % 3600) / 60);
  const secs = left % 60;

  return (
    <div className="mb-[247px] w-[394px] h-[177px] inline-block bg-transparent">
      {/* Google fonts – move this <link> into index.html if you prefer */}
      <link
        href="https://fonts.googleapis.com/css2?family=Orbitron:wght@500&family=Poppins:wght@400;500&display=swap"
        rel="stylesheet"
      />

      <h3 className="mb-[15px] font-poppins text-[28px] font-medium leading-tight text-[#484848]">
        Hurry, Before It&rsquo;s Too Late!
      </h3>

      <div className="flex gap-[30px]">
        <TimeBox value={days} label="Days" />
        <TimeBox value={hours} label="Hr" />
        <TimeBox value={mins} label="Mins" />
        <TimeBox value={secs} label="Sec" />
      </div>
    </div>
  );
}