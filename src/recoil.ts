import { ICurrentUser } from './interfaces';
import { atom } from "recoil";
import { GET_ME_ATOM_KEY } from "./constants";

export const getMeAtom = atom<ICurrentUser|null>({
  key: GET_ME_ATOM_KEY,
  default: null
})