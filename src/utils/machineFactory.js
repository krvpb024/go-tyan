function mutateByDataValue (key) {
  return function mutateValueByKeyWithValue (context, { data }) {
    return {
      [key]: data,
    }
  }
}

function mutateByDataObjectValue (key) {
  return function mutateValueByKeyWithObjectValue (context, { data }) {
    return {
      [key]: data[key],
    }
  }
}

function checkDataIs (value) {
  return function guardHandler (context, { data }) {
    return data === value
  }
}

export {
  mutateByDataValue,
  mutateByDataObjectValue,
  checkDataIs,
}
