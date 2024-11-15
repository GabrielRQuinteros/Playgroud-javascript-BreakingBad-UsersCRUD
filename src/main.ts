import './style.css'

import { BreakingBadApp } from './breaking-bad/breaking-bad-app';
import { UsersApp } from './users-app/users-app';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Users Application</h1>
    <div id="appBody" class="card"></div>
    <div id="nextButtonDiv"></div>
  </div>
`;
//  <!--  <h1>Breaking Bad App</h1> -->
const appContainer: HTMLDivElement = document.querySelector("#appBody")!;
//BreakingBadApp(appContainer);
UsersApp( appContainer );