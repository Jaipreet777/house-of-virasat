const Cart = () => {
    const { addItemToCart, deleteItemFromCart, cart } = useContext(CartContext);
  
    const increaseQty = (cartItem) => {
      const newQty = cartItem?.quantity + 1;
      const item = { ...cartItem, quantity: newQty };
  
      if (newQty > Number(cartItem.stock)) return;
  
      addItemToCart(item);
    };
  
    const decreaseQty = (cartItem) => {
      const newQty = cartItem?.quantity - 1;
      const item = { ...cartItem, quantity: newQty };
  
      if (newQty <= 0) return;
  
      addItemToCart(item);
    };
  
    const amountWithoutTax = cart?.cartItems?.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  
    const taxAmount = (amountWithoutTax * 0.15).toFixed(2);
  
    const totalAmount = (Number(amountWithoutTax) + Number(taxAmount)).toFixed(2);
  
    return (
      <>
        <Header/>
        <section className="py-5 sm:py-7 bg-blue-100">
          <div className="container max-w-screen-xl mx-auto px-4">
            <h2 className="text-3xl font-semibold mb-2">
              {cart?.cartItems?.length || 0} Item(s) in Cart
            </h2>
          </div>
        </section>
  
        {cart?.cartItems?.length > 0 && (
          <section className="py-10">
            <div className="container max-w-screen-xl mx-auto px-4">
              <div className="flex flex-col md:flex-row gap-4">
                <main className="md:w-3/4">
                  <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                    {cart?.cartItems?.map((cartItem, index) => (
                      <CartItem 
                        key={index} // Ideally, use a unique identifier if available
                        item={cartItem} 
                        onRemove={() => deleteItemFromCart(cartItem?.product)}
                      />
                    ))}
                  </article>
                </main>
                <aside className="md:w-1/4">
                  <article className="border border-gray-200 bg-white shadow-sm rounded mb-5 p-3 lg:p-5">
                    <ul className="mb-5">
                      <li className="flex justify-between text-gray-600  mb-1">
                        <span>Amount before Tax:</span>
                        <span>${amountWithoutTax}</span>
                      </li>
                      <li className="flex justify-between text-gray-600  mb-1">
                        <span>Total Units:</span>
                        <span className="text-green-500">
                          {cart?.cartItems?.reduce(
                            (acc, item) => acc + item.quantity,
                            0
                          )}{" "}
                          (Units)
                        </span>
                      </li>
                      <li className="flex justify-between text-gray-600  mb-1">
                        <span>TAX:</span>
                        <span>${taxAmount}</span>
                      </li>
                      <li className="text-lg font-bold border-t flex justify-between mt-3 pt-3">
                        <span>Total price:</span>
                        <span>${totalAmount}</span>
                      </li>
                    </ul>
  
                    <a href="/checkout" className="px-4 py-3 mb-2 inline-block text-lg w-full text-center font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 cursor-pointer">
                      Continue
                    </a>
  
                    <Link
                      href="/"
                      className="px-4 py-3 inline-block text-lg w-full text-center font-medium text-green-600 bg-white shadow-sm border border-gray-200 rounded-md hover:bg-gray-100"
                    >
                      Back to shop
                    </Link>
                  </article>
                </aside>
              </div>
            </div>
          </section>
        )}
        <Footer/>
      </>
    );
  };
  
  export default Cart;