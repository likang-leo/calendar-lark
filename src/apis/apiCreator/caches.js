import Data from 'data_js';

const getGlobalCache = () => {
  let globalAPI = Data.get('global_api_data');
  if (!globalAPI) {
    globalAPI = {};
    Data.set('global_api_data', globalAPI);
  }
  return globalAPI;
};

export default getGlobalCache;
