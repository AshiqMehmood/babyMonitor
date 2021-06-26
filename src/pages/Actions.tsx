import React, {useState} from 'react';
import { IonList, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonRow, IonCol, IonGrid } from '@ionic/react';
import {useStateValue} from '../ContextStore';
import axios from 'axios';
import fan from '../fan.png';
import light from '../idea.png';
import cradle from '../cradle.png';

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
        <IonList style={{ marginBottom: '30px'}}>
            <IonGrid>
                <IonRow>
                    <IonCol size="4">
                        <IonCard 
                            style={{ borderRadius: '20px', minWidth: '90px'}} 
                            color={ swingState ? 'warning' : 'light'}
                            button
                            onClick={e => handleSwing(e.target)}
                            >
                                <div style={{ display: 'flex', justifyContent: 'center'}}>
                                    <IonCardHeader style={{ textAlign: 'center'}}>
                                        <IonCardSubtitle>Swing</IonCardSubtitle>
                                        <IonCardTitle style={{fontSize: '1.85rem'}}>

                                            <img style={{ width: '35px'}} src={cradle}/>
                                        </IonCardTitle>
                                    
                                    </IonCardHeader>
                                </div>
                        </IonCard>
                    </IonCol>
                    <IonCol size="4">
                        <IonCard 
                         style={{ borderRadius: '20px', minWidth: '90px'}} 
                         color={ fanState ? 'warning' : 'light'}
                         button 
                         onClick={e => handleFan(e.target)}
                         >
                                <div style={{ display: 'flex', justifyContent: 'center'}}>
                                    <IonCardHeader style={{ textAlign: 'center'}}>
                                        <IonCardSubtitle>Fan</IonCardSubtitle>
                                        <IonCardTitle style={{fontSize: '1.85rem'}}>

                                            <img style={{ width: '35px'}} src={fan}/>
                                        </IonCardTitle>
                                    
                                    </IonCardHeader>
                                </div>
                        </IonCard>
                    </IonCol>
                    <IonCol size="4">
                        <IonCard 
                        style={{ borderRadius: '20px', minWidth: '90px'}} 
                        color={ lightState ? 'warning' : 'light'}
                        button 
                        onClick={e => handleLight(e.target)}
                        >
                                <div style={{ display: 'flex', justifyContent: 'center'}}>
                                    <IonCardHeader style={{ textAlign: 'center'}}>
                                        <IonCardSubtitle>Light</IonCardSubtitle>
                                        <IonCardTitle style={{fontSize: '1.85rem'}}>

                                            <img style={{ width: '35px'}} src={light}/>
                                        </IonCardTitle>
                                    
                                    </IonCardHeader>
                                </div>
                        </IonCard>
                    </IonCol>
                </IonRow>
            </IonGrid>
            
      </IonList>
    )
}

export default Actions;