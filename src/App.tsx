
import React from 'react';
import {Route, Routes} from "react-router-dom";
import {About} from "./pages/About/About";
import {Pathfinding} from "./pages/Pathfinding/Pathfinding";
import {Sorting} from "./pages/Sorting/Sorting";
import {Header} from "./shared/Header/Header";


const App = () => {

    return (
      <div className="globalContainer"  id="page-wrap">
          <Header/>
          <div className="container" >
              <Routes>
                  <Route path="/" element={<About/>}/>
                  <Route path="/sorting" element={<Sorting/>}/>
                  <Route path="/pathfinding" element={<Pathfinding/>}/>
              </Routes>
          </div>
      </div>
    );
};

export default App;