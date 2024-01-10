import { start } from "repl";
import { useAppDispatch, useAppSelector } from ".";
import pokeApi from "../api/pokeApi";
import { AuthState, Collection, CollectionState } from "../interfaces";
import { startLoading } from "../store/poke/pokeSlice";
import { onLoadCollection } from "../store/collection/collectionSlice";


export const useCollectionStore = () => {
    const dispatch = useAppDispatch();

    const { collection, isLoading }: CollectionState = useAppSelector((state) => state.collection);
    const { user }: AuthState = useAppSelector((state) => state.auth);


    const startLoadingCollection = async() =>{
        const { uid } = user;
        dispatch(startLoading());
        try {
            const resp = await pokeApi.get(`/collection/find/${uid}`);
            dispatch(onLoadCollection(resp.data));
            
        } catch (error) {
            console.log(error);
        }
    }

    const startUpdatingCollection = async(collectionData: Collection) => {
        const { uid } = user;
        dispatch(startLoading());

        try {
            
            const resp = await pokeApi.post(`/collection/add`, collectionData );
            console.log(resp);
        } catch (error) {
            console.log(error);
        }

    }


    return {
        collection,
        isLoading,

        //Metodos
        startLoadingCollection
    }

}