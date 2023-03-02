import "./ProductList.css";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonGrid,
  IonIcon,
  IonRow,
} from "@ionic/react";
import { cartOutline } from "ionicons/icons";
import { Product } from "../redux/reducers/apiReducers";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/reducers/cartReducers";
import { RootState } from "../redux/store";

const ProductList = ({
  products,
  openModal,
  setProductModal,
}: {
  products: Product[];
  openModal: (open: boolean) => void;
  setProductModal: (product: Product) => void;
}) => {
  const dispatch = useDispatch();
  const { cart, totalPrice } = useSelector((state: RootState) => state.cart);

  return (
    <IonGrid fixed={true}>
      <IonRow>
        {products.map((el: Product, index: number) => {
          return (
            <IonCol
              size="10"
              offset="1"
              size-md="6"
              offset-md="0"
              size-xl="6"
              key={index}
            >
              <IonCard className="card">
                <div
                  onClick={() => {
                    setProductModal(el);
                    openModal(true);
                  }}
                >
                  <img alt={el.title} src={el.image} className="img-card" />
                  <IonCardHeader>
                    <IonCardTitle>{el.title}</IonCardTitle>
                    <IonCardSubtitle>{el.category}</IonCardSubtitle>
                  </IonCardHeader>

                  <IonCardContent>
                    <p>
                      Price: <strong>{el.price}$</strong>
                    </p>
                  </IonCardContent>
                </div>
                <IonButton
                  className="btn-add"
                  color="success"
                  onClick={() => {
                    dispatch(addToCart({ product: el, quantity: 1 }));
                  }}
                >
                  Add to card
                  <IonIcon slot="start" icon={cartOutline}></IonIcon>
                </IonButton>
              </IonCard>
            </IonCol>
          );
        })}
      </IonRow>
    </IonGrid>
  );
};

export default ProductList;
