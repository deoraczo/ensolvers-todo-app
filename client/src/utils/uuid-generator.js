import { v4 as uuidV4 } from 'uuid'

const uuidGenerator = () => {
  return uuidV4()
}

export {
  uuidGenerator
}