import './App.scss'
import {Navigation} from "./components/navigation/navigation.tsx";
import MainPage from "./pages/mainPage/mainPage.tsx";

function App() {
  return (
    <div>
      <Navigation/>
      <MainPage/>
    </div>
  )
}

export default App
