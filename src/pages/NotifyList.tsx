import { IonList, IonItem, IonLabel, IonContent, IonPage, IonHeader,IonToolbar,IonTitle, IonIcon } from '@ionic/react';
import { arrowBackOutline, warningOutline  } from 'ionicons/icons';
import notifications from '../components/notificationList';

const NotifyList: React.FC = () => {

return (
<IonPage>
<IonHeader>
        <IonToolbar color="primary">
          <IonItem lines="none" routerDirection="back" routerLink="/" slot="start" color="primary">
            <IonIcon
              icon={arrowBackOutline}
              size="large"
            >
            </IonIcon>
          </IonItem>
          <IonTitle size="small">Notifications</IonTitle>
          
        </IonToolbar>
  </IonHeader>
   <IonContent>
   <IonList>
      
       { notifications.map((item:any) => 
        <IonItem>
         <IonIcon size="small" icon={warningOutline} slot="start"></IonIcon>
         <IonLabel>{item.alert}</IonLabel>
       </IonItem>
       )}
      
    </IonList>
   </IonContent>
   
</IonPage>
)
}

export default NotifyList;