import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Divider } from './Divider'

describe('Divider', () => {
  it('should render default text', () => {
    render(<Divider />)
    expect(screen.getByText('ou')).toBeInTheDocument()
  })

  it('should render custom text', () => {
    render(<Divider>ou continue com</Divider>)
    expect(screen.getByText('ou continue com')).toBeInTheDocument()
  })
})
