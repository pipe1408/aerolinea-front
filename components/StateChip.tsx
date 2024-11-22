import { cva, type VariantProps } from "class-variance-authority"

const stateChipVariants = cva(
  "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset",
  {
    variants: {
      state: {
        PROGRAMADO: "bg-blue-50 text-blue-700 ring-blue-600/20",
        CONFIRMADO: "bg-green-50 text-green-700 ring-green-600/20",
        ABORDANDO: "bg-yellow-50 text-yellow-700 ring-yellow-600/20",
        CERRADO: "bg-gray-50 text-gray-700 ring-gray-600/20",
        EN_VUELO: "bg-purple-50 text-purple-700 ring-purple-600/20",
        ATERRIZO: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
        CANCELADO: "bg-red-50 text-red-700 ring-red-600/20",
      },
    },
    defaultVariants: {
      state: "PROGRAMADO",
    },
  }
)

export interface StateChipProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof stateChipVariants> {
  state: "PROGRAMADO" | "CONFIRMADO" | "ABORDANDO" | "CERRADO" | "EN_VUELO" | "ATERRIZO" | "CANCELADO"
}

export function StateChip({ state, className, ...props }: StateChipProps) {
  return (
    <span className={stateChipVariants({ state, className })} {...props}>
      {state}
    </span>
  )
}

