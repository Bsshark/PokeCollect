import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Collection, CollectionState } from '../../interfaces';
export const collectionSlice = createSlice({
    name: 'collection',
    initialState: {
        isLoading: true,
        collection: {}
    } as CollectionState,
    reducers: {
        startLoading: (state: CollectionState) => {
            state.isLoading = true;
        },
        onLoadCollection: (state: CollectionState, {payload}: PayloadAction<Collection>) => {
            state.collection = payload;
            state.isLoading = false;
        }
    }
});
export const { onLoadCollection, startLoading } = collectionSlice.actions;