import React from "react"

const PubPlaceholder: React.FC = () => {
  return (
    <>
      <svg
        width="232"
        height="342"
        viewBox="0 0 232 342"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#filter0_dd_313_544)">
          <rect width="200" height="310" transform="translate(12 12)" fill="#A7998B" />
          <rect width="143" height="30" transform="translate(29 32)" fill="#D4CDC4" />
          <rect width="143" height="12" transform="translate(29 72)" fill="#D4CDC4" />
          <rect width="143" height="12" transform="translate(29 94)" fill="#D4CDC4" />
        </g>
        <defs>
          <filter
            id="filter0_dd_313_544"
            x="0"
            y="0"
            width="232"
            height="342"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="12" dy="12" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.654902 0 0 0 0 0.6 0 0 0 0 0.545098 0 0 0 0.35 0"
            />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_313_544" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="4"
              operator="dilate"
              in="SourceAlpha"
              result="effect2_dropShadow_313_544"
            />
            <feOffset dx="4" dy="4" />
            <feGaussianBlur stdDeviation="6" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.654902 0 0 0 0 0.6 0 0 0 0 0.545098 0 0 0 0.35 0"
            />
            <feBlend
              mode="normal"
              in2="effect1_dropShadow_313_544"
              result="effect2_dropShadow_313_544"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect2_dropShadow_313_544"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </>
  )
}

export default PubPlaceholder
