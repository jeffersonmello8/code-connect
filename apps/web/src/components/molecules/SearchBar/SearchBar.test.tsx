import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { SearchBar } from './SearchBar'

describe('SearchBar', () => {
  it('should submit search on form submit', () => {
    const onSubmit = vi.fn()

    const { container } = render(
      <SearchBar value="react" onChange={vi.fn()} onSubmit={onSubmit} />,
    )

    fireEvent.submit(container.querySelector('form')!)
    expect(onSubmit).toHaveBeenCalledOnce()
  })
})
