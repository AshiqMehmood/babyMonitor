import React, {useEffect, useState} from 'react';
import { IonContent, IonHeader, IonPage, IonText, IonIcon, IonButton, IonInput, IonItem, IonToast } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../ContextStore'; 
import axios from 'axios';



const validateIPaddress = (ipaddress:any) => { 
 if (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipaddress))
  {
    return true
  }
console.log('invalid format');  
return false
}

const Connect:React.FC = () => {
    const history = useHistory();
    
    //const [text, setText] = useState<string>('');
    //@ts-ignore
    const [{data}, dispatch] = useStateValue(); //data has ip address
    //using toast
    const [showToast, setShowToast] = useState(false);
    const [toastMessage,  setMessage] = useState('');
    const [isConnected, setConnect] = useState(false);

    const routeChange = () => {
        let path = '/tab1'; 
        history.push(path);
    }
    const verifyBackend = async (ip:any) => {
            try {
                const ENDPOINT = `http://${ip}:5000/`;
            
                const {data: res} = await axios.get(ENDPOINT);
                //console.log(res);
                if (res.message === 'connected') {
                console.log('You are now connected to server..!');
                routeChange();    
                }  
            } catch (err) {
                notify('Cannot connect to server !');
                console.log(err);      
            }
    }
    const handleClick = (ip:any) => {
        validateIPaddress(ip) ? verifyBackend(ip) : notify('Invalid IP Address ! check format');
    }

    const notify = (text:string) => {
        setShowToast(true);
        setMessage(text);
    }

    return (
        <IonPage>
            <IonContent fullscreen>
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
                <IonButton expand="block" color="primary" onClick={() => handleClick(data.ipAddress)}>
                    Connect to Raspberry
                </IonButton>
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