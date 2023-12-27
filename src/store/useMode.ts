import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

export enum Mods {
  vr = 'vr',
  default = 'default',
}

type GameState = {
  mode: Mods;
  setVR: () => void;
  setDefault: () => void;
}

export const useMode = create<GameState>()(subscribeWithSelector((set) => ({
  mode: Mods.vr,
  setVR: () => set(() => ({mode: Mods.vr})),
  setDefault: () => set(() => ({mode: Mods.default})),
})));