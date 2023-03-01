import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const FavoriteProductsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Your Favorite Products</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">Prodotti Preferiti</IonContent>
    </IonPage>
  );
};

export default FavoriteProductsPage;
