const isEmpty = (value) =>{
	const ret = value === undefined ||
	value === null ||
	(typeof value === 'object' && Object.keys(value).length === 0) ||
	(typeof value === 'string' && value.trim().length === 0)
	return(
		ret
	)
}

export default isEmpty;