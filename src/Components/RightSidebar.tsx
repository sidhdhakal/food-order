import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'
import { useCart } from '../Utils/CartContext'; // Assuming CartProvider is in the same folder

const RightSidebar = () => {
    const { cart, addToCart,removeFromCart, decreaseQuantity } = useCart();  // Get cart items from CartContext
    const [paymentMethod, setPaymentMethod] = useState('esewa');

    const cartItems = Object.values(cart);
    const subtotal = cartItems.reduce((total, item) => total + item.item.price * item.qty, 0);
    const tax = subtotal * 0.13;  // 13% tax

    // Calculate total payment, or set it to 0 if no items
    const totalPayment = subtotal + tax;

    return (
        <div className='w-[25rem] p-3 flex flex-col h-full bg-white text-black rounded-[24px]'>
            <h1 className='text-[2rem]'>Invoice</h1>
            <div className='flex flex-col flex-1 justify-between h-full overflow-hidden gap-x-2 items-center'>

                <div className='h-full rightSidebar overflow-auto mb-2 flex flex-col gap-y-2 rounded-xl'>
                    {/* Check if there are no items in the cart */}
                    {cartItems.length === 0 ? (
                        <div className='w-full p-4 text-center text-zinc-600'>
                            <h1 className='text-zinc-300'>No items in cart</h1>
                        </div>
                    ) : (
                        // Map over cart items and display them
                        cartItems.map((item) => (
                            <div key={item.item.id} className='w-full p-2 group flex bg-zinc-50 rounded-xl'>
                                <div className='rounded-xl overflow-hidden w-1/4 aspect-square relative'>
                                <span
                                            className="h-[50%] cursor-pointer absolute top-1/2 left-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-1/2 -translate-y-1/2 aspect-square rounded-full bg-red-500/70 flex justify-center items-center hover:bg-red-600"
                                            onClick={() => removeFromCart(item.item.id)} // Add item to cart
                                        >
                                            <Icon icon="icon-park-twotone:delete-one" className="text-white text-[1.5rem]" />
                                        </span>
                                    <img src={item.item.image} className='w-full h-full object-cover' alt={item.item.name} />
                                </div>
                                <div className='flex-1 text-zinc-600 pl-2'>
                                    <h1 className='font-semibold text-black'>{item.item.name}</h1>
                                    <p>{item.qty}x</p>

                                </div>

                                <div className='flex flex-col justify-between items-end'>
                                    <h1>Rs <span className='font-semibold text-black'>{item.item.price * item.qty}</span></h1>
                                    

                                    <div className="w-[7rem] h-[2.5rem] flex justify-between items-center bg-zinc-100 rounded-full">
                                        <span onClick={() => decreaseQuantity(item.item.id)} className="h-full cursor-pointer aspect-square rounded-full bg-white flex justify-center items-center hover:bg-zinc-300">
                                            <Icon icon="ic:round-minus" />
                                        </span>
                                        <h1>{cart[item.item.id]?.qty || 0}</h1> {/* Display quantity from the cart */}
                                        <span
                                            className="h-full cursor-pointer aspect-square rounded-full bg-primary-500 flex justify-center items-center hover:bg-primary-600"
                                            onClick={() => addToCart(item.item.id, item)} // Add item to cart
                                        >
                                             <Icon icon="line-md:plus" className="text-white text-[1.3vw]" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className='w-full aspect-square flex flex-col justify-between'>
                    <textarea
                        className='w-full bg-zinc-100 rounded-[24px] p-3 focus:outline-none active:outline-none'
                        placeholder='Any Special Requirements?'
                    />
                    <div className='bg-zinc-100 p-3 rounded-[24px]'>
                        <h1 className='text-[1.4rem]'>Payment Summary</h1>
                        <div className='flex flex-col w-full text-zinc-600 mb-4'>
                            <div className='flex justify-between items-center'>
                                <h1>Sub Total</h1>
                                <h1>Rs {subtotal.toFixed(2)}</h1>
                            </div>
                            <div className='flex justify-between items-center pb-2'>
                                <h1>Tax (13%)</h1>
                                <h1>Rs {tax.toFixed(2)}</h1>
                            </div>
                            <div className='flex justify-between items-center pt-2 border-t border-dashed text-black font-semibold border-zinc-400'>
                                <h1>Total Payment</h1>
                                <h1>Rs {totalPayment.toFixed(2)}</h1>
                            </div>
                        </div>

                        <div className='grid grid-cols-3 gap-x-2 rounded-[20px]'>
                            <div
                                onClick={() => setPaymentMethod('esewa')}
                                className={`w-full cursor-pointer py-2 rounded-2xl flex flex-col justify-center items-center gapy-2 border ${paymentMethod == 'esewa' ? ' bg-primary-100/80 border-primary-400' : 'border-transparent bg-white'}`}
                            >
                                <Icon icon='duo-icons:credit-card' className='text-[1.8rem]' />
                                Esewa
                            </div>
                            <div
                                onClick={() => setPaymentMethod('cash')}
                                className={`w-full cursor-pointer py-2 rounded-2xl flex flex-col justify-center items-center gapy-2 border ${paymentMethod == 'cash' ? ' bg-primary-100/80 border-primary-400' : 'border-transparent bg-white'}`}
                            >
                                <Icon icon='solar:cash-out-bold-duotone' className='text-[1.8rem]' />
                                Cash
                            </div>

                            <div
                                onClick={() => setPaymentMethod('paylater')}
                                className={`w-full cursor-pointer py-2 rounded-2xl flex flex-col justify-center items-center gapy-2 border ${paymentMethod == 'paylater' ? ' bg-primary-100/80 border-primary-400' : 'border-transparent bg-white'}`}
                            >
                                <Icon icon='ic:twotone-payments' className='text-[1.8rem]' />
                                Pay Later
                            </div>
                        </div>
                    </div>

                    <button className='py-3 text-center bg-primary-300 hover:bg-primary-500 w-full rounded-2xl gap-x-2 text-black flex justify-center items-center'>
                        <Icon icon='icon-park-twotone:buy' className='text-[1.6rem]' />
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RightSidebar;
