import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Label } from './Label'

describe('Label', () => {
  it('should associate htmlFor with label text', () => {
    render(<Label htmlFor="email">E-mail</Label>)
    const label = screen.getByText('E-mail')
    expect(label).toHaveAttribute('for', 'email')
  })
})
