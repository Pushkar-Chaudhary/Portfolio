function TiltCard({ as: Element = "div", className = "", children, ...props }) {
  const handlePointerMove = (event) => {
    if (event.pointerType === "touch") return;

    const { currentTarget, clientX, clientY } = event;
    const bounds = currentTarget.getBoundingClientRect();
    const x = (clientX - bounds.left) / bounds.width - 0.5;
    const y = (clientY - bounds.top) / bounds.height - 0.5;

    currentTarget.style.setProperty("--tilt-x", `${(-y * 5).toFixed(2)}deg`);
    currentTarget.style.setProperty("--tilt-y", `${(x * 6).toFixed(2)}deg`);
    currentTarget.style.setProperty("--parallax-x", `${(x * -12).toFixed(2)}px`);
    currentTarget.style.setProperty("--parallax-y", `${(y * -12).toFixed(2)}px`);
  };

  const resetTilt = (event) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
    event.currentTarget.style.setProperty("--parallax-x", "0px");
    event.currentTarget.style.setProperty("--parallax-y", "0px");
  };

  return (
    <Element
      {...props}
      className={`tilt-surface ${className}`.trim()}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTilt}
    >
      {children}
    </Element>
  );
}

export default TiltCard;
