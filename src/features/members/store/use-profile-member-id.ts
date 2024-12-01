import {useQueryState} from "nuqs";

import {create} from "zustand"



interface ProfileMemberIdStore {
    profileMemberId: string | null;
    setProfileMemberId: (id: string | null) => void;
  }
  
  export const useProfileMemberId = create<ProfileMemberIdStore>((set) => ({
    profileMemberId: null,
    setProfileMemberId: (id) => set({ profileMemberId: id }),
  }));