import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonIcon,
  IonGrid, IonRow, IonCol,IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem,
   IonToggle, IonList, IonLabel, IonBadge } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import './Tab1.css';
import { chatbubbleEllipsesOutline, happy, sad } from 'ionicons/icons';
import { useState } from 'react';

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

const Tab1: React.FC = () => {
  const [babyStatus, setStatus] = useState({ status: 'sleeping', fill: 'green'});
  //if baby is awake, status: 'awake', fill:'red'
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle size="small">Baby Monitor</IonTitle>
          <WrapNotification />
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid>
            <IonRow>
               <IonCard>
                  <IonCardHeader>
                    <IonCardSubtitle>1 year 2 months</IonCardSubtitle>
                    <IonCardTitle>Amaria Benedict</IonCardTitle>
                   
                  </IonCardHeader>

                  <IonCardContent>
                  <IonGrid>
                        <IonRow>
                            <IonCol size="8">
                              
                                    <li><b>Status:</b>&nbsp;<span style={{color: babyStatus.fill}}>{babyStatus.status}</span></li>
                                    <li><b>Location:</b>&nbsp;<span> Jocomia 213, Slovakia </span></li>
                                  
                              </IonCol>
                            
                              <IonCol size="4">
                              <IonItem>
                               { babyStatus.status === 'sleeping' ?  <IonIcon slot="end" icon={happy} color="success" size="large"></IonIcon> 
                                :  <IonIcon slot="end" icon={sad} color="danger" size="large"></IonIcon>}
                                </IonItem>
                              </IonCol>
                        
                        </IonRow>
                        

                  </IonGrid>                                   
                 </IonCardContent>
             </IonCard>
            </IonRow>
            <IonTitle size="small" color="medium" style={{marginTop: 8, marginBottom: 10}}>Sensor Parameters</IonTitle>
            <IonRow>
                
                          <IonCol size="6">
                              <IonCard color="success">
                              <IonCardHeader>
                                <IonCardSubtitle>Temp</IonCardSubtitle>
                                <IonCardTitle style={{fontSize: '1.85rem'}}>27.5&#176;c</IonCardTitle>
                              
                              </IonCardHeader>
                              </IonCard>
                          </IonCol>
                          <IonCol size="6">
                              <IonCard color="danger">
                              <IonCardHeader>
                                <IonCardSubtitle>Humidity</IonCardSubtitle>
                                <IonCardTitle style={{fontSize: '1.85rem'}}>89&#37;</IonCardTitle>
                              
                              </IonCardHeader>
                              </IonCard>
                          </IonCol>
            </IonRow>
            <IonTitle size="small" color="medium" style={{marginTop: 10, marginBottom: 10}}>Take Action</IonTitle>
            <IonRow>
            <IonList>
                <IonItem>
                  <IonLabel>Play Lullaby</IonLabel>
                  <IonToggle color="primary" value="lullaby" checked={true}/>
                </IonItem>

                <IonItem>
                  <IonLabel>Swing Cradle</IonLabel>
                  <IonToggle color="primary" value="swing" checked={false}/>
                </IonItem>
                <IonItem>
                  <IonLabel>Light</IonLabel>
                  <IonToggle color="primary" value="light" checked={false}/>
                </IonItem>
          
                <IonItem>
                  <IonLabel>Fan</IonLabel>
                  <IonToggle color="primary" value="fan" checked={true}/>
                </IonItem>
                <IonItem>
                  <IonLabel></IonLabel>         
                </IonItem>
              </IonList>
            </IonRow>


         </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
