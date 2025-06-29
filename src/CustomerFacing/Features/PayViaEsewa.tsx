import toast from "react-hot-toast";
import Button from "../../Components/UI/Button";
import CryptoJS from "crypto-js";

const PayViaEsewa = ({ id, totalPayment }: { id: string, totalPayment:number }) => {
  const handlePayViaEsewa = () => {
    window.localStorage.setItem("orderId", id);
    try {
      const uuid = new Date().getTime().toString().slice(-6);
      const jsonData: any = {
        amount: totalPayment.toFixed(2).toString(),
        failure_url: `${import.meta.env.VITE_URL}/esewa/purchase_fail`,
        product_delivery_charge: "0",
        product_service_charge: "0",
        product_code: "EPAYTEST",
        signature: "",
        signed_field_names: "total_amount,transaction_uuid,product_code",

        success_url: `${import.meta.env.VITE_URL}/esewa/payment_success`,
        tax_amount: "0",
        total_amount: totalPayment.toFixed(2).toString(),
        transaction_uuid: uuid,
      };
      let url = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      const message =
        "total_amount=" +
        jsonData.total_amount +
        ",transaction_uuid=" +
        jsonData.transaction_uuid +
        ",product_code=" +
        jsonData.product_code;
      const signature = createSignature(message);
      jsonData.signature = signature;

      const form = document.createElement("form");
      for (const key in jsonData) {
        const field = document.createElement("input");
        field.setAttribute("type", "hidden");
        field.setAttribute("name", key);
        field.setAttribute("value", jsonData[key]);
        form.appendChild(field);
      }

      form.setAttribute("method", "post");
      form.setAttribute("action", url);
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      toast.error("Something Unexpected Happen! Please Try Again later");
      console.log(error)
    } finally {
    }
  };
  function createSignature(message:string) {
    const hash = CryptoJS.HmacSHA256(message,"8gBm/:&EnhH.1/q");
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
    return hashInBase64;
  }
  

  return (
    <Button
      onClick={handlePayViaEsewa}
      className="text-nowrap h-fit !w-fit !bg-gray-200 !text-black text-sm px-2 py-1 !hover:bg-gray-300"
    >
      Pay Now
    </Button>
  );
};

export default PayViaEsewa;