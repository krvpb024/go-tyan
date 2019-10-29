function inputValueHelper (type) {
  return function inputValueHelperWithType (host, {
    target: {
      value,
    } = {},
  }) {
    host.service.send({ type, data: value })
  }
}

export {
  inputValueHelper,
}
