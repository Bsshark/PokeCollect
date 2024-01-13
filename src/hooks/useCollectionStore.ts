import { useAppDispatch, useAppSelector } from ".";
import pokeApi from "../api/pokeApi";
import { AuthState, Collection, CollectionState } from "../interfaces";
import { onLoadCollection, startLoading } from "../store/collection/collectionSlice";

export const useCollectionStore = () => {
	const dispatch = useAppDispatch();

	const { collection, isLoading }: CollectionState = useAppSelector(
		(state) => state.collection
	);
	const { user }: AuthState = useAppSelector((state) => state.auth);

	const startLoadingCollection = async () => {
		const { uid } = user;
		dispatch(startLoading());
		try {
            if("collection" in localStorage) {
                const coleccionLocal = JSON.parse(localStorage.getItem("collection")!);
                dispatch(onLoadCollection(coleccionLocal));
            } else {
                const resp = await pokeApi.get(`/collection/find/${uid}`);
                localStorage.setItem("collection", JSON.stringify(resp.data));
                dispatch(onLoadCollection(resp.data));
            }
			
		} catch (error) {
			console.log(error);
		}
	};

	const startUpdatingCollection = async (collectionData: Collection) => {
		dispatch(startLoading());

		try {
			await pokeApi.post(`/collection/add`, collectionData).then(() => {
                localStorage.removeItem("collection");
				startLoadingCollection();
			});
		} catch (error) {
			console.log(error);
		}
	};

	return {
		collection,
		isLoading,

		//Metodos
		startLoadingCollection,
		startUpdatingCollection,
	};
};
