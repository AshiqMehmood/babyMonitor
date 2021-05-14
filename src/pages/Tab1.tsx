import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, 
  IonItem, IonThumbnail, IonImg, IonLabel } from '@ionic/react';
import {useState, useEffect} from 'react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
//@ts-ignore
import io from 'socket.io-client';


const ENDPOINT =  "http://192.168.225.131:3000";

const Tab1: React.FC = () => {
  const [response, setResponse] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const socket = io(ENDPOINT, {
      transports: ['websocket'],
      jsonp: false,
    });
    //@ts-ignore
    socket.on("FromAPI", image => {
      setResponse(image);
      //console.log(image);  
    //   const imgTag = document.getElementById('image');
    //  if(imgTag) 
     //@ts-ignore
    //  imgTag.src = `data:image/jpeg;charset=utf-8;base64,${image}`
    });

  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Live</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Live</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonText color="secondary" >
          <h3>You are now watching Live</h3>
        </IonText>
        <IonItem>
          <IonThumbnail slot="start" style={{width: '100%', height: '80%'}}>
            <IonImg 
               src={`data:image/jpeg;charset=utf-8;base64,${response}`}
               style={{width: '100%'}} 
               //onIonError={() => setError(true)}
            />
          </IonThumbnail>
        </IonItem>     
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
