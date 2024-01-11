import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { EncounterState } from '../../interfaces/EncounterInterfaces';
import { Pokemon } from '../../interfaces/PokedexInterfaces';
export const encounterSlice = createSlice({
    name: 'encounter',
    initialState: {
        isLoading: true,
        nRandom: null,
        nShinyRandom: null,
        pokemon: {},
        isCaptured: false,
        pokeballSelected: "",
    } as EncounterState,
    reducers: {
        onStartLoad: (state: EncounterState) => {
            state.isLoading = true;
        },
        onStopLoading: (state: EncounterState) => {
            state.isLoading = false;
        },
        onLoad: (state: EncounterState, { payload }: PayloadAction<Pokemon>) => {
            state.pokemon = payload;
            state.isLoading = false;
        },
    }
});
export const { onLoad, onStartLoad, onStopLoading } = encounterSlice.actions;