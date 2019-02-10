import restify from 'restify';
import { initDataSource } from './datasource/connect';
import { setRouter } from './api/router';
import moment from 'moment';
import { applicationConfig, logService } from './config';
import { LogClient } from './log/client';
const { port } = applicationConfig;
initDataSource();
export const logClient = new LogClient({
  host:logService.host,
  instance:logService.instance,
  applicationId:logService.applicationId,
});
const server = restify.createServer({
  name: 'yougame-search',
  version: '1.0.0',
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
setRouter(server);
server.listen(port,  () => {
  console.log('%s listening at %s', server.name, server.url);
  logClient.sendLog({
    message:'search service start success',
    level:'info',
    time:moment().toISOString(),
  });
});
