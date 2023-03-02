import "./SingleProductModal.css";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add, cartOutline, remove, star } from "ionicons/icons";
import { Product } from "../redux/reducers/apiReducers";

import { useDispatch } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducers";
import { useState } from "react";

const SingleProductModal = ({
  product,
  isOpen,
  setIsOpen,
}: {
  product: Product;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const removeQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <IonModal isOpen={isOpen}>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{product.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="modal-img">
          <img src={product.image} alt="" />
        </div>
        <div className="modal-content">
          {/* Title */}
          <h2>{product.title}</h2>

          {/* Category */}
          <h6>{product.category}</h6>

          {/* Description */}
          <p>
            <strong>Description:</strong> {product.description}
          </p>

          {/* Rating */}
          <p>
            Rating:{" "}
            <span className="stars-rating">
              {[...Array(Math.ceil(product.rating.rate))].map((_, i) => {
                return <IonIcon key={i} icon={star} color="warning" />;
              })}
            </span>
          </p>

          {/* Price */}
          <p>
            price: <strong>{product.price} $</strong>
          </p>

          {/* Quantity to Buy */}
          <div className="quantity-box">
            <IonButton size="small" onClick={removeQuantity}>
              <IonIcon icon={remove} />
            </IonButton>
            <h3 className="quantity">{quantity}</h3>
            <IonButton size="small" onClick={addQuantity}>
              <IonIcon icon={add} />
            </IonButton>
          </div>
          <IonButton
            color="success"
            onClick={() => {
              dispatch(addToCart({ product, quantity }));
            }}
          >
            Add to card
            <IonIcon slot="start" icon={cartOutline}></IonIcon>
          </IonButton>
        </div>
      </IonContent>
    </IonModal>
  );
};

export default SingleProductModal;
