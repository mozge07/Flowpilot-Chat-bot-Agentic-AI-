
import MainContent from './components/MainContent.jsx';
import Sidebar from './components/Sidebar.jsx';
import './App.css';

function App() {
  return(
    <>
    <div className='app-container'>
      <Sidebar />
      <MainContent />
    </div>
    </>
  )
}

export default App;