import { useCategories } from '../../categories'

describe('useCategories', () => {
  it(`todo`, () => {
    const instance = useCategories()

    expect(instance).toBeDefined()
  })
})
