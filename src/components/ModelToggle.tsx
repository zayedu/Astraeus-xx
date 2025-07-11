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
    { id: "par" as ModelType, name: "PAR Team", description: "Performance & Risk Analytics" },
  ]

  return (
    <div className="bg-white/70 backdrop-blur-2xl rounded-3xl p-5 border border-gray-200/60 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">Data Source</h3>
        <div className="text-xs text-gray-500">Select your preferred model</div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {models.map((model) => (
          <motion.button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={`relative p-4 rounded-2xl text-left transition-all duration-200 ${
              selectedModel === model.id
                ? "bg-gradient-to-r from-rbc-blue to-rbc-blue-light text-white shadow-lg"
                : "bg-gray-50 hover:bg-gray-100 text-gray-700"
            }`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <div className="flex items-center space-x-2 mb-1">
              <div className={`w-2 h-2 rounded-full ${selectedModel === model.id ? "bg-white" : "bg-rbc-blue"}`} />
              <span className="font-medium text-sm">{model.name}</span>
            </div>
            <p className={`text-xs ${selectedModel === model.id ? "text-white/80" : "text-gray-500"}`}>
              {model.description}
            </p>

            {selectedModel === model.id && (
              <motion.div
                layoutId="selected-indicator"
                className="absolute inset-0 rounded-2xl border-2 border-rbc-yellow"
                initial={false}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  )
}

export default ModelToggle
