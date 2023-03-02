import "./ShoppingCartPage.css";
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
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
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
        <div className="shopping-cart-container">
          <h3>Your Shopping Cart</h3>
          <IonList>
            {cart.length === 0 ? (
              <IonItem>
                <IonLabel>Non ci sono prodotti nel tuo carrello!</IonLabel>
              </IonItem>
            ) : (
              ""
            )}
            {cart.map((el) => {
              return (
                <IonItem key={el.product.id}>
                  <IonLabel>
                    <div className="ion-item-content">
                      <div>
                        <p>
                          Qnt: <strong>{el.quantity}</strong>
                        </p>
                        <h2>{el.product.title}</h2>
                      </div>
                      <div className="ion-text-center">
                        <p>
                          Price:{" "}
                          <strong>{el.product.price * el.quantity} $</strong>
                        </p>
                        <div>
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
            <IonItem>
              <IonLabel>
                <div className="bottom-list">
                  <h1>
                    Total Price: <strong>{totalPrice} $</strong>
                  </h1>
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
