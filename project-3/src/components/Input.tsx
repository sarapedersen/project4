import React, { useRef } from "react";

type Props = {
  name: string
  placeholder: string
  value: string
  ref: HTMLInputElement
  onChange?: () => void
};


const inputRef = useRef<HTMLInputElement>(null)




function Input(props: Props) {
  return (
    <div>
      <label htmlFor={props.name}></label>
      <input type="text" value={props.value} id={props.name} placeholder={props.placeholder} onChange={props.onChange} required/>
    </div>
  );
}

export default Input;
