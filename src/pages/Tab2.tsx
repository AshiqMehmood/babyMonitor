import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar
,IonItem, IonThumbnail, IonImg, IonIcon, IonBadge,  IonRefresher, IonRefresherContent } from '@ionic/react';
import { chatbubbleEllipsesOutline, closeOutline } from 'ionicons/icons';
import {useState, useEffect} from 'react';
import './Tab2.css';
import {useStateValue} from '../ContextStore';
import { chevronDownCircleOutline } from 'ionicons/icons';  
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Tab2: React.FC = () => {
  const history = useHistory();
  const [response, setResponse] = useState(false); 
  //@ts-ignore
  const [{data, notifCounter}, dispatch] = useStateValue();

  //functions
  const routeChange = () => {
    let path = '/connect';
    history.push(path);
  }


  const verifyBackend = async (ip:any) => {
    try {
        const ENDPOINT = `http://${ip}:5000/`;
    
        const {data: res} = await axios.get(ENDPOINT);
        //console.log(res);
        if (res.message === 'connected') {
        setResponse(true);
        dispatch({
            type: 'setConnected',
            payload: true
        }); 
        }  
    } catch (err) {
        setResponse(false);
        console.log(err); 
        routeChange();     
    }
}

  useEffect(() => {  
      verifyBackend(data.ipAddress);
      const videoFrame  = document.getElementById('myframe');
      if(videoFrame) {
        videoFrame.setAttribute('src',`http://${data.ipAddress}:8081` );
      }
  },[]);

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar color="primary">
            <IonItem  lines="none"  slot="start" color="primary" onClick={() => routeChange()}>
                <IonIcon 
                 icon={closeOutline} 
                size="large" 
                >
                </IonIcon>
            </IonItem>
          <IonTitle size="small">Live Feed</IonTitle>
          <IonItem  lines="none" slot="end"  color="primary" routerLink="/notifications">
            <IonBadge color="danger">{notifCounter}</IonBadge>  
              <IonIcon 
              icon={chatbubbleEllipsesOutline} 
              size="large" 
              >
            </IonIcon>
        </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
              
                <iframe 
                  id="myframe"
                  allow="camera; microphone; fullscreen; display-capture; autoplay"  
                  style={{ minHeight: "100%", width: "100%", border: "none"}}>
                </iframe> 
                
      </IonContent>
      
    </IonPage>
  );
};

export default Tab2;



        
