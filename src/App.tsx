import {Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, videocamOutline, appsOutline, handLeftOutline } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import Connect from './pages/Connect';
import NotifyList from './pages/NotifyList';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { StateProvider } from './ContextStore';

const App: React.FC = () => {

  const initialState = {
    data: { ipAddress: '192.128.3.3'}
  };

  const reducer = (state:any, action:any) => {
    switch(action.type) {
      case 'changeData':
        return {
          ...state,
          data: action.payload
        };
      default:
        return state;  
    }
  }

  return (
  <IonApp>
    <StateProvider initialState={initialState} reducer={reducer}>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet> 
        <Route exact path="/connect">
            <Connect />
        </Route>
          <Route exact path="/tab1">
            <Tab1 />
          </Route>
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3"> 
            <Tab3 />
          </Route>
          <Route exact path="/">
            <Redirect to="/connect" />
          </Route>
          <Route exact path="/notifications">
            <NotifyList />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={appsOutline} size="large" color="primary"/>
            
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={videocamOutline} size="large" color="primary"/>
           
          </IonTabButton>
          
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    </StateProvider>
  </IonApp>
)};

export default App;
