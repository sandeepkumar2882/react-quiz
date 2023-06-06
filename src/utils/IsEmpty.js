const IsEmpty = (value) => {
    return (value === undefined || value === null || (typeof value === 'object' && Object.keys(value).length === 0) || (typeof value === 'string' && value.trimEnd().length === 0))
    
}

export default IsEmpty


// const IsEmpty = (value) => 
//     value === undefined ||
//     value == null ||
//     (typeof value === 'object' && Object.keys(value).length === 0) ||
//     (typeof value === 'string' && value.trim().length === 0);

// export default IsEmpty;