import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { PokeState} from '../../interfaces/pokemonInterfaces';
import { Pokemon, PokemonType } from '../../interfaces/PokedexInterfaces';
export const pokeSlice = createSlice({
    name: 'poke',
    initialState: {
        isLoading: true,
        pokeSelected: null,
        pokemonShown: [],
        limit: 9,
        from: 1,
        types: [],
        dbTypes: [],
    },
    reducers: {
        startLoading: (state:PokeState) => {
            state.isLoading = true
        },
        onLoadPokemon: (state: PokeState, { payload }: PayloadAction<Pokemon[] | Pokemon>) => {
            state.pokemonShown = payload;
            state.isLoading = false;
        },
        onLoadTypes: (state: PokeState, { payload}: PayloadAction<PokemonType[]>) => {
            state.types = payload;
            state.isLoading = false;
        },
        onLoadDBTypes: (state: PokeState, { payload } : PayloadAction<PokemonType[]>) => {
            state.dbTypes = payload;
            state.isLoading = false;
        },
        onSetPokedexLimits: (state: PokeState, { payload }: PayloadAction<{limit:number, from: number}>) => {
            state.limit = payload.limit;
            state.from = payload.from;
            state.isLoading = false;
        },
    }
});
export const { startLoading, onLoadPokemon, onLoadTypes, onLoadDBTypes, onSetPokedexLimits } = pokeSlice.actions;