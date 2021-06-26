import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon,
  IonGrid, IonRow, IonCol,IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonItem,
  IonToast, IonBadge, IonRefresher, IonRefresherContent, IonAlert } from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { chevronDownCircleOutline } from 'ionicons/icons';  
//import ExploreContainer from '../components/ExploreContainer';
import Actions from './Actions';
import './Tab1.css';
import { chatbubbleEllipsesOutline, happy, sad, waterOutline, arrowBackOutline, closeOutline } from 'ionicons/icons';
import { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../ContextStore'; 
import axios from 'axios';
import notificationsList from '../components/notificationList';

// const usePrevious = (value:any) => {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// }

const Tab1: React.FC = () => {
  const [babyStatus, setStatus] = useState({ status: 'sleeping', fill: 'green'});
  const [apiError, setError] = useState(false); 
  const [cryDetected, setCry] = useState(false);
  //if baby is awake, status: 'awake', fill:'red'
  const history = useHistory();
  //@ts-ignore
  const [{data, sensorValues, notifications, notifCounter, isConnected}, dispatch] = useStateValue();
  console.log(notifCounter);
  //constants
  const T_LOW = 15; //temp threshold
  const T_HIGH = 29;
  const H_LOW = 30; //humidity threshold
  const H_HIGH = 75;
  const M_THRESHOLD = 500; //moisture threshold

  //functions
  //const prevCryState = usePrevious(seenMessage);

  async function doRefresh(event: CustomEvent<RefresherEventDetail>) {
    //console.log('Begin async operation');
    window.location.reload();
    
  }
  
  const updateSensorNotify = async (code:string) => {
    await dispatch({
      type: 'updateNotification',
      payload: notificationsList.filter((t) => t.code === code)[0]
    });
    await dispatch({
      type: 'setNotifyCounter',
      payload: 1
    })
  }
  const handleNotifications = (response:any) => {
    if(response.cry === 1) {
      updateSensorNotify('BABY_AWAKE');
      setCry(true);
      setStatus({ status: 'awake', fill: 'red'}); 
    }
    else if(response.temp >= T_HIGH) {
      updateSensorNotify('T_HIGH');
    }
    else if(response.temp <= T_LOW) {
      updateSensorNotify('T_LOW');
    }
    else if(response.moisture <= M_THRESHOLD) {
      updateSensorNotify('M_THRESHOLD');
    }
    else if(response.hum >= H_HIGH) {
      updateSensorNotify('H_HIGH');
    }
    else if(response.hum <= H_LOW) {
      updateSensorNotify('H_LOW');
    }

  }

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
        await dispatch({
          type: 'updateSensorReadings',
          payload: res
        }); 
        await dispatch({
          type: 'setConnected',
          payload: true
        })
       
       await handleNotifications(res);
      }
    } catch (err) {
        setError(true);
        dispatch({
          type: 'setConnected',
          payload: false
        })
        console.log(err);
        setTimeout(() => {
          routeChange();
        }, 2000) //redirect to connecting page
    }
  }

//on mount
  useEffect(() => {
    const PERIOD = 10; //fetch data at each 10s interval
    const counterInterval = setInterval(() => {
      fetchSensorData();
    }, PERIOD * 1000)
    //console.log('fetched...>>>');
    
    return () => clearInterval(counterInterval);
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
          <IonTitle size="small">Dashboard</IonTitle>
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
                                    <li><b>Location:</b>&nbsp;<span> 98 Manchester, US </span></li>
                                  
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
                              <IonCard 
                               color={sensorValues.temp > T_HIGH || sensorValues.temp < T_LOW ? 'danger' : 'success'}
                               
                               >
                              <IonCardHeader>
                                <IonCardSubtitle>Temp</IonCardSubtitle>
                                <IonCardTitle style={{fontSize: '1.85rem', textAlign: 'center'}}>{sensorValues.temp}&#176;c</IonCardTitle>
                              
                              </IonCardHeader>
                              </IonCard>
                          </IonCol>
                          <IonCol size="6">
                              <IonCard 
                                color={sensorValues.hum > H_HIGH || sensorValues.hum < H_LOW ? 'danger' : 'success'}
                                
                                >
                              <IonCardHeader>
                                <IonCardSubtitle>Humidity</IonCardSubtitle>
                                <IonCardTitle style={{fontSize: '1.85rem', textAlign: 'center'}}>{sensorValues.hum}&#37;</IonCardTitle>
                              
                              </IonCardHeader>
                              </IonCard>
                          </IonCol>
                          <IonCol size="12">
                              <IonCard color={sensorValues.moisture < M_THRESHOLD ? 'danger' : 'success'}>
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
                                  <span style={{ fontSize: '1.2rem', margin: '22px'}}> { Math.round((1023 - sensorValues.moisture)/1023 * 100) }% </span>
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
         <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
          <IonRefresherContent
              pullingIcon={chevronDownCircleOutline}
              pullingText="Pull to refresh"
              refreshingSpinner="circles"
              refreshingText="Refreshing...">
          </IonRefresherContent>
      </IonRefresher>
         <IonToast
                    isOpen={isConnected}
                    //onDidDismiss={() => setShowToast(false)}
                    message='Connection Successfull !'
                    duration={2000}
                />
          <IonToast
                    isOpen={!isConnected}
                    //onDidDismiss={() => setShowToast(false)}
                    message='No Connection ! Please try Again'
                    duration={2000}
                />
           <IonToast
                    isOpen={cryDetected}
                    //onDidDismiss={() => setShowToast(false)}
                    message='Cry Detected. Baby is awake !'
                    duration={5000}
                    position="top"
             />      
          
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
