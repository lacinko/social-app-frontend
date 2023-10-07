type FlyoutMenuProps = {
  children: React.ReactNode;
  setShowFlyoutMenu: React.Dispatch<React.SetStateAction<boolean>>;
  coords: {
    x: number;
    y: number;
  };
};

function FlyoutMenu({ children, setShowFlyoutMenu, coords }: FlyoutMenuProps) {
  return (
    <div
      className="absolute inset-0 z-20"
      onClick={() => setShowFlyoutMenu(false)}
    >
      <div
        style={{
          top: `${coords.y}px`,
          left: `${coords.x}px`,
        }}
        className="fixed max-w-xs flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5"
      >
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}

export default FlyoutMenu;
