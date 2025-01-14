import { Icon } from '@iconify/react/dist/iconify.js'
import { useState } from 'react'

const RightSidebar = () => {
    const [paymentMethod, setPaymentMethod] = useState('esewa')
    return (
        <div className='w-[25rem] p-3 flex flex-col  h-full bg-white text-black rounded-[24px]'>
            <h1 className='text-[2rem]'>Invoice</h1>
            <div className='flex flex-col flex-1 justify-between h-full overflow-hidden  gap-x-2 items-center'>

                <div className='h-full rightSidebar overflow-auto mb-2 flex flex-col gap-y-2 rounded-xl'>

                    <div className='w-full p-2 flex bg-zinc-50'>
                        <div className='rounded-xl overflow-hidden w-1/5 aspect-square'>
                        <img src='/esewa.avif' className='w-full object-cover' />
                        </div>
                        <div className='flex-1  text-zinc-700 pl-2'>
                            <h1>Rice Pudding</h1>
                            <p>2x</p>
                            <p>Do not Add vegetables</p>
                        </div>
                        <h1>Rs 200</h1>
                    </div>

                    <div className='w-full p-2 flex bg-zinc-50'>
                        <div className='rounded-xl overflow-hidden w-1/5 aspect-square'>
                        <img src='/esewa.avif' className='w-full object-cover' />
                        </div>
                        <div className='flex-1  text-zinc-700 pl-2'>
                            <h1>Rice Pudding</h1>
                            <p>2x</p>
                            <p>Do not Add vegetables</p>
                        </div>
                        <h1>Rs 200</h1>
                    </div>

                    <div className='w-full p-2 flex bg-zinc-50'>
                        <div className='rounded-xl overflow-hidden w-1/5 aspect-square'>
                        <img src='/esewa.avif' className='w-full object-cover' />
                        </div>
                        <div className='flex-1  text-zinc-700 pl-2'>
                            <h1>Rice Pudding</h1>
                            <p>2x</p>
                            <p>Do not Add vegetables</p>
                        </div>
                        <h1>Rs 200</h1>
                    </div>
                    <div className='w-full p-2 flex bg-zinc-50'>
                        <div className='rounded-xl overflow-hidden w-1/5 aspect-square'>
                        <img src='/esewa.avif' className='w-full object-cover' />
                        </div>
                        <div className='flex-1  text-zinc-700 pl-2'>
                            <h1>Rice Pudding</h1>
                            <p>2x</p>
                            <p>Do not Add vegetables</p>
                        </div>
                        <h1>Rs 200</h1>
                    </div>
                    </div>

                <div className='w-full aspect-square  flex flex-col justify-between '>

                <textarea className='w-full bg-zinc-100 rounded-[24px] p-3 focus:outline-none active:outline-none' placeholder='Any Special Requirements?'/>
                    <div className='bg-zinc-100 p-3 rounded-[24px]'>
                        <h1 className='text-[1.4rem] ' >Payment Summary</h1>
                        <div className='flex flex-col w-full text-zinc-600 mb-4'>
                            <div className='flex justify-between items-center'>
                                <h1>Sub Total</h1>
                                <h1>Rs 200</h1>
                            </div>
                            <div className='flex justify-between items-center pb-2'>
                                <h1>Tax</h1>
                                <h1>Rs 10</h1>
                            </div>
                            <div className='flex justify-between items-center pt-2 border-t border-dashed text-black font-semibold border-zinc-400'>
                                <h1>Total Payment</h1>
                                <h1>Rs 210</h1>
                            </div>
                        </div>

                        <div className='grid grid-cols-3 gap-x-2 rounded-[20px]'>
                            <div onClick={() => setPaymentMethod('esewa')} className={`w-full py-2  rounded-2xl flex flex-col justify-center items-center gapy-2 border  ${paymentMethod == 'esewa' ? ' bg-primary-100/80 border-primary-400' : 'border-transparent bg-white'}`}>
                                <Icon icon='duo-icons:credit-card' className='text-[1.8rem]' />
                                Esewa</div>
                            <div onClick={() => setPaymentMethod('cash')} className={`w-full py-2  rounded-2xl flex flex-col justify-center items-center gapy-2 border  ${paymentMethod == 'cash' ? ' bg-primary-100/80 border-primary-400' : 'border-transparent bg-white'}`}>
                                <Icon icon='solar:cash-out-bold-duotone' className='text-[1.8rem]' />
                                Cash</div>

                                <div onClick={() => setPaymentMethod('paylater')} className={`w-full py-2  rounded-2xl flex flex-col justify-center items-center gapy-2 border  ${paymentMethod == 'paylater' ? ' bg-primary-100/80 border-primary-400' : 'border-transparent bg-white'}`}>
                                <Icon icon='ic:twotone-payments' className='text-[1.8rem]' />
                                Pay Later</div>
                        </div>
                    </div>

                  
                    <button className='py-3 mt-2 text-center bg-primary-300 hover:bg-primary-500 w-full rounded-2xl gap-x-2 text-black flex justify-center items-center'>
                        <Icon icon="icon-park-twotone:buy" className='text-[1.6rem]' />
                        Place Order</button>

                </div>
            </div>


        </div>
    )
}

export default RightSidebar
