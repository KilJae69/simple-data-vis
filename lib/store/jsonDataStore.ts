import {create} from 'zustand';
import { JsonData } from '../types';



type StoreState = {
  jsonData: JsonData | null;
  setJsonData: (data: JsonData) => void;
}

export const useStore = create<StoreState>(set => ({
  jsonData: null,
  setJsonData: (data) => set({ jsonData: data })
}));