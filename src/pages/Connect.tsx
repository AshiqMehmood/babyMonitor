import React, {useEffect, useState} from 'react';
import { IonContent, IonPage, IonText, IonButton, IonInput, 
    IonItem, IonToast, IonRow, IonCol, IonGrid, IonSpinner} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../ContextStore'; 
import axios from 'axios';
import baby from '../eve.png'
import "./Connect.css"

const Connect:React.FC = () => {
    const history = useHistory();
    
    //const [text, setText] = useState<string>('');
    //@ts-ignore
    const [{data, isConnected}, dispatch] = useStateValue(); //data has ip address
    //using toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage,  setMessage] = useState('Error. Please Try Again');
    const [isLoading, setLoading] = useState(false);

    const routeChange = () => {
        let path = '/tab1'; 
        history.push(path);
    }
    const validateIPaddress = (ipaddress:any) => { 
        
     if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
      {
        setLoading(true);
        return true
      }
    console.log('invalid format'); 
    setLoading(false); 
    return false
    }

    const verifyBackend = async (ip:any) => {
            try {
                const ENDPOINT = `http://${ip}:5000/`;
                const SENSORPOINT = `http://${data.ipAddress}:5000/sensors`;
            
                const {data: res} = await axios.get(ENDPOINT);
                const {data: sensorReadings} = await axios.get(SENSORPOINT);
                //console.log(res);
                if (res.message === 'connected') {
                setLoading(false);
                console.log('You are now connected to server..!');
                dispatch({
                    type: 'updateSensorReadings',
                    payload: sensorReadings,
                });
                console.log('sensor values fetched..!');
                dispatch({
                    type: 'setConnected',
                    payload: true
                });
                routeChange();    
                }  
            } catch (err) {
                setLoading(false);
                notify('Cannot connect to server. Please check your IP address');
                console.log(err);      
            }
    }
    const handleClick = (ip:any) => {
        validateIPaddress(ip) ? verifyBackend(ip) : notify('Invalid IP Address. Please Try Again');
    }

    const notify = (text:string) => {
        setShowToast(true);
        setMessage(text);
    }

    return (
        <IonPage>   
            <IonContent fullscreen>
                    <IonGrid style={{ display: 'flex', justifyContent: 'center', height:'220px', marginTop: '3rem'}}>
                        <IonRow>
                            <IonCol size="12" style={{ display: 'flex', justifyContent: 'center' }}>
                                <img className="robot" style={{ width: '100px', height: '150px'}} src={baby} />
                            </IonCol>
                            <IonCol size="12" style={{ display: 'flex', justifyContent: 'center' }}>
                                <div className="shadow"></div>
                            </IonCol>
                        </IonRow>
                       
                    </IonGrid>
                    
                    <IonText style={{ textAlign: 'center'}} color="primary">
                            <h4>Welcome to Baby Monitor</h4>
                    </IonText> 
                  <IonGrid style={{ display: 'flex', justifyContent: 'center'}}>
                       
                        <IonRow style={{ border: '1px solid #d1e0e0', borderRadius: '7px', padding: '4px', width: '80%'}}>
                            <IonCol size="12">
                                <IonItem>
                                        <IonInput 
                                        value={data.ipAddress} 
                                        placeholder="ex: 192.168.225.1"
                                        onIonChange={e => dispatch({
                                            type: 'changeData',
                                            payload: { ipAddress: e.detail.value!}
                                        })}
                                        required
                                        >  
                                        </IonInput>
                                    </IonItem>
                            </IonCol>
                            <IonCol size="12">
                                <IonButton expand="block" color="primary" onClick={() => handleClick(data.ipAddress)}>
                                    {isLoading ? 'Connecting': 'Connect to Cradle'}
                                    { isLoading && 
                                    <IonSpinner  
                                        color="light" 
                                        name="dots" 
                                        style={{ marginLeft: '10px'}}
                                    />}
                                </IonButton>
                            </IonCol>
                        </IonRow>
                  </IonGrid>
                  
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={toastMessage}
                    duration={3000}
                />
               
            </IonContent>
        </IonPage>   
    )
}

export default Connect;