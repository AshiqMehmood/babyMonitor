import React, {useState} from 'react';
import { IonItem, IonToggle, IonList, IonLabel} from '@ionic/react';
import {useStateValue} from '../ContextStore';
import axios from 'axios';

const Actions:React.FC = () => {
    //@ts-ignore
    const [{data}, dispatch] = useStateValue();
    const [swingState, setSwing] = useState(false);
    const [fanState, setFan] = useState(false);
    const [lightState, setLight] = useState(false);
    //functions
    const ENDPOINT =  `http://${data.ipAddress}:5000`;

    const handleSwing = async (checked:any) => {     
        if (checked && !swingState) {
            await setSwing(true);
            let URL = `${ENDPOINT}/drive?action=on`; 
            await axios.get(URL); 
            //console.log('>>>', res);
        } 
        else { 
            await setSwing(false);
            let URL = `${ENDPOINT}/drive?action=off`; 
            await axios.get(URL);
            //console.log('>>>', res);
        }   
    }

    const handleLight = async (checked:any) => {
        if (checked && !lightState) {
            await setLight(true);
            let URL = `${ENDPOINT}/light?action=on`; 
            await axios.get(URL); 
            //console.log('>>>', res);
        } 
        else { 
            await setLight(false);
            let URL = `${ENDPOINT}/light?action=off`; 
            await axios.get(URL);
            //console.log('>>>', res);
        }   
    }

    const handleFan = async (checked:any) => {
        if (checked && !fanState) {
            await setFan(true);
            let URL = `${ENDPOINT}/fan?action=on`; 
            await axios.get(URL); 
            //console.log('>>>', res);
        } 
        else { 
            await setFan(false);
            let URL = `${ENDPOINT}/fan?action=off`; 
            await axios.get(URL);
            //console.log('>>>', res);
        }   
    }

    return(
        <IonList>
            <IonItem>
                <IonLabel>Swing Cradle</IonLabel>
            <IonToggle 
                color="primary" 
                value="swing" 
                checked={swingState} 
                onIonChange={e => handleSwing(e.detail.checked)}
            />
            </IonItem>
            <IonItem>
            <IonLabel>Light</IonLabel>
            <IonToggle 
                color="primary" 
                value="light" 
                checked={lightState}
                onIonChange={e => handleLight(e.detail.checked)}
            />
            </IonItem>
    
            <IonItem>
            <IonLabel>Fan</IonLabel>
            <IonToggle 
                color="primary" 
                value="fan" 
                checked={fanState}
                onIonChange={e => handleFan(e.detail.checked)}
            />
            </IonItem>
            <IonItem>
            <IonLabel></IonLabel>
               
            </IonItem>
      </IonList>
    )
}

export default Actions;