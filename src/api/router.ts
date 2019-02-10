import { Server } from 'restify';
import { search } from './handlers/search';

export function setRouter(server : Server) {
  server.get('/search', search);
}
