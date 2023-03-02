import "./ShoppingCartPage.css";
import React from "react";

import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { trashOutline } from "ionicons/icons";

//Import redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";

//Import deleteToCart function
import { deleteToCart, cleanCart } from "../../redux/reducers/cartReducers";

const ShoppingCartPage: React.FC = () => {
  const { cart, totalPrice } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Shopping Cart</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        {/* Wrapper Shopping Cart */}
        <div className="shopping-cart-container">
          <h3>Your Shopping Cart</h3>

          {/* Cart List */}
          <IonList>
            {/* Item Empty Cart */}
            {cart.length === 0 && (
              <IonItem>
                <IonLabel>Non ci sono prodotti nel tuo carrello!</IonLabel>
              </IonItem>
            )}

            {cart.map((el) => {
              return (
                // Product Item
                <IonItem key={el.product.id}>
                  <IonThumbnail slot="start">
                    {/* Image Product */}
                    <img src={el.product.image} alt={el.product.title} />
                  </IonThumbnail>
                  <IonLabel>
                    <div className="ion-item-content">
                      {/* Quantity and Title */}
                      <div>
                        <p>
                          Qnt: <strong>{el.quantity}</strong>
                        </p>
                        <h2>{el.product.title}</h2>
                      </div>

                      {/* Price and Delete */}
                      <div className="ion-text-center">
                        <p>
                          Price:
                          <strong>
                            {(el.product.price * el.quantity).toFixed(2)} $
                          </strong>
                        </p>
                        <div>
                          {/* Button Delete Product */}
                          <IonButton
                            color="danger"
                            fill="solid"
                            onClick={() => {
                              dispatch(deleteToCart(el));
                            }}
                          >
                            <IonIcon icon={trashOutline} />
                            Elimina
                          </IonButton>
                        </div>
                      </div>
                    </div>
                  </IonLabel>
                </IonItem>
              );
            })}

            {/* Footer Item */}
            <IonItem>
              <IonLabel>
                <div className="bottom-list">
                  {/* Total Price */}
                  <h1>
                    Total Price: <strong>{totalPrice.toFixed(2)} $</strong>
                  </h1>

                  {/* Button Buy Cart */}
                  <IonButton
                    fill="solid"
                    color="success"
                    className={totalPrice === 0 ? "button-disabled" : ""}
                    onClick={() => dispatch(cleanCart())}
                  >
                    Buy
                  </IonButton>
                </div>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ShoppingCartPage;
