import React, {useState} from 'react';
import { IonContent, IonHeader, IonPage, IonText, IonIcon, IonButton, IonInput, IonItem, } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useStateValue } from '../ContextStore'; 

const Connect:React.FC = () => {
    const history = useHistory();
    const routeChange = () => {
    let path = '/tab1';
    history.push(path);

    }
    //const [text, setText] = useState<string>('');
    //@ts-ignore
    const [{data}, dispatch] = useStateValue(); //data has ip address

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
                <IonButton expand="block" color="primary" onClick={routeChange}>
                    Connect to Raspberry
                </IonButton>
            </IonContent>
        </IonPage>   
    )
}

export default Connect;