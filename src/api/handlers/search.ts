import { RequestHandlerType } from 'restify';
import { client } from '../../datasource/connect';
interface SearchResult {
  type : String;
  results: any[];
}
export const search : RequestHandlerType = (req, res, next) => {
  const { search } = req.query;
  client.search({
    index:'game-index_v2',
    body: {
      query: {
        bool: {
          must: {
            multi_match: {
              query: search,
              fields: [
                'name',
                'intro',
              ],
            },
          },
          filter: {
            term: {
              enable: true,
            },
          },
        },
      },
    },

  }).then(
      (result) => {
        res.send({
          type:'game',
          results:result.hits,
        });
      },
  );
  return next();
};
