import React from 'react'

const Loader = ({ size = 'base' }: { size?: 'base' | 'lg' }) => {

  const getSize = () => {
    switch (size) {
      case 'lg': {
        return 'w-16 h-16'
      }
      case 'base': {
        return 'w-6 h-6'
      }
      default: {
        return 'w-6 h-6'
      }
    }

  }
  return (
    // <svg
    //   xmlns="http://www.w3.org/2000/svg"
    //   fill="none"
    //   viewBox="0 0 24 24"
    //   strokeWidth={1.5}
    //   stroke="currentColor"
    //   className={`${getSize()} animate-spin`}
    // >
    //   <path
    //     strokeLinecap="round"
    //     strokeLinejoin="round"
    //     d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
    //   />
    // </svg>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="252"
      height="250"
      fill="none"
      viewBox="0 0 252 250"
      className={`${getSize()} animate-spin`}
    >
      <path
        fill="currentColor"
        d="M50.848 91.38c-.484-4.932-7.114-5.969-8.169-1.126-2.331 10.702-3.58 22.007-3.58 33.695C39.099 191.356 80.635 246 131.871 246c38.242 0 71.08-30.441 85.276-73.909-11.177 25.717-30.806 42.777-53.154 42.777-20.853 0-39.339-14.854-50.8-37.737-3.142-6.272-12.423-7.378-16.137-1.425-2.812 4.507-9.117 5.183-12.493 1.081-18.534-22.522-30.507-52.673-33.715-85.406z"
      ></path>
      <path
        fill="currentColor"
        d="M185.757 57.483c4.517 2.047 8.729-3.167 5.059-6.5-8.111-7.365-17.284-14.094-27.415-19.936C104.976-2.643 36.854 5.959 11.245 50.26c-19.114 33.065-9.141 76.672 21.439 110.672-16.704-22.518-21.68-48.016-10.51-67.339 10.423-18.03 32.537-26.59 58.098-25.063 7.007.419 12.604-7.054 9.3-13.24-2.5-4.684.065-10.473 5.309-11.342 28.783-4.77 60.901-.052 90.876 13.535z"
      ></path>
      <path
        fill="currentColor"
        d="M147.736 191.113c-4.034 2.883-1.619 9.134 3.106 7.625 10.441-3.333 20.863-7.903 30.994-13.744 58.425-33.691 85.028-96.915 59.419-141.216-19.114-33.065-61.911-46.243-106.683-36.792 27.878-3.19 52.475 5.256 63.644 24.579 10.423 18.03 6.788 41.438-7.317 62.784-3.866 5.851-.186 14.429 6.83 14.664 5.312.179 9.049 5.293 7.181 10.263-10.257 27.281-30.406 52.703-57.174 71.837z"
      ></path>
      <path
        stroke="#000"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M50.848 91.38c-.484-4.932-7.114-5.969-8.169-1.126-2.331 10.702-3.58 22.007-3.58 33.695C39.099 191.356 80.635 246 131.871 246c38.242 0 71.08-30.441 85.276-73.909-11.177 25.717-30.806 42.777-53.154 42.777-20.853 0-39.339-14.854-50.8-37.737-3.142-6.272-12.423-7.378-16.137-1.425-2.812 4.507-9.117 5.183-12.493 1.081-18.534-22.522-30.507-52.673-33.715-85.406z"
      ></path>
      <path
        stroke="#000"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M185.757 57.483c4.517 2.047 8.729-3.167 5.059-6.5-8.111-7.365-17.284-14.094-27.415-19.936C104.976-2.643 36.854 5.959 11.245 50.26c-19.114 33.065-9.141 76.672 21.439 110.672-16.704-22.518-21.68-48.016-10.51-67.339 10.423-18.03 32.537-26.59 58.098-25.063 7.007.419 12.604-7.054 9.3-13.24-2.5-4.684.065-10.473 5.309-11.342 28.783-4.77 60.901-.052 90.876 13.535z"
      ></path>
      <path
        stroke="#000"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M147.736 191.113c-4.034 2.883-1.619 9.134 3.106 7.625 10.441-3.333 20.863-7.903 30.994-13.744 58.425-33.691 85.028-96.915 59.419-141.216-19.114-33.065-61.911-46.243-106.683-36.792 27.878-3.19 52.475 5.256 63.644 24.579 10.423 18.03 6.788 41.438-7.317 62.784-3.866 5.851-.186 14.429 6.83 14.664 5.312.179 9.049 5.293 7.181 10.263-10.257 27.281-30.406 52.703-57.174 71.837z"
      ></path>
    </svg>
  )
}

export default Loader