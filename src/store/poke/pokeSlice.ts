import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PokeState, RootTypes } from '../../interfaces/pokemonInterfaces';
import { Pokemon, PokemonType } from 'pokenode-ts';
export const pokeSlice = createSlice({
    name: 'poke',
    initialState: {
        isLoading: true,
        pokeSelected: null,
        pokemonShown: [],
        types: []
    },
    reducers: {
        startLoading: (state:PokeState) => {
            state.isLoading = true
        },
        onLoadPokemon: (state: PokeState, { payload }: PayloadAction<Pokemon[]>) => {
            state.pokemonShown = payload;
            state.isLoading = false;
        },
        onLoadTypes: (state: PokeState, { payload}: PayloadAction<RootTypes[]>) => {
            state.types = payload;
            console.log(state.types)
        }
    }
});
export const { startLoading, onLoadPokemon, onLoadTypes} = pokeSlice.actions;