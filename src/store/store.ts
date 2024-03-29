import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/authSlice";
import { pokeSlice } from "./poke/pokeSlice";
import { collectionSlice } from "./collection/collectionSlice";
import { encounterSlice } from "./encounter/encounterSlice";

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		poke: pokeSlice.reducer,
		collection: collectionSlice.reducer,
		encounter: encounterSlice.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware({
			serializableCheck: false,
		}),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
