import {useQueryState} from "nuqs";
import {create} from "zustand"



interface ParentMessageIdStore {
    parentMessageId: string | null;
    setParentMessageId: (id: string | null) => void;
  }
  
  export const useParentMessageId = create<ParentMessageIdStore>((set) => ({
    parentMessageId: null,
    setParentMessageId: (id) => set({ parentMessageId: id }),
  }));