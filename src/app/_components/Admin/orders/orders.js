const Orders = (props) => {
  const { index, email, numOfItems, date, price, address, status } = props;
  return (
    <div>
      <hr className="w-fit" />
      <div className="flex justify-around items-center bg-white text-black w-[80%]">
        <div className=" w-[80]">
          <input type="checkbox" />
        </div>
        <div className=" w-[80]">
          <p>{index}</p>
        </div>
        <div className=" w-[200]">
          <p>{email}</p>
        </div>
        <div className=" w-[80]">
          <p>{numOfItems}</p>
        </div>
        <div className=" w-[100]">
          <p>{date}</p>
        </div>
        <div className=" w-[80]">
          <p>{price}</p>
        </div>
        <div className=" w-[200]">
          <p>{address}</p>
        </div>
        <div className=" w-[80]">
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
