interface IProps {
  children?: any;
  click?: () => void;
  styles?: string;
}

export const Button = ({ children, click, styles }: IProps) => {
  return (
    <button
      className={`bg-white text-black font-bold px-4 py-2 rounded transition-all active:scale-95 ${styles}`}
      onClick={click}
    >
      {children}
    </button>
  );
};
