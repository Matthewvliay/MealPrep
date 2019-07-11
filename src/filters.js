const getFilters = () => filters

const filters = {
    searchText: ''
}


const setFilters = ({ searchText }) => {
    if (typeof searchText === 'string') {
        filters.searchText = searchText
    }
}

export { getFilters, setFilters }