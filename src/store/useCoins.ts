import { create } from 'zustand';
import { subscribeWithSelector, persist, createJSONStorage } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import { Vector3 } from 'three';

const STORAGE = 'coins-local-storage';

export type Coin = {
  id: string;
  position: Vector3;
  isActive: boolean;
  date: string;
}



type CoinsState = {
  coins: Coin[];
  getCoin: (id: string) => void;
}

type CoinsStoreState = {
  counter: number;
  increase: (coin: Coin) => void;
  currentDate: string;
  coins: Coin[];
}

const coins: Coin[] = [
  {id: uuidv4(), position: new Vector3(3, 15, -6), isActive: true, date: new Date().getTime().toString()},
  {id: uuidv4(), position: new Vector3(12, 11, 3), isActive: true, date: new Date().getTime().toString()},
  {id: uuidv4(), position: new Vector3(-3, 8, -12), isActive: true, date: new Date().getTime().toString()},
  {id: uuidv4(), position: new Vector3(-12, 5, 6), isActive: true, date: new Date().getTime().toString()},
  {id: uuidv4(), position: new Vector3(12, 2, 12), isActive: true, date: new Date().getTime().toString()},
];

const getCoins = () => {
  const todayCoins: Coin[] = [];
  let n = 0;

  const storage = localStorage.getItem(STORAGE);
  if (storage) {
    const today = new Date();
    const parserStorage: {state: CoinsStoreState} = JSON.parse(storage);
    if (parserStorage.state.coins.length === 0) {
      return coins;
    }
    for (let i = parserStorage.state.coins.length - 1; i > parserStorage.state.coins.length - 6; i--) {
      const coin = parserStorage.state.coins[i];
      if (!coin) {
        n++;
        continue;
      }
      
      const coinDate = new Date(Number(coin.date));
      
      if (today.getTime() - coinDate.getTime() > 1000 * 60) {
        n++;
        if (n === 5) {
          break;
        }
      }
    }
    for (let j = 0; j < n; j++) {
      todayCoins.push(coins[j]);
    }
    
  } else {
    localStorage.setItem(STORAGE, JSON.stringify({
      coins: [],
      currentDate: new Date().toLocaleString(),
      counter: 0,
    }));
    return coins;
  }

  return todayCoins;
}

export const useCoins = create<CoinsState>()(subscribeWithSelector((set, get) => ({
  coins: getCoins(),
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
  coins: [],
  currentDate: new Date().toLocaleString(),
  counter: 0,
  increase: (coin) => set((state) => ({counter: state.counter + 1, coins: [...state.coins, coin]})),
}), {
  name: STORAGE,
  storage: createJSONStorage(() => localStorage),
}));