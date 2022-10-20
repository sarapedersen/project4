import React, { ReactNode } from "react";

type Props = {
  buttonName: string
  onClick?: () => void
};



function Button(props: Props) {
  return (
    <div>
      <button onClick={props.onClick}>
        {props.buttonName}
      </button>
    </div>
  );
}

export default Button;
