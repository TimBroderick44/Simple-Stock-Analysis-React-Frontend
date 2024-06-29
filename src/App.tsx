import Navbar from './components/navbar/Navbar'
import Content from './components/content/Content'
import Flexbox from './containers/flexbox/Flexbox'

function App() {

  return (
    <>
    <Navbar />
    <Flexbox>
      <Content />
    </Flexbox>
    </>
  )
}

export default App