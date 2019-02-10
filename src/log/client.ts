import axios from 'axios';
export interface LogClientConfig {
  host:string;
  applicationId:string;
  instance:string;
}
export class LogClient {
  config : LogClientConfig;
  constructor(config : LogClientConfig) {
    this.config = config;
  }
  async sendLog(payload : LogPayload) {
    return axios.post(this.config.host, {
      ...payload,
      application:this.config.applicationId,
      instance:this.config.instance,
    });
  }

}

export interface LogPayload {
  message:string;
  extra?:any;
  time:string;
  level : string;
}
