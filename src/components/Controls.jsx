import { useState } from 'react';

export function Controls({ onUpdate }) {
  const [varusValgusAngle, setVarusValgusAngle] = useState(0);
  const [flexionExtensionAngle, setFlexionExtensionAngle] = useState(0);

  const handleVarusValgusChange = (increment) => {
    const newAngle = varusValgusAngle + increment;
    setVarusValgusAngle(newAngle);
    onUpdate({ varusValgus: newAngle });
  };

  const handleFlexionExtensionChange = (increment) => {
    const newAngle = flexionExtensionAngle + increment;
    setFlexionExtensionAngle(newAngle);
    onUpdate({ flexionExtension: newAngle });
  };

  return (
    <div>
      <button onClick={() => handleVarusValgusChange(1)}>Varus/Valgus +1°</button>
      <button onClick={() => handleVarusValgusChange(-1)}>Varus/Valgus -1°</button>
      <button onClick={() => handleFlexionExtensionChange(1)}>Flexion/Extension +1°</button>
      <button onClick={() => handleFlexionExtensionChange(-1)}>Flexion/Extension -1°</button>
    </div>
  );
}
