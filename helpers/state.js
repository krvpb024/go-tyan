function mutateByData (key) {
  return function mutateValueByKey (context, { data }) {
    return {
      [key]: data
    }
  }
}

function checkDataIs (value) {
  return function guardHandler (context, { data }) {
    return data === value
  }
}

export {
  mutateByData,
  checkDataIs
}
