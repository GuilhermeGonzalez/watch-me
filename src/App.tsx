// APP.TSX ==============================

import { SideBar } from './components/SideBar';
import { Content } from './components/Content';


import './styles/global.scss';
import { GenreProvider } from './hooks/useGenre';



export function App() {


  return (
    <GenreProvider>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <SideBar />
        <Content />
      </div>
    </GenreProvider>
  )
}