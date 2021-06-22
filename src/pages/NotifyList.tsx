import { IonList, IonItem, IonLabel, IonContent, IonPage, IonHeader,IonToolbar,IonTitle, IonIcon } from '@ionic/react';
import { arrowBackOutline, warningOutline  } from 'ionicons/icons';
import { useEffect } from 'react';
import { useStateValue } from '../ContextStore';

const NotifyList: React.FC = () => {
  //@ts-ignore
  const [{notifications, notifCounter}, dispatch] = useStateValue();

  useEffect(() => {
    //reset notification counter
    const getPanelLength = notifications.length;
    dispatch({
      type: 'resetNotifyCounter',
      payload: 0
    });
  }, []);

return (
<IonPage>
<IonHeader>
        <IonToolbar color="primary">
          <IonItem 
            lines="none" 
            routerDirection="back" 
            routerLink="/tab1" 
            slot="start" 
            color="primary"
            onClick={() => dispatch({
              type: 'deleteNotifications',
              payload: [{id:99, alert: 'No New Notifications'}]
            })}
            >
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
        <IonItem key={item.id}>
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