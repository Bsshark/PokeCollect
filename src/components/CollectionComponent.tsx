import { useEffect, useState } from "react";
import { useCollectionStore } from "../hooks/useCollectionStore";
import { usePokeStore } from "../hooks/usePokeStore";
import { OrderBy } from "./OrderBy";
import { PokeCard } from "./PokeCard";
import { findTypeInLanguage, setIdToType } from "../helpers/pokeHelp";
import { CollectionItem } from "../interfaces";

export const CollectionComponent = () => {
	const { collection, isLoading } = useCollectionStore();
	const { types, dbTypes } = usePokeStore();

	const [typesFilter, setTypesFilter] = useState("Ninguno");
    const [updatedCollection, setupdatedCollection] = useState(collection.collection_items)
	const [collectionDisplay, setCollectionDisplay] = useState(
		collection.collection_items
	);

	const setFilter = (value: string) => {
		setTypesFilter(value);
	};

	useEffect(() => {
		if (!collection || !collection.collection_items) return;
		setCollectionDisplay(collection.collection_items);

		const editedCollectionItems: CollectionItem[] = [];
		collection.collection_items.forEach((item) => {
			const editedTypes = setIdToType(item.types, dbTypes);
			editedCollectionItems.push({
				...item,
				types: editedTypes ? editedTypes : [],
			});
		});

		setCollectionDisplay(editedCollectionItems);
        setupdatedCollection(editedCollectionItems);
	}, [collection]);

	useEffect(() => {
		
		if (typesFilter === "Ninguno" || !collection) {
            setCollectionDisplay(collection.collection_items);
			return;
		}
		const newCollectionDisplay = updatedCollection.filter(
			(item) =>
				item.types.some(
                    (type) => type.id === types.find((type) => type.name === typesFilter)?.id
					//(type) => type.name.toLowerCase() == typesFilter.toLowerCase()
				) === true
		);
        console.log(newCollectionDisplay);
		setCollectionDisplay(newCollectionDisplay);
	}, [typesFilter]);

	return (
		<div className="container col-md-12 row">
			<div className="col-md-12">
				<div className="col-md-3 justify-content-center">
					<OrderBy
						text={"Tipo"}
						values={types.map((a) => a.name)}
						defaultValue={"Ninguno"}
						setFilter={setFilter}
					/>
				</div>
			</div>
			{!isLoading
				? collectionDisplay?.map((item, index) => (
						<div className="col-md-4 py-2" key={index}>
							<PokeCard
								name={item.name}
								types={item.types}
								caught_date={item.date_caught}
								isShiny={item.isShiny}
								showData={false}
								sprite={
									item.isShiny
										? item.sprites.front_shiny
										: item.sprites.front_default
								}
								id={index + 1}
								key={index + 1}
								isLoading={isLoading}
							/>
						</div>
				  ))
				: ""}
		</div>
	);
};
