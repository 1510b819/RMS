import { useState } from 'react';

const usePositionToggle = () => {
  const [positions, setPositions] = useState({
    "School Nurse": true,
    "Registrar": true,
    "Career Adviser": true,
    "Reading Admin": true,
    "Administrator": true,
    "Cashier": true,
    "Proware Specialist": true,
    "Maintenance-Officer": true,
    "MIS": true,
    "Guidance-Associate": true,
    "School-Administrator": true,
    "Admission-Officer": true,
    "Discipline-Officer": true,
    "Faculty": true,
  });

  const handleTogglePosition = (position) => {
    setPositions(prevPositions => ({
      ...prevPositions,
      [position]: !prevPositions[position]
    }));
  };

  return { positions, handleTogglePosition };
};

export default usePositionToggle;
