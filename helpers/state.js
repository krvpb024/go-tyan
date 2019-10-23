function mutateByData (key) {
  return function mutateValueByKey (context, { data }) {
    console.log(data)
    return {
      [key]: data
    }
  }
}

export {
  mutateByData
}
