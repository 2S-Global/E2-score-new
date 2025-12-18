"use client"

import { useEffect, useState } from "react"

export function CreditScoreGauge({
  score,
  minScore = 300,
  maxScore = 900,
  size = 300,
  animated = true,
}) {
  const [displayScore, setDisplayScore] = useState(animated ? minScore : score)

  const rangeSchema = [
    { from: 0.0, to: 0.35, color: "#EF7673", label: "Poor" },
    { from: 0.35, to: 0.5, color: "#F59E6C", label: "Average" },
    { from: 0.5, to: 0.65, color: "#EAB86C", label: "Good" },
    { from: 0.65, to: 0.85, color: "#66D9A9", label: "Very Good" },
    { from: 0.85, to: 1.0, color: "#5ED4A8", label: "Excellent" },
  ]

  const ranges = rangeSchema.map((r) => ({
    min: minScore + r.from * (maxScore - minScore),
    max: minScore + r.to * (maxScore - minScore),
    color: r.color,
    label: r.label,
  }))

  useEffect(() => {
    if (!animated) return

    const duration = 2000
    const steps = 60
    const increment = (score - minScore) / steps
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      if (currentStep <= steps) {
        setDisplayScore(minScore + increment * currentStep)
      } else {
        setDisplayScore(score)
        clearInterval(timer)
      }
    }, duration / steps)

    return () => clearInterval(timer)
  }, [score, minScore, animated])

  const centerX = size / 2
  const centerY = size * 0.55
  const radius = (size * 0.65) / 2
  const strokeWidth = size * 0.065
  const startAngle = 180
  const endAngle = 360
  const totalAngle = endAngle - startAngle

  const toRadians = (angle) => (angle * Math.PI) / 180

  const polarToCartesian = (angle, r) => ({
    x: centerX + r * Math.cos(toRadians(angle)),
    y: centerY + r * Math.sin(toRadians(angle)),
  })

  const createArc = (startAngle, endAngle, r) => {
    const start = polarToCartesian(startAngle, r)
    const end = polarToCartesian(endAngle, r)
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`
  }

  const currentRange =
    ranges.find(
      (range) => displayScore >= range.min && displayScore <= range.max
    ) || ranges[0]

  const scorePercentage = (displayScore - minScore) / (maxScore - minScore)
  const scoreAngle = startAngle + totalAngle * scorePercentage

  const indicatorPos = polarToCartesian(scoreAngle, radius)
  const indicatorRadius = strokeWidth * 0.65

  return (
    <div className="d-flex flex-column align-items-center gap-2">
      <svg
        width={size}
        height={size * 0.6}
        viewBox={`0 0 ${size} ${size * 0.6}`}
        style={{ overflow: "visible" }}
      >
        <circle
          cx={centerX}
          cy={centerY}
          r={radius * 0.75}
          fill="#f1f3f5"
        />

        {ranges.map((range, index) => {
          const startPct = (range.min - minScore) / (maxScore - minScore)
          const endPct = (range.max - minScore) / (maxScore - minScore)
          return (
            <path
              key={index}
              d={createArc(
                startAngle + totalAngle * startPct,
                startAngle + totalAngle * endPct,
                radius
              )}
              fill="none"
              stroke={range.color}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
            />
          )
        })}

        <circle
          cx={indicatorPos.x}
          cy={indicatorPos.y}
          r={indicatorRadius + 3}
          fill={currentRange.color}
        />
        <circle
          cx={indicatorPos.x}
          cy={indicatorPos.y}
          r={indicatorRadius}
          fill="#fff"
        />

        <text
          x={centerX}
          y={centerY - 8}
          textAnchor="middle"
          className="fw-bold"
          style={{
            fontSize: `${size * 0.155}px`,
            fill: "#212529",
          }}
        >
          {Math.round(displayScore)}
        </text>
      </svg>

      <div
        className="fw-semibold fs-4 text-center"
        style={{ color: currentRange.color }}
      >
        {currentRange.label}
      </div>
    </div>
  )
}
