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
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//Import api for get all products
import { getAllProducts, Product } from "../../redux/reducers/apiReducers";
import { RootState } from "../../redux/store";

//Import Component Product List
import ProductList from "../../components/ProductList";
import SingleProductModal from "../../components/SingleProductModal";

const ProductsPage: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );
  const { totalProduct } = useSelector((state: RootState) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const [productModal, setProductModal] = useState({
    id: 0,
    category: "",
    image: "",
    description: "",
    price: 0,
    rating: { count: 0, rate: 0 },
    title: "",
  });

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
          <IonTitle>Products</IonTitle>
          <IonButton
            slot="end"
            color="success"
            fill="clear"
            routerLink="/shopping-cart"
          >
            <IonIcon icon={cartOutline} />
            <IonBadge color="danger">{totalProduct}</IonBadge>
          </IonButton>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {loading ? (
          <div className="wrapper">
            <IonSpinner></IonSpinner>
          </div>
        ) : error.status ? (
          <div className="wrapper">
            <h1>Error! {error.message}</h1>
          </div>
        ) : (
          <div>
            <ProductList
              products={products}
              openModal={setIsOpen}
              setProductModal={setProductModal}
            />
            <SingleProductModal
              product={productModal}
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            />
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ProductsPage;
