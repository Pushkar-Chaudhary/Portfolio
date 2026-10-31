import useNepalTime from "../hooks/useNepalTime.js";

function NepalClock({ showLocation = true, compact = false }) {
  const time = useNepalTime();

  if (compact) {
    return (
      <span className="nepal-clock-compact" title="Current Time in Itahari, Nepal (Asia/Kathmandu · UTC+5:45)">
        <span className="clock-pulse-dot" aria-hidden="true" />
        <span className="clock-time-val">{time || "--:--:--"}</span>
        <span className="clock-zone-badge">NPT</span>
      </span>
    );
  }

  return (
    <div className="nepal-clock-pill" title="Live Time in Itahari, Nepal (Asia/Kathmandu · UTC+5:45)">
      <span className="clock-pulse-dot" aria-hidden="true" />
      {showLocation && <span className="clock-location-name">Itahari, Nepal</span>}
      {showLocation && <span className="clock-dot-sep">·</span>}
      <span className="clock-time-val">{time || "--:--:--"}</span>
      <span className="clock-zone-badge">NPT</span>
    </div>
  );
}

export default NepalClock;
