import Nav from "../_components/nav/left-nav";
import OrderNav from "../_components/orders/order-nav";
import Orders from "../_components/orders/orders";

export default function Home() {
  return (
    <div className="">
      <Nav />
      <div className="relative flex flex-col top-20 left-60">
        <OrderNav />
        <Orders/>
      </div>
      
    </div>
  );
}
