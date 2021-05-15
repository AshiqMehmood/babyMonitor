import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar
,IonItem, IonThumbnail, IonImg, IonIcon, IonBadge } from '@ionic/react';
import { chatbubbleEllipsesOutline } from 'ionicons/icons';
import {useState, useEffect} from 'react';
import './Tab2.css';
//@ts-ignore
import io from 'socket.io-client';

const ENDPOINT =  "http://127.0.0.1:3000"; //change to server ip

const WrapNotification = () => (
  <div slot="end">
    <IonIcon 
    icon={chatbubbleEllipsesOutline} 
    size="large" 
    onClick={() => console.log('notifications panel..!')}>
  </IonIcon>
  <IonBadge color="primary">4</IonBadge>  

  </div>
)

const Tab2: React.FC = () => {
  const [goLive, setLive] = useState(false);
  const [response, setResponse] = useState(""); 
  const [error, setError] = useState(false); //error to load live 

  useEffect(() => {
    //code to fetch live from server
    if(goLive) {
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
  
    }
  },[]);

  return (
    <IonPage>
      <IonHeader>
      <IonToolbar color="primary">
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
        
        <video width="95%" height="60%" poster="assets/default.png" controls style={{margin:10}}>
       
        <source src="" type=""></source>
        Cannot connect to server
        </video>
            
      </IonContent>
    </IonPage>
  );
};

export default Tab2;

//<IonItem>
// <IonThumbnail slot="start" style={{width: '100%', height: '80%'}}>
//             <IonImg 
//                src={`data:image/jpeg;charset=utf-8;base64,${response}`}
//                style={{width: '100%'}} 
//                //onIonError={() => setError(true)}
//             />
//           </IonThumbnail>
//</IonItem>