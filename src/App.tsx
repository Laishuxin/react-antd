import Button, { ButtonSize, ButtonType } from './components/Button/button'
function App() {
  return (
    <div className='App'>
      <h1>app</h1>
      <h2>button</h2>
      <div>
        <div className='btns'>
          <h3>basic buttons</h3>
          <Button
            onClick={() => {
              console.log('click...')
            }}
          >
            basic button
          </Button>
          <Button
            onClick={e => {
              e.preventDefault()
              console.log('anchor click...')
            }}
            btnType={ButtonType.Link}
            href='https://www.baidu.com'
          >
            link button with href
          </Button>
          <Button btnType={ButtonType.Primary}>primary button</Button>
          <Button btnType={ButtonType.Danger}>danger button</Button>
          <Button btnType={ButtonType.Default}>default button</Button>
          <Button disabled>disabled button</Button>
          <Button btnType={ButtonType.Link} disabled>
            disabled link button
          </Button>
          <Button btnType={ButtonType.Link} href='#' disabled>
            disabled link anchor button
          </Button>
        </div>
        <div className='btns'>
          <h3>size buttons</h3>
          <Button size={ButtonSize.Large}>large button</Button>
          <Button size={ButtonSize.Small}>small button</Button>

          <h3>type buttons</h3>
          <Button btnType={ButtonType.Primary}>primary</Button>
          <Button btnType={ButtonType.Danger}>danger</Button>
          <Button btnType={ButtonType.Link}>link</Button>
          <Button btnType={ButtonType.Default}>default</Button>
        </div>
      </div>
    </div>
  )
}

export default App
