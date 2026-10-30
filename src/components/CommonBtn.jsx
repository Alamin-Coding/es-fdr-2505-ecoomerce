

const CommonBtn = ({ children }) => {
  return (
    <button className="bg-black cursor-pointer text-white text-[15px] font-poppins rounded-[10px] py-5 px-[70px] flex items-center">
      {children}
    </button>
  );
};

export default CommonBtn;
