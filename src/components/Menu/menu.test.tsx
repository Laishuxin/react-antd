import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
} from '@testing-library/react'
import { MenuProps, Menu } from './menu'
import { MenuItem } from '.'

describe('test Menu and MenuItem components', () => {
  let wrapper: RenderResult
  let menuElement: HTMLElement
  let disabledElement: HTMLElement
  let activeElement: HTMLElement
  let normalElement: HTMLElement
  function generateElement(props: MenuProps) {
    return render(
      <Menu data-testid='menu' {...props}>
        <MenuItem data-testid='menu-item-default' index={0}>
          default active
        </MenuItem>
        <MenuItem data-testid='menu-item-normal1' index={1}>
          normal
        </MenuItem>
        <MenuItem data-testid='menu-item-disabled' index={2} disabled>
          disabled
        </MenuItem>
        <MenuItem index={3} data-testid='menu-item-normal2'>
          normal2
        </MenuItem>
      </Menu>,
    )
  }

  let defaultProps: MenuProps = {
    defaultIndex: 0,
    mode: 'horizontal',
    onSelect: jest.fn(),
    className: 'a-menu',
  }

  let verticalProps: MenuProps = {
    ...defaultProps,
    mode: 'vertical',
  }

  beforeEach(() => {
    defaultProps = {
      defaultIndex: 0,
      mode: 'horizontal',
      onSelect: jest.fn(),
      className: 'a-menu',
    }
    wrapper = generateElement(defaultProps)
    menuElement = wrapper.getByTestId('menu')
    disabledElement = wrapper.getByTestId('menu-item-disabled')
    activeElement = wrapper.getByTestId('menu-item-default')
    normalElement = wrapper.getByTestId('menu-item-normal1')
  })

  it('should render the correct components based on default props', () => {
    expect(menuElement).toBeInTheDocument()
    expect(menuElement).toHaveClass(`a-menu antd-menu antd-menu-horizontal`)
    expect(menuElement.getElementsByTagName('li').length).toEqual(4)
    expect(normalElement).toHaveClass(`antd-menu-item`)
    expect(disabledElement).toHaveClass(`antd-menu-item is-disabled`)
    expect(activeElement).toHaveClass(`antd-menu-item is-active`)
  })
  it('should change active when click item and call the right callback', () => {
    expect(normalElement).not.toHaveClass(`is-active`)
    fireEvent.click(normalElement)
    expect(normalElement).toHaveClass(`is-active antd-menu-item`)
    expect(defaultProps.onSelect).toHaveBeenLastCalledWith(1)

    fireEvent.click(disabledElement)
    expect(disabledElement).toHaveClass(`antd-menu-item is-disabled`)
    expect(disabledElement).not.toHaveClass(`is-active`)
    expect(defaultProps.onSelect).toBeCalledTimes(1)
  })
  it('should render the correct component passing different modes', () => {
    cleanup()
    wrapper = generateElement(verticalProps)
    menuElement = wrapper.getByTestId('menu')
    expect(menuElement).toHaveClass(`antd-menu-vertical`)
  })
})
