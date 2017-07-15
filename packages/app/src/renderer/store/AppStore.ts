import { observable, action, computed, IObservableArray } from "mobx";
import Endpoint from "./endpoint/Endpoint";

export default class AppStore {
  @observable endpoints: IObservableArray<Endpoint> = observable([]);
  @observable currentEndpoint: Endpoint;

  constructor() {
    this.addEndpoint("/");
  }

  @action
  setCurrentEndpoint = (id: string) => {
    this.currentEndpoint = this.endpoints.find(endpoint => endpoint.id === id);
  };

  @action
  addEndpoint = (url: string = "") => {
    const endpoint = new Endpoint();
    endpoint.setUrl(url);

    this.currentEndpoint = endpoint;
    this.endpoints.push(endpoint);
  };

  @action
  deleteEndpoint = (id: string) => {
    this.endpoints.remove(this.endpoints.find(endpoint => endpoint.id === id));
  };

  @action
  moveEndpoint = (fromIndex: number, toIndex: number) => {
    this.endpoints.move(fromIndex, toIndex);
  };
}
