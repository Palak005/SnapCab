export const SuggestionContainer = ({suggestions, set, setSuggest})=>{
    return <div className="absolute top-full left-0 w-full bg-white border rounded-xl shadow z-50 mt-1 max-h-60 overflow-y-auto">
        {suggestions.map(
            (suggestion) =>{
            if (suggestion.type === "CITY") return null;
            return (
                <div
                key={suggestion.eLoc}
                className="p-3 hover:bg-gray-100 cursor-pointer rounded-lg"
                onClick={() =>{ 
                    set(suggestion.placeAddress)
                    setSuggest([]);
                }}
                >
                {suggestion.placeAddress}
                </div>
            )
        })}
    </div>
}