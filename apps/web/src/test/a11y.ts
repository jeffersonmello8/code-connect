import { configureAxe } from 'vitest-axe'

/**
 * axe configurado para o nível AA do WCAG (2.0 / 2.1 / 2.2).
 * Usado nos testes automatizados de acessibilidade.
 */
export const axe = configureAxe({
  runOnly: {
    type: 'tag',
    values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'],
  },
})
