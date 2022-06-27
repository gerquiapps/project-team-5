import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
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


function DesignPage() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Stack tokens={{ childrenGap: 8, maxWidth: 300 }}>
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
        </Stack>
      </header>
    </div>
  );
}

export default DesignPage;
