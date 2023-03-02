import "./ProductsPage.css";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//Import api for get all products
import { getAllProducts } from "../../redux/reducers/apiReducers";
import { RootState } from "../../redux/store";

//Import Component Product List
import ProductList from "../../components/ProductList";

const ProductsPage: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  const { cart } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Products </IonTitle>
          <IonButton slot="end" color="success" fill="clear">
            <IonIcon icon={cartOutline} />
            <IonBadge color="danger">{cart.length}</IonBadge>
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading ? (
          "Loading"
        ) : error.status ? (
          "Errore"
        ) : (
          <ProductList products={products} />
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductsPage;
