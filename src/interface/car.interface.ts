import { IVehicle } from "./vehicle.interface";

export interface CarStore {
  makes: string[] | null;
  models: string[] | null;
  vehicles: IVehicle[] | null;
}
