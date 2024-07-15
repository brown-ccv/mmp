import React from "react"
import * as SwitchUI from "@radix-ui/react-switch"

interface SwitchProps {
  name: string
  option1: string
  option2: string
}

const Switch: React.FC<SwitchProps> = ({ name, option1, option2 }) => {
  return (
    <form>
      <div className="flex items-center">
        <label htmlFor={name}>{option1}</label>
        <SwitchUI.Root className="drop-shadow-md w-12 h-6 relative mx-4" id={name}>
          <SwitchUI.Thumb className="switchSlider" />
        </SwitchUI.Root>
        <label>{option2}</label>
      </div>
    </form>
  )
}

export default Switch
