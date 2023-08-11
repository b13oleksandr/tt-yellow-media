import type { Config } from 'tailwindcss'
const plugin = require('tailwindcss/plugin')

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        bg: '#1c1c1c',
        light: '#393939',
        dark: '#161616',
        accent: '#27ae91'
      }
    }
  },
  plugins: [
    plugin(function({ addBase, theme }: any) {
      addBase({
        'body': { background: theme('colors.bg') },
      })
    })
  ]
}