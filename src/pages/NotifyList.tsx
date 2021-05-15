import { IonList, IonItem, IonLabel, IonContent } from '@ionic/react';

const NotifyList: React.FC = () => {

return (
<IonContent>
    <IonList>
      <IonItem>
        <IonLabel>Baby is awake</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Humidity is High !</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Baby is awake</IonLabel>
      </IonItem>
      <IonItem>
        <IonLabel>Temp is Low</IonLabel>
      </IonItem>
    </IonList>
  </IonContent>  
)
}

export default NotifyList;