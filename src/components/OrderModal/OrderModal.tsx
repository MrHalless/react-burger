import { useCallback } from "react";
import cn from "classnames";
import { useLocation, useNavigate, useParams } from "react-router";
import { feedRegExp, profileRegExp } from "../../utils/regexp";
import { useStore } from "../../hooks";
import { useViewOrder } from "../../hooks/useViewOrder";
import Modal from "../Modal/Modal";
import s from "./OrderModal.module.css";
import { formatOrderNumber } from "../../utils/formatOrderNumber";
import Loader from "../Loader/Loader";
import { Order } from "../Order/Order";

const OrderModal: React.FC = () => {
  const {
    orders: { viewOrder },
  } = useStore();

  const navigate = useNavigate();
  const location = useLocation();
  const isFeed = feedRegExp.test(location.pathname);
  const isProfile = profileRegExp.test(location.pathname);
  const { id } = useParams();

  useViewOrder(id);

  const handlerOnCloseCurrentOrderModal = useCallback(() => {
    if (isFeed) navigate(`/feed`, { state: null });
    if (isProfile) navigate(`/profile/orders`, { state: null });
  }, [navigate, isFeed, isProfile]);

  return (
    <Modal
      title={
        <span className={cn("text text_type_digits-default", s.number)}>
          {viewOrder && `#${formatOrderNumber(String(viewOrder.number))}`}
        </span>
      }
      onClose={handlerOnCloseCurrentOrderModal}
    >
      {viewOrder ? (
        <>
          <Order />
        </>
      ) : (
        <Loader />
      )}
    </Modal>
  );
};

export default OrderModal;
