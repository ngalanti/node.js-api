import {Tasks} from './components/Tasks'
import {Task} from './components/Task'
import {Routes,Route} from 'react-router'
export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Tasks/>}/>
      <Route path="/task/:id" element = {<Task/>}/>

    </Routes>
  );
}

export default App;
