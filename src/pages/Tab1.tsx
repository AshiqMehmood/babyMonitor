import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonText, IonIcon,
  IonGrid, IonRow, IonCol,IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem,
   IonToggle, IonList, IonLabel, IonBadge } from '@ionic/react';
//import ExploreContainer from '../components/ExploreContainer';
import Actions from './Actions';
import './Tab1.css';
import { chatbubbleEllipsesOutline, happy, sad, waterOutline, arrowBackOutline, } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../ContextStore'; 
import axios from 'axios';

const WrapNotification = (history:any) => (
  <IonItem  lines="none" slot="end"  color="primary" routerLink="/notifications">
    <IonBadge color="danger" >4</IonBadge>  
      <IonIcon 
      icon={chatbubbleEllipsesOutline} 
      size="large" 
      >
    </IonIcon>
  </IonItem>
)

const Tab1: React.FC = () => {
  const [babyStatus, setStatus] = useState({ status: 'sleeping', fill: 'green'});
  const [apiError, setError] = useState(false); 
  //if baby is awake, status: 'awake', fill:'red'
  //page transition
  const history = useHistory();
  //@ts-ignore
  const [{data, sensorValues}, dispatch] = useStateValue();

  //functions

  const handleMoistureValues = (val:any) => {
    if(val >= 900 && val <= 1023) {
      return 'Low';
    }
    else if (val >= 700 && val <= 900) {
      return 'Medium';
    }
    else if (val >= 300 && val <= 700) {
      return 'High';
    }
    else if (val < 300) {
      return 'Critical';
    }
  }

  const routeChange = () => {
    let path = '/connect';
    history.push(path);
  }

  const fetchSensorData = async () => {
    try {
      const ENDPOINT = `http://${data.ipAddress}:5000/sensors`;
     
      const {data: res} = await axios.get(ENDPOINT);
      //console.log(res);
      if (res) {
        //console.log('OK');
        setError(false);
      }
      await dispatch({
        type: 'updateSensorReadings',
        payload: res
      });  
    } catch (err) {
      setError(true);
      console.log(err);
      routeChange(); //redirect to connecting page
    }
  }

//on mount
  useEffect(() => {
    const PERIOD = 60; //fetch data at each 10s interval
    setInterval(() => {
      fetchSensorData();
    }, PERIOD * 1000)
    console.log('fetched...>>>');

  },[]);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
           <IonItem  lines="none"  slot="start" color="primary">
                <IonIcon 
                 icon={arrowBackOutline} 
                 size="large" 
                >
                </IonIcon>
            </IonItem>
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
                                    <li><b>Location:</b>&nbsp;<span> 211 Manchester, US </span></li>
                                  
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
                              <IonCard color={sensorValues.temp > 29 || sensorValues.temp < 10 ? 'danger' : 'success'}>
                              <IonCardHeader>
                                <IonCardSubtitle>Temp</IonCardSubtitle>
                                <IonCardTitle style={{fontSize: '1.85rem'}}>{sensorValues.temp}&#176;c</IonCardTitle>
                              
                              </IonCardHeader>
                              </IonCard>
                          </IonCol>
                          <IonCol size="6">
                              <IonCard color={sensorValues.hum > 70 || sensorValues.hum < 30 ? 'danger' : 'success'}>
                              <IonCardHeader>
                                <IonCardSubtitle>Humidity</IonCardSubtitle>
                                <IonCardTitle style={{fontSize: '1.85rem'}}>{sensorValues.hum}&#37;</IonCardTitle>
                              
                              </IonCardHeader>
                              </IonCard>
                          </IonCol>
                          <IonCol size="12">
                              <IonCard color={sensorValues.moisture < 500 ? 'danger' : 'success'}>
                              <IonCardHeader>
                                <IonCardSubtitle>
                                 <IonRow>

                                  <IonCol size="10">
                                        Moisture
                                    </IonCol>
                                    <IonCol size="2">
                                        
                                        <IonIcon 
                                          icon={waterOutline} 
                                          size="large"
                                          >
                                        </IonIcon>
                                      
                                    </IonCol>
                                 </IonRow>
                                  
                                  </IonCardSubtitle> 
                                <IonCardTitle style={{fontSize: '1.85rem'}}>
                                  {handleMoistureValues(sensorValues.moisture)}
                                </IonCardTitle>
                                
                              </IonCardHeader>
                             
                              </IonCard>
                          </IonCol>
            </IonRow>
            <IonTitle size="small" color="medium" style={{marginTop: 10, marginBottom: 10}}>Take Action</IonTitle>
            <IonRow>
                <Actions />
            </IonRow>


         </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
