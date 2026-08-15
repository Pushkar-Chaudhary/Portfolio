import styled from "styled-components";

const Switch = ({ checked, onChange }) => {
  return (
    <StyledWrapper>
      <label className="switch">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
        />

        <span className="slider">
          <span className="star star_1"></span>
          <span className="star star_2"></span>
          <span className="star star_3"></span>

          {/* Put your cloud SVG here if you had one */}
        </span>
      </label>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .switch {
    font-size: 10px;
    position: relative;
    display: inline-block;
    width: 1.8em;
    height: 1.8em;
    border-radius: 30px;
    box-shadow: none;
    border: none;
    outline: none;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #2a2a2a;
    transition: 0.4s;
    border-radius: 30px;
    overflow: hidden;
    border: none;
    outline: none;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.05em;
    width: 1.05em;
    border-radius: 20px;
    left: 0.4em;
    bottom: 0.4em;
    transition: 0.4s;
    transition-timing-function: cubic-bezier(0.81, -0.04, 0.38, 1.5);
    box-shadow: inset 8px -4px 0px 0px #fff;
  }

  .switch input:checked + .slider {
    background-color: #00a6ff;
  }

  .switch input:checked + .slider:before {
    transform: translateX(1.6em);
    box-shadow: inset 15px -4px 0px 15px #ffcf48;
  }

  .star {
    background-color: #fff;
    border-radius: 50%;
    position: absolute;
    width: 5px;
    height: 5px;
    transition: all 0.4s;
  }

  .star_1 {
    left: 1.5em;
    top: 0.5em;
  }

  .star_2 {
    left: 1.2em;
    top: 1.2em;
  }

  .star_3 {
    left: 1.7em;
    top: 0.9em;
  }

  .switch input:checked ~ .slider .star {
    opacity: 0;
  }
`;

export default Switch;