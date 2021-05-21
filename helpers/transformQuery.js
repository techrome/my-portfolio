import cloneDeep from "lodash/cloneDeep";
import isObject from "lodash/isObject";

const transformQuery = ({ queryObj, mapping, isForServer }) => {
  const clonedQuery = cloneDeep(queryObj);

  if (isForServer) {
    let queryForServer = {};

    for (let clientKey in mapping) {
      if (clonedQuery[clientKey]) {
        const serverKey = mapping[clientKey];
        if (isObject(serverKey)) {
          queryForServer[serverKey.name] = serverKey.modifyValue(
            clonedQuery[clientKey]
          );
        } else {
          queryForServer[serverKey] = clonedQuery[clientKey];
        }
      }
    }

    return queryForServer;
  } else {
    let beautifiedQuery = {};

    for (let clientKey in mapping) {
      const serverKey = isObject(mapping[clientKey])
        ? mapping[clientKey].name
        : mapping[clientKey];
      if (clonedQuery[serverKey]) {
        beautifiedQuery[clientKey] = clonedQuery[serverKey];
      }
    }

    return beautifiedQuery;
  }
};

export default transformQuery;
