import { create } from 'zustand';
import { subscribeWithSelector, persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Vector3 } from 'three';

export type Coin = {
  id: string;
  position: Vector3;
  isActive: boolean;
}



type CoinsState = {
  coins: Coin[];
  getCoin: (id: string) => void;
}

type CoinsStoreState = {
  counter: number;
  increase: () => void;
}

const coins: Coin[] = [
  {id: uuidv4(), position: new Vector3(8, 1, 0), isActive: true},
  {id: uuidv4(), position: new Vector3(6, 1, 0), isActive: true},
  {id: uuidv4(), position: new Vector3(4, 1, 0), isActive: true},
  {id: uuidv4(), position: new Vector3(2, 1, 0), isActive: true},
  {id: uuidv4(), position: new Vector3(-4, 1, 0), isActive: true},
];

export const useCoins = create<CoinsState>()(subscribeWithSelector((set, get) => ({
  coins: coins,
  getCoin: (id) => {
    const coins = get().coins;
    const coin = coins.find(c => c.id === id);
    if (coin) {
      coin.isActive = false;
    }
    set(() => ({coins}));
  }
  // setDefault: () => set(() => ({mode: Mods.default})),
})));


export const useCoinsStore = create<CoinsStoreState>()(persist((set, get) => ({
  counter: 0,
  increase: () => set((state) => ({counter: state.counter + 1})),
}), {
  name: 'coins-local-storage',
  storage: createJSONStorage(() => localStorage),
}));