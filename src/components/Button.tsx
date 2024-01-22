interface IProps {
  children?: any;
  click?: () => void;
}

export const Button = ({ children, click }: IProps) => {
  return (
    <button
      className="bg-white text-black font-bold px-4 py-2 rounded transition-all active:scale-95"
      onClick={click}
    >
      {children}
    </button>
  );
};
