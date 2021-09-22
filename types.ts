export namespace SmartHut {
  export interface Device {
    buildingId: string;
    minValue: number;
    maxValue: number;
    unitId: string;
    metricType: number;
    id: string;
    name: string;
  }
  export interface DeviceExtended {
    buildingId: string;
    minValue: number;
    maxValue: number;
    unitId: string;
    metricType: number;
    id: string;
    name: string;
    sensorType: string | null;
  }

  export interface getBuildingAndDevicesData {
    address: string;
    postalCode: string;
    city: string;
    country: string;
    azureAdGroupId: string;
    devices: Device[];
    id: string;
    name: string;
  }
  export interface getBuildingData {
    address: string;
    postalCode: string;
    city: string;
    country: string;
    azureAdGroupId: string;
    devices?: any;
    id: string;
    name: string;
  }

  export interface UnitData {
    unit: string;
    id: string;
    name: string;
  }

  export interface NewTelemetry {
    deviceId: string;
    buildingId: string;
    value: number;
    time: number;
}

}