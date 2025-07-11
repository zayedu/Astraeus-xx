"use client"

import * as React from "react"
import {
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Dot,
} from "recharts"
import {
  type ChartConfig,
  ChartTooltip as ChartTooltipComponent,
  ChartTooltipContent as ChartTooltipContentComponent,
  ChartLegend as ChartLegendComponent,
  ChartLegendContent as ChartLegendContentComponent,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"

const ChartContext = React.createContext<ChartConfig | null>(null)

function Chart({ config, className, children }: { config: ChartConfig } & React.ComponentProps<"div">) {
  return (
    <ChartContext.Provider value={config}>
      <div className={cn("h-[400px] w-full", className)}>{children}</div>
    </ChartContext.Provider>
  )
}

function useChart() {
  const context = React.useContext(ChartContext)
  if (!context) {
    throw new Error("useChart must be used within a <Chart />")
  }
  return context
}

const ChartContainer = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof ResponsiveContainer> & {
    config: ChartConfig
    className?: string
  }
>(({ config, className, children, ...props }, ref) => (
  <ChartContext.Provider value={config}>
    <div ref={ref} className={cn("h-[400px] w-full", className)}>
      <ResponsiveContainer {...props}>{children}</ResponsiveContainer>
    </div>
  </ChartContext.Provider>
))
ChartContainer.displayName = "ChartContainer"

const ChartTooltip = ({ ...props }: React.ComponentProps<typeof ChartTooltipComponent>) => (
  <ChartTooltipComponent {...props} />
)
ChartTooltip.displayName = "ChartTooltip"

const ChartTooltipContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof ChartTooltipContentComponent>>(
  ({ ...props }, ref) => <ChartTooltipContentComponent ref={ref} {...props} />,
)
ChartTooltipContent.displayName = "ChartTooltipContent"

const ChartLegend = ({ ...props }: React.ComponentProps<typeof ChartLegendComponent>) => (
  <ChartLegendComponent {...props} />
)
ChartLegend.displayName = "ChartLegend"

const ChartLegendContent = React.forwardRef<HTMLDivElement, React.ComponentProps<typeof ChartLegendContentComponent>>(
  ({ ...props }, ref) => <ChartLegendContentComponent ref={ref} {...props} />,
)
ChartLegendContent.displayName = "ChartLegendContent"

const ChartCrosshair = ({ ...props }: React.ComponentProps<typeof CartesianGrid>) => <CartesianGrid {...props} />
ChartCrosshair.displayName = "ChartCrosshair"

const ChartAxis = ({ ...props }: React.ComponentProps<typeof XAxis>) => <XAxis {...props} />
ChartAxis.displayName = "ChartAxis"

const ChartYAxis = ({ ...props }: React.ComponentProps<typeof YAxis>) => <YAxis {...props} />
ChartYAxis.displayName = "ChartYAxis"

const ChartLine = ({ ...props }: React.ComponentProps<typeof Line>) => <Line {...props} />
ChartLine.displayName = "ChartLine"

const ChartBar = ({ ...props }: React.ComponentProps<typeof Bar>) => <Bar {...props} />
ChartBar.displayName = "ChartBar"

const ChartArea = ({ ...props }: React.ComponentProps<typeof Area>) => <Area {...props} />
ChartArea.displayName = "ChartArea"

const ChartDot = ({ ...props }: React.ComponentProps<typeof Dot>) => <Dot {...props} />
ChartDot.displayName = "ChartDot"

export {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  ChartCrosshair,
  ChartAxis,
  ChartYAxis,
  ChartLine,
  ChartBar,
  ChartArea,
  ChartDot,
  LineChart,
  BarChart,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Dot,
}

export type { ChartConfig }
