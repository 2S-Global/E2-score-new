'use client'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addExperience } from '../../../features/filter/candidateFilterSlice'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
const Experience = () => {
  const dispatch = useDispatch()
  const [getExperience, setExperience] = useState([0, 30])
  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Slider
          size="small"
          value={getExperience}
          aria-label="Small"
          valueLabelDisplay="auto"
          color=""
          min={0}
          max={30}
          onChange={(e, newValue) => setExperience(newValue)}
          onChangeCommitted={(e, newValue) => dispatch(addExperience(newValue))}
        />
      </Box>

      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>{getExperience?.[0] || 0} years</span>
        <span>{getExperience?.[1] || 0} years</span>
      </span>

      {/* <ul className="switchbox">
      {experience?.map((item) => (
        <li key={item.id}>
          <label className="switch">
            <input
              type="checkbox"
              checked={item.isChecked}
              value={item.value}
              onChange={(e) => experienceHandler(e, item.id)}
            />
            <span className="slider round"></span>
            <span className="title">{item.name}</span>
          </label>
        </li>
      ))}
    </ul> */}
    </>
  )
}

export default Experience
