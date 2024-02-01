import { useThemeSystem } from '../../theme-system'

describe('useThemeSystem', () => {
  it(`instance should be defined`, () => {
    const instance = useThemeSystem('bwj', 'hsl')
    expect(instance).toBeDefined()
  })
})
