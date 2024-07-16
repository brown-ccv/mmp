import React from "react"
import * as SwitchUI from "@radix-ui/react-switch"

type updateSelectionType = (item: string) => void

interface SwitchProps {
  name: string
  option1: string
  option2: string
  updateSelection: updateSelectionType
}

const Switch: React.FC<SwitchProps> = ({ name, option1, option2, updateSelection }) => {
  const emitSelection = (checked: boolean) => {
    return checked ? updateSelection(option2) : updateSelection(option1)
  }

  return (
    <form>
      <div className="flex items-center">
        <label htmlFor={name}>{option1}</label>
        <SwitchUI.Root
          className="drop-shadow-md w-12 h-6 relative mx-4"
          id={name}
          onCheckedChange={(checked) => emitSelection(checked)}
        >
          <SwitchUI.Thumb className="switchSlider" />
        </SwitchUI.Root>
        <label>{option2}</label>
      </div>
    </form>
  )
}

export default Switch
