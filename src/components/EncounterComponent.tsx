import { useStore } from "react-redux"
import { useEncounterStore } from "../hooks/useEncounterStore";

export const EncounterComponent = () => {

    const { isCaptured, pokemon } = useEncounterStore();

  return (
    <div className="container">
        <div className="row justify-content-md-center h3">{pokemon.name}</div>
        <div className="row justify-content-md-center">
            <img src={pokemon.sprites.front_default} style={{objectFit:"contain", maxWidth:"100%", height: "20em"}}/>
        </div>
    </div>
  )
}
