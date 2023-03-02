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
import { useDispatch } from "react-redux";
import { useState } from "react";

//Import From Store
//Type of Product
import { Product } from "../../redux/reducers/apiReducers";
//Action Add to Cart
import { addToCart } from "../../redux/reducers/cartReducers";

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
  //Quantity for the product
  const [quantity, setQuantity] = useState(1);

  //Function addQuantity
  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  //Function RemoveQuantity
  const removeQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    // Modal
    <IonModal isOpen={isOpen}>
      {/* Header Modal */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>{product.title}</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setIsOpen(false)}>Close</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Content Modal */}
      <IonContent className="ion-padding">
        {/* Product Image */}
        <div className="modal-img">
          <img src={product.image} alt={product.title} />
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
