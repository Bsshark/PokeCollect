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
    } as EncounterState,
    reducers: {
        onLoad: (state: EncounterState, { payload }: PayloadAction<Pokemon>) => {
            state.pokemon = payload;
            state.isLoading = false;
        },
    }
});
export const { onLoad } = encounterSlice.actions;