import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Link
} from "react-router-dom";
import {
  Checkbox,
  DefaultButton,
  Pivot,
  PivotItem,
  PrimaryButton,
  Stack,
  Toggle
} from '@fluentui/react'

import Login from './pages/user/login/login';
import Topbar from './components/topbar/topbar';
import Register from './pages/user/register/register';
import Profile from './pages/user/profile/profile';
import Recovery from './pages/user/recovery/recovery';
import HomePage from './pages/homepage/homepage';
import NotFound from './pages/errorPages/notFound';
import Artist from './pages/collection/artist/artist';
import Player from './components/player/player';


function App() {

  return (
    <div className="App">
      <Topbar />
      <Player></Player>
      <header className="App-header">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="recovery" element={<Recovery />} />
          <Route path="changePassword" element={<Recovery onlyChangePassword={true} />} />
          <Route path="artist" element={<Artist />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <Stack tokens={{ childrenGap: 8, maxWidth: 300 }}>
          <Pivot>
            <PivotItem headerText="Home" />
            <PivotItem headerText="Pages" />
            <PivotItem headerText="Documents" />
            <PivotItem headerText="Activity" />
          </Pivot>
          <Stack horizontal gap={8}>
            <DefaultButton text="DefaultButton" />
            <PrimaryButton text="PrimaryButton" />
          </Stack>
          <Toggle label="Enabled" />
          <Toggle label="Disabled" disabled={true} />
          <Checkbox label="Checkbox" />
          <Checkbox checked label="Checkbox Checked" />
        </Stack> */}
      </header>
    </div>
  );
}


function About() {
  return (
    <>
      <main>
        <h2>Who are we?</h2>
        <p>
          That feels like an existential question, don't you
          think?
        </p>
      </main>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </>
  );
}

export default App;
