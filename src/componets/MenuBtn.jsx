function MenuBtn({ applicationState, setApplicationState }) {
  const MenuBtnToggle = (e) => {
    const targetEl = e.target;
    const targetId = e.target.id;
    if (targetId === 'menu-btn') {
      if (targetEl.classList.contains('fa-bars')) {
        targetEl.classList.remove('fa-bars');
        targetEl.classList.add('fa-times');
        setApplicationState({ ...applicationState, menuOpen: true });
      } else if (targetEl.classList.contains('fa-times')) {
        targetEl.classList.remove('fa-times');
        targetEl.classList.add('fa-bars');
        setApplicationState({ ...applicationState, menuOpen: false });
      }
    }
  };
  return (
    <div onClick={(e) => MenuBtnToggle(e)} className="menu-btn">
      {!applicationState.menuOpen ? (
        <i className="fas fa-bars fa-4x" id="menu-btn"></i>
      ) : (
        <i className="fas fa-times fa-4x" id="menu-btn"></i>
      )}
    </div>
  );
}

export default MenuBtn;
