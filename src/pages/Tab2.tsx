import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar
,IonItem, IonThumbnail, IonImg, IonIcon, IonBadge } from '@ionic/react';
import { chatbubbleEllipsesOutline, closeOutline } from 'ionicons/icons';
import {useState, useEffect} from 'react';
import './Tab2.css';
import {useStateValue} from '../ContextStore';

const WrapNotification = () => (
  <IonItem  lines="none"  slot="end" color="primary" routerLink="/notifications">
   <IonBadge color="danger">4</IonBadge>  
    <IonIcon 
    icon={chatbubbleEllipsesOutline} 
    size="large" 
    >
   </IonIcon>
  </IonItem>
)

const Tab2: React.FC = () => {
  const [response, setResponse] = useState(""); 
  //@ts-ignore
  const [{data}, dispatch] = useStateValue();

  useEffect(() => {

    const videoFrame  = document.getElementById('myframe');
    if(videoFrame) {
      videoFrame.setAttribute('src',`http://${data.ipAddress}:8081` );
    }

  },[]);

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar color="primary">
            <IonItem  lines="none"  slot="start" color="primary">
                <IonIcon 
                 icon={closeOutline} 
                size="large" 
                >
                </IonIcon>
            </IonItem>
          <IonTitle size="small">Baby Live</IonTitle>
          <WrapNotification />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Live</IonTitle>
          </IonToolbar>
        </IonHeader>
            
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



        
