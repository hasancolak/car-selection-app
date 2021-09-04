import React, { useState } from "react";
import VehicleFilter from "../filter/filter";
import { isInRange, isMatchingString } from "../../utils/utils";
import "./list.scss";
import { IVehicle } from "../../interface/vehicle.interface";

/**
 * @function List
 * @param vehicles
 * @param onVehicleSelect
 * @returns
 */
const List = ({ vehicles, onVehicleSelect }: any): JSX.Element => {
  const [filters, setFilters] = useState({});
  const [selected, setSelected] = useState({});

  if (!vehicles) {
    return <></>;
  }

  const { fuelTypeValues, bodyTypeValues } = vehicles.reduce(
    (values: any, current: any) => {
      values.fuelTypeValues.add(current.fuelType);
      values.bodyTypeValues.add(current.bodyType);

      return values;
    },
    {
      fuelTypeValues: new Set(),
      bodyTypeValues: new Set(),
    }
  );

  const getList = ({
    make,
    model,
    enginePowerPS,
    enginePowerKW,
    fuelType,
    bodyType,
    engineCapacity,
  }: IVehicle) => ({
    Make: make,
    Model: model,
    "Engine power (PS) ": enginePowerPS,
    "Engine power (KW)": enginePowerKW,
    "Fuel type": fuelType,
    "Body type": bodyType,
    "Engine capacity": engineCapacity,
  });

  const {
    enginePowerUnits,
    enginePower = {},
    fuelType,
    bodyType,
    engineCapacity = {},
  }: any = filters;

  const filteredVehicles = vehicles.filter(
    (vehicles: any) =>
      isInRange(
        vehicles[
          enginePowerUnits === "Horsepower" ? "enginePowerPS" : "enginePowerKW"
        ],
        enginePower
      ) &&
      isMatchingString(vehicles.fuelType, fuelType) &&
      isMatchingString(vehicles.bodyType, bodyType) &&
      isInRange(vehicles.engineCapacity, engineCapacity)
  );

  const onVehicleClick = (element: any) => {
    setSelected(element);
    onVehicleSelect(element);
  };

  const isElementSelected = (element: any) =>
    JSON.stringify(element) === JSON.stringify(selected);

  const listHTML = () =>
    filteredVehicles.map((element: any, index: number) => (
      <>
        <div className="list-content">
          <div
            key={index}
            className={`list-box  ${
              isElementSelected(element) ? "selected" : ""
            }`}
            onClick={() => onVehicleClick(element)}
          >
            {Object.entries(getList(element)).map(([key, value]) => (
              <div className="list-item" key={key}>
                <div className="text">{`${key}`}</div>
                <div className="value">{value}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    ));

  return (
    <>
      {vehicles.length > 0 ? (
        <VehicleFilter
          fuelType={[...fuelTypeValues]}
          bodyType={[...bodyTypeValues]}
          setFilters={setFilters}
        />
      ) : null}
      {listHTML()}
    </>
  );
};

export default List;
