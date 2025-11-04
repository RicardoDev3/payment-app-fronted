import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import Backdrop from "../../components/Backdrop/Backdrop";
import CustomerForm from "./components/CustomerForm/CustomerForm";
import ProductSidebar from "./components/ProductSidebar/ProductSidebar";
import OrderSummary from "./components/OrderSummary/OrderSummary";
import DeliveryForm from "./components/DeliveryForm/DeliveryForm";
import CreditCardForm from "./components/CreditCardForm/CreditCardForm";
import ProgressSteps from "./components/ProgressSteps/ProgressSteps";
import {
  setCustomerData,
  setDeliveryData,
  setCreditCardData,
  createTransaction,
  processPayment,
} from "../../store/slices/transactionSlice";
import { clearCart } from "../../store/slices/cartSlice";
import styles from "./CheckoutPage.module.css";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { selectedProduct } = useSelector((state) => state.cart);
  const { loading, currentTransaction } = useSelector(
    (state) => state.transaction
  );

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    customer: {},
    delivery: {},
    payment: {},
  });

  const BASE_FEE = 5000;
  const DELIVERY_FEE = 10000;
  const subtotal = selectedProduct?.price || 0;
  const total = subtotal + BASE_FEE + DELIVERY_FEE;

  useEffect(() => {
    console.log("CheckoutPage - selectedProduct:", selectedProduct); // DEBUG
    if (!selectedProduct) {
      console.log("No product, redirecting to home"); // DEBUG
      navigate("/");
    }
  }, [selectedProduct, navigate]);

  useEffect(() => {
    if (currentTransaction?.id && currentTransaction?.status) {
      navigate(`/result/${currentTransaction.id}`);
    }
  }, [currentTransaction, navigate]);

  if (!selectedProduct) return null;

  const handleCustomerSubmit = (customerData) => {
    console.log("Customer submit:", customerData); // DEBUG
    setFormData({ ...formData, customer: customerData });
    dispatch(setCustomerData(customerData));
    setStep(2);
  };

  const handleDeliverySubmit = (deliveryData) => {
    console.log("Delivery submit:", deliveryData); // DEBUG
    setFormData({ ...formData, delivery: deliveryData });
    dispatch(setDeliveryData(deliveryData));
    setStep(3);
  };

  const handlePaymentSubmit = (paymentData) => {
    console.log("Payment submit:", paymentData); // DEBUG
    setFormData({ ...formData, payment: paymentData });
    dispatch(setCreditCardData(paymentData));
    setStep(4);
  };

  const handleGoBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleConfirmPayment = async () => {
    try {
      const transactionResult = await dispatch(
        createTransaction({
          productId: selectedProduct.id,
          quantity: 1,
          customer: formData.customer,
          delivery: formData.delivery,
        })
      ).unwrap();

      await dispatch(
        processPayment({
          transactionId: transactionResult.transaction.id,
          creditCard: formData.payment,
        })
      ).unwrap();

      dispatch(clearCart());
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <Layout>
      <Backdrop isVisible={loading} message="Procesando tu pago..." />

      <div className={styles.checkoutPage}>
        <div className={styles.container}>
          <h1 className={styles.title}>Finalizar Compra</h1>

          <ProgressSteps currentStep={step} />

          <div className={styles.contentWrapper}>
            {/* Formularios */}
            <div className={styles.formContainer}>
              {step === 1 && (
                <CustomerForm
                  initialData={formData.customer}
                  onSubmit={handleCustomerSubmit}
                />
              )}

              {step === 2 && (
                <DeliveryForm
                  initialData={formData.delivery}
                  onSubmit={handleDeliverySubmit}
                  onBack={handleGoBack}
                />
              )}

              {step === 3 && (
                <CreditCardForm
                  initialData={formData.payment}
                  onSubmit={handlePaymentSubmit}
                  onBack={handleGoBack}
                />
              )}

              {step === 4 && (
                <OrderSummary
                  product={selectedProduct}
                  customer={formData.customer}
                  delivery={formData.delivery}
                  subtotal={subtotal}
                  baseFee={BASE_FEE}
                  deliveryFee={DELIVERY_FEE}
                  total={total}
                  onConfirm={handleConfirmPayment}
                  onBack={handleGoBack}
                  loading={loading}
                />
              )}
            </div>

            {/* Sidebar */}
            <ProductSidebar
              product={selectedProduct}
              baseFee={BASE_FEE}
              deliveryFee={DELIVERY_FEE}
              total={total}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
