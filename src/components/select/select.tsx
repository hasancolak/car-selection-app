import React, { useState } from "react";
import "./select.scss";

/**
 *
 * @param options
 * @param name
 * @param handleChange
 * @returns
 */
const Select = ({ options = {}, name, handleChange }: any) => {
  const [value, setValue] = useState("");

  const optionsHTML = options.map((data: any, index: any) => (
    <option key={index} value={data}>
      {data}
    </option>
  ));

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    if (options && options.includes(value)) {
      handleChange(e);
    }
  };

  return (
    <>
      <div className="select-box">
        <form>
          <label>{name}</label>
          <br />
          <input
            type="text"
            name={name}
            list={name}
            onChange={handleOnChange}
            value={value}
            placeholder={`Select or type ${name}`}
          />
          <datalist id={name}>{optionsHTML}</datalist>
        </form>
      </div>
    </>
  );
};

export default Select;
