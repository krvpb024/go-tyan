function mutateByData (key) {
  return function mutateValueByKey (context, { data }) {
    return {
      [key]: data
    }
  }
}

export {
  mutateByData
}
