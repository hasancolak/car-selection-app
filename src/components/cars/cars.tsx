import React, { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import List from "../list/list";
import Select from "../select/select";
import {
  getMakeAsync,
  getModelAsync,
  getVehiclesAsync,
  selectMake,
  selectModel,
  selectVehicles,
} from "../../slice/car.slice";
import { SELECTION_INFO } from "../../utils/constants";

/**
 * @function Cars : This functions returns make, model and vehicle selection list
 * @returns Cars selection HTML
 */
function Cars(): JSX.Element {
  const dispatch = useAppDispatch();
  const makers = useAppSelector(selectMake);
  const models = useAppSelector(selectModel);
  const vehicles = useAppSelector(selectVehicles);

  useEffect(() => {
    if (!makers?.length) dispatch(getMakeAsync());
  }, [dispatch, makers]);

  const [selectedMake, setSelectedMaker] = useState<string | undefined>();
  const [selectedModel, setSelectedModel] = useState<string | undefined>();
  const [selectedVehicle, setSelectedVehicle] = useState({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "make":
        dispatch(getModelAsync({ make: e.target.value }));
        setSelectedMaker(e.target.value);
        break;
      case "model":
        dispatch(
          getVehiclesAsync({ make: selectedMake, model: e.target.value })
        );
        setSelectedModel(e.target.value);
        break;
      default:
        break;
    }
  };

  const info = (param: string | undefined) => {
    return param === undefined || param === "" ? null : (
      <div> {SELECTION_INFO + param}</div>
    );
  };

  const onVehicleSelect = (e: {}) => {
    setSelectedVehicle(e);
  };

  return (
    <>
      <Select name="make" options={makers} handleChange={handleChange}></Select>
      {models && models.length > 0 ? (
        <>
          <Select
            name="model"
            options={models}
            handleChange={handleChange}
          ></Select>
          {vehicles && vehicles.length > 0 ? null : info(selectedModel)}
        </>
      ) : (
        info(selectedMake)
      )}

      <List vehicles={vehicles} onVehicleSelect={onVehicleSelect}></List>
    </>
  );
}

export default Cars;
