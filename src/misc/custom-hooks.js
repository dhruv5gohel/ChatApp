import { useEffect, useState } from "react"

export const useMediaQuery = (query) => {
    const [matches, setMatches] = useState(
        () => window.matchMedia(query).matches
    )

    useEffect(()=>{
        const tempQuery = window.matchMedia(query);
        setMatches(tempQuery.matches);

        const listener = ev => setMatches(ev.matches);

        tempQuery.addEventListener("change", listener)

        return ()=>{
            tempQuery.removeEventListener("change", listener);
        }
    },[query]);

    return matches;
}