import "./ProductsPage.css";
import React, { useEffect, useState } from "react";

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

//Import api for get all products
import { getAllProducts } from "../../redux/reducers/apiReducers";

//Import Redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

//Import Component Product List
import ProductList from "../../components/ProductList/ProductList";
import SingleProductModal from "../../components/SingleProductModal/SingleProductModal";

const ProductsPage: React.FC = () => {
  const dispatch: ThunkDispatch<RootState, any, AnyAction> = useDispatch();

  //Get Product Loading Error from Store
  const { products, loading, error } = useSelector(
    (state: RootState) => state.products
  );

  // Get TotalProduct from Store
  const { totalProduct } = useSelector((state: RootState) => state.cart);

  //State for Open Single Product Modal
  const [isOpen, setIsOpen] = useState(false);
  //Product of Modal
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
    //Call Api for Get All Products
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

          {/* Link to Cart */}
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
          // Loading
          <div className="wrapper">
            <IonSpinner></IonSpinner>
          </div>
        ) : error.status ? (
          // Error
          <div className="wrapper">
            <h1>Error! {error.message}</h1>
          </div>
        ) : (
          <div>
            {/* List of Product */}
            <ProductList
              products={products}
              openModal={setIsOpen}
              setProductModal={setProductModal}
            />
            {/* Modal for single Product */}
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
