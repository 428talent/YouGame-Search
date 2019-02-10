import { Client } from 'elasticsearch';
import { applicationConfig } from '../config';
const { elasticHost, elasticLog } = applicationConfig;
export let client : Client;

export function initDataSource() {
  client = new Client({
    host: elasticHost,
    log: elasticLog,
  });
}
