import { Icon } from "@iconify/react/dist/iconify.js"

interface DialogModalProps {
    productName: string;
    onConfirm?: () => void;
    onCancel?: () => void;
    // outsideClick?:()=>void
}

const DialogModal = ({ productName, onConfirm, onCancel }: DialogModalProps) => {
    console.log('Delete Dialog Rendered')
    return (
        <div onClick={onCancel} className='fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-30 flex justify-center items-center'>
            <div onClick={(e:any)=>e.stopPropagation()} className='bg-white max-w-[25rem] w-full rounded-xl shadow-lg p-6 relative'>

                    <Icon
                        icon='maki:cross'
                        className="p-2 bg-zinc-100 rounded-full absolute top-4 right-4 cursor-pointer text-3xl text-black"
                        onClick={onCancel}
                    />

                <div className='text-center space-y-3'>
                    <Icon
                        icon='mdi:alert-circle-outline'
                        className="mx-auto text-6xl text-red-500"
                    />

                    <h1 className='text-xl font-semibold'>Are you sure?</h1>

                    <p className='text-gray-600'>
                        Do you really want to delete the product <strong>{productName}</strong>?
                        This process cannot be undone.
                    </p>

                    <div className='flex justify-center space-x-4 pt-4'>
                        <button
                            onClick={onCancel}
                            className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50'
                        >
                            Cancel
                        </button>

                        <button
                            onClick={onConfirm}
                            className='px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600'
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogModal