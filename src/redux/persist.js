import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
export function persist(key, whitelist, reducer) {
  return persistReducer(
    {
      key,
      storage: storage,
      whitelist
    },
    reducer
  );
}
