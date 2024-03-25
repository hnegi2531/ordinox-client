import toast from "react-hot-toast";

type ToastType = {
  type?: 'success' | 'error',
  message: string

}

export const customToast = ({ type = 'success', message }: ToastType) => toast.custom((t) => {

  if (type === 'success')
    return <div
      className={`${t.visible ? 'animate-enter' : 'animate-leave'
        } bg-[#367c55] px-4 py-2 shadow-lg rounded-sm pointer-events-auto gap-4 flex w-fit max-w-md ring-1 ring-black ring-opacity-5`}
    >
      <div className="flex items-center gap-2 py-2 text-gray-200">
        <div className="">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
          </svg>

        </div>
        <p className="text-sm text-gray-100 font-regular font-poppins">
          {message}
        </p>
      </div>
      <div className="flex py-2 pl-4 border-l border-[#6eaf8c]">
        <button
          onClick={() => {
            toast.dismiss(t.id)
            toast.remove(t.id);
          }}
          className="flex items-center justify-center w-full text-sm font-medium text-gray-100 border border-transparent rounded-md hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

  return <div
    className={`${t.visible ? 'animate-enter' : 'animate-leave'
      } bg-red-900 px-4 py-2 shadow-lg rounded-sm pointer-events-auto gap-4 flex w-fit max-w-md ring-1 ring-black ring-opacity-5`}
  >
    <div className="flex items-center gap-2 py-2 text-red-200">
      <div className="">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
        </svg>


      </div>
      <p className="text-sm text-gray-100 font-regular font-poppins">
        {message}
      </p>
    </div>
    <div className="flex py-2 pl-4 border-l border-red-600">
      <button
        onClick={() => {
          toast.dismiss(t.id)
          toast.remove(t.id);
        }}
        className="flex items-center justify-center w-full text-sm font-medium text-gray-100 border border-transparent rounded-md hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
})