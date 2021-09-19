import { useState } from 'react';

function ResetButton({ hide, id }) {
  const [isHidden, setIsHidden] = useState(!hide);

  if (isHidden) {
    return (
      <div className="reset-btn hide" id={'reset-btn-' + { id }}>
        Återställ
      </div>
    );
  } else {
    return (
      <div className="reset-btn" id={'reset-btn-' + { id }}>
        Återställ
      </div>
    );
  }
}

export default ResetButton;
