import { WordTestType } from "logic/type";
import useFirebase from "logic/hook/useFirebase";
import { useCallback } from "react";

const useWordTest = () => {
  const { list, get, add, remove } = useFirebase(
    process.env.REACT_APP_COLLECTION_WORD_TEST || ""
  );

  const getTestLevelList = useCallback(async () => {
    if (process.env.REACT_APP_COLLECTION_WORD_TEST) {
      return await list();
    } else {
      return Array<string>();
    }
  }, [list]);

  const getWordTest = useCallback(
    async (level: string) => {
      if (process.env.REACT_APP_COLLECTION_WORD_TEST) {
        return await get(level);
      } else {
        return undefined;
      }
    },
    [get]
  );

  const addWordTest = useCallback(
    async (level: string, list: Array<WordTestType>) => {
      if (process.env.REACT_APP_COLLECTION_WORD_TEST) {
        // WordTestType 형식오류가 날텐데 넘어가고 있다.
        let docData = {};
        list.map((e) => {
          docData = { ...docData, [e.word]: e.desc };
          return e;
        });

        return await add(level, docData);
      }

      return false;
    },
    [add]
  );

  const deleteWordTest = useCallback(
    async (level: string) => {
      return await remove(level);
    },
    [remove]
  );

  return { getTestLevelList, getWordTest, addWordTest, deleteWordTest };
};

export default useWordTest;
