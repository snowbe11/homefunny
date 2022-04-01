import {
  addDocument,
  deleteDocument,
  FirebaseValueObject,
  getCollection,
  getDocument,
} from "logic/api/firebase";
import React, { useCallback } from "react";

const useFirebase = <T extends FirebaseValueObject>(collection: string) => {
  const list = useCallback(async () => {
    return await getCollection(collection);
  }, [collection]);

  const get = useCallback(
    async (name: string) => {
      return await getDocument<T>(collection, name);
    },
    [collection]
  );

  const add = useCallback(
    async (name: string, values: T) => {
      return await addDocument<T>(collection, name, values);
    },
    [collection]
  );

  const remove = useCallback(
    async (name: string) => {
      return await deleteDocument(collection, name);
    },
    [collection]
  );

  return { list, get, add, remove };
};

export default useFirebase;
