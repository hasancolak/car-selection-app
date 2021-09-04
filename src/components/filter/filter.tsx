/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import "./filter.scss";

/**
 * @function Filter : This function mage filter operation regarding with vehicle data list
 * @param fuelType
 * @param bodyType
 * @param setFilters
 * @returns Text and Select HTML
 */
const Filter = ({ fuelType, bodyType, setFilters }: any): JSX.Element => {
  const setFilterSelect = (key: string) => (value: string) => {
    setFilters((filters: string[]) => ({
      ...filters,
      [key]: value,
    }));
  };

  const setFilterText = (key: string) => (filter: any) => {
    setFilters((filters: any) => ({
      ...filters,
      [key]: {
        ...filters[key],
        ...filter,
      },
    }));
  };

  return (
    <>
      <div className="filter-content">
        <Select
          values={fuelType}
          name="Fuel type"
          filter={setFilterSelect("fuelType")}
        />
        <Select
          values={bodyType}
          name="Body type"
          filter={setFilterSelect("bodyType")}
        />
        <Select
          values={["Horsepower", "Kilowatts"]}
          name="Engine power units"
          filter={setFilterSelect("enginePowerUnits")}
          defaultValue="Horsepower"
        />
        <Text name="Engine power" filter={setFilterText("enginePower")} />
        <Text name="Engine capacity" filter={setFilterText("engineCapacity")} />
      </div>
    </>
  );
};

/**
 * @function Text : This function returns Text filter HTML
 * @param name
 * @param filter
 * @returns
 */
const Text = ({ name, filter }: any) => {
  const filterText =
    (field: any) =>
    ({ target: { value } }: any) => {
      filter({ [field]: value });
    };

  return (
    <div className="filter-box filter-box__input">
      <label>{name}</label>
      <div className="filter-input">
        <input type="number" onChange={filterText("min")} />
        <label>-</label>
        <input type="number" onChange={filterText("max")} />
      </div>
    </div>
  );
};

/**
 * @function Select : This function returns Select filter HTML
 * @param values
 * @param name
 * @param filter
 * @param defaultValue
 * @returns
 */
const Select = ({ values = [], name, filter, defaultValue }: any) => {
  const filterSelect = ({ target: { value } }: any) => {
    filter(value);
  };

  return (
    <div className="filter-box filter-box__select">
      <label>{name}</label>
      <select
        onChange={filterSelect}
        defaultValue={defaultValue}
        className="filter-input"
      >
        {defaultValue ? null : <option />}
        {values.map((value: string, index: number) => (
          <option key={index}>{value}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
