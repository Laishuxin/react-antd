import { render, fireEvent, RenderResult } from '@testing-library/react'
import Button, { ButtonProps } from './button'

describe('test Button component.', () => {
  let defaultProps: ButtonProps
  let wrapper: RenderResult
  let element: HTMLElement

  beforeEach(() => {
    defaultProps = {
      onClick: jest.fn(),
      btnType: 'default',
    }
  })

  it('should render the correct default button', () => {
    wrapper = render(<Button>btn</Button>)
    element = wrapper.getByText('btn')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveTextContent('btn')
  })

  it('should render the correct component based on different props', () => {
    wrapper = render(
      <Button {...defaultProps} data-testid='btn1'>
        btn
      </Button>,
    )
    element = wrapper.getByTestId('btn1')
    expect(element).toHaveClass('btn btn-default')

    wrapper = render(
      <Button {...{ btnType: 'primary' }} data-testid='btn2'>
        btn
      </Button>,
    )
    element = wrapper.getByTestId('btn2')
    expect(element).toHaveClass('btn btn-primary')

    wrapper = render(
      <Button {...{ btnType: 'danger' }} data-testid='btn3'>
        btn
      </Button>,
    )
    element = wrapper.getByTestId('btn3')
    expect(element).toHaveClass('btn btn-danger')

    wrapper = render(
      <Button {...{ btnType: 'link' }} data-testid='btn4'>
        btn
      </Button>,
    )
    element = wrapper.getByTestId('btn4')
    expect(element).toHaveClass('btn btn-link')

    wrapper = render(
      <Button {...{ btnType: 'primary', size: 'lg' }} data-testid='btn5'>
        btn
      </Button>,
    )
    element = wrapper.getByTestId('btn5')
    expect(element).toHaveClass('btn btn-primary btn-lg')
  })

  it('should render the correct element when pass custom props', () => {})

  it('should render a link when btnType equals link and href is provided', () => {
    wrapper = render(
      <Button data-testid='btn1' {...defaultProps} btnType='link' href='#'>
        btn
      </Button>,
    )
    element = wrapper.getByTestId('btn1')
    expect(element.tagName).toEqual('A')
    expect(element).toHaveAttribute('href')
    expect(element).toHaveClass('btn btn-link')
  })

  it('should render disabled button when disabled set to true', () => {
    const fn1 = jest.fn()
    wrapper = render(
      <Button {...defaultProps} disabled onClick={fn1} data-testid='btn6'>
        btn
      </Button>,
    )
    element = wrapper.getByTestId('btn6')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element).toHaveAttribute('disabled')
    fireEvent.click(element)
    expect(fn1).not.toHaveBeenCalled()

    wrapper = render(
      <Button
        data-testid='btn2'
        {...defaultProps}
        btnType='link'
        href='#'
        onClick={fn1}
        disabled
      >
        btn
      </Button>,
    )
    element = wrapper.getByTestId('btn2')
    expect(element).toHaveClass('btn btn-link disabled')
    expect(fn1).not.toHaveBeenCalled()
  })

  it('should fire events', () => {
    wrapper = render(<Button {...defaultProps}>btn</Button>)
    element = wrapper.getByText('btn')
    fireEvent.click(element)
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
})
