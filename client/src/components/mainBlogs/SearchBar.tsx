import { useState } from 'react'
import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input'

const SearchBar = () => {
    const [search, setSearch] = useState("")
    const config = [
        "Artificial Intelligence",
        "Cloud Computing",
        "Machine Learning!",
    ]

    const onSearch = () => {

    }

    return (
        <div>
            <PlaceholdersAndVanishInput
                placeholders={config}
                onChange={e => setSearch(e.target.value)}
                onSubmit={onSearch} />
        </div>
    )
}

export default SearchBar
