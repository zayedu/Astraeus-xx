"use client"

import type React from "react"
import { motion } from "framer-motion"
import type { ModelType } from "../App"

interface ModelToggleProps {
  selectedModel: ModelType
  onModelChange: (model: ModelType) => void
}

const ModelToggle: React.FC<ModelToggleProps> = ({ selectedModel, onModelChange }) => {
  const models = [
    { id: "dfr" as ModelType, name: "DFR Team", description: "Data & Financial Reporting" },
    { id: "par" as ModelType, name: "Performance & Risk", description: "Performance & Risk Analytics" },
  ]

  return (
    <div className="bg-white/50 rounded-lg p-3 border border-white/20 shadow-lg backdrop-blur-xl">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Data Source</h3>
        <div className="text-xs text-gray-500">Select your preferred model</div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {models.map((model) => (
          <motion.button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`relative p-3 rounded-lg text-left transition-all duration-200 ${
              selectedModel === model.id
                ? "bg-gradient-to-r from-rbc-blue to-rbc-blue-light text-white shadow-lg ring-2 ring-rbc-blue/50"
                : "bg-white/30 hover:bg-white/40 text-gray-700 border border-white/10 shadow-sm"
            }`}
            whileHover={{
              scale: 1.02,
              boxShadow:
                selectedModel === model.id
                  ? "0 10px 15px -3px rgba(0, 93, 170, 0.3), 0 4px 6px -2px rgba(0, 93, 170, 0.1)"
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.06)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${selectedModel === model.id ? "bg-white" : "bg-rbc-blue"}`} />
              <span
                className={`font-medium text-sm ${selectedModel === model.id ? "text-white" : "text-gradient-stripe"}`}
              >
                {model.name}
              </span>
            </div>
            <p className={`text-xs ${selectedModel === model.id ? "text-white/80" : "text-gray-500"}`}>
              {model.description}
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default ModelToggle
