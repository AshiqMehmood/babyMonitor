import React, {useState} from 'react';
import { IonItem, IonToggle, IonList, IonLabel} from '@ionic/react';
import {useStateValue} from '../ContextStore';

const Actions:React.FC = () => {
    //@ts-ignore
    const [{data}, dispatch] = useStateValue();

    //functions
    const handleSwing = () => {

    }

    return(
        <IonList>
            <IonItem>
                <IonLabel>Swing Cradle</IonLabel>
            <IonToggle color="primary" value="swing" checked={false} />
            </IonItem>
            <IonItem>
            <IonLabel>Light</IonLabel>
            <IonToggle color="primary" value="light" checked={false}/>
            </IonItem>
    
            <IonItem>
            <IonLabel>Fan</IonLabel>
            <IonToggle color="primary" value="fan" checked={true}/>
            </IonItem>
      </IonList>
    )
}

export default Actions;