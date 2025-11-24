const OrderNav = () => {
  return (
    <div>
      <div className="flex w-[80%] relative rounded-t-2xl p-2.5 justify-between bg-white">
        <div className="flex flex-col items-center">
          <p className="text-2xl text-black">Orders</p>
          <p className="text-gray-500 text-sm bg-white rounded-full px-4">
            100 items
          </p>
        </div>
        <div className="flex gap-4">
          <button className="text-black bg-gray-200 rounded-full px-2.5">
            <input type="date" />
          </button>

          <button className="text-black bg-gray-200 rounded-full px-2.5">
            Change delivery state{" "}
            <span className="rounded-full px-2 text-center bg-black text-white">
              3
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderNav;
