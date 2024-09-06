import { useState } from "react";

export default function useButtonsFilter(buttons: {[key: string]: boolean}) {
    const [usedFilters, setUsedFilters] = useState(buttons);

    const handleFilterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const clickedFilter = (e.target as HTMLButtonElement).name;
        const filters = {...usedFilters}
        Object.keys(filters).map(filter => 
            filter === clickedFilter ? filters[filter] = true : filters[filter] = false
        )
        setUsedFilters(filters)
    }

    return {
        usedFilters,
        handleFilterClick
    }
}