import "./ErrorPage.css";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";

const ErrorPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Page Not Found</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="wrapper-error-page">
          <h1>Error 404!Page Not Found.</h1>
          <IonButton routerLink="/products">Back to Products</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ErrorPage;
