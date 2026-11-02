const SectionHeading = ({
  className,
  subHeading,
  heading,
  textCenter = false,
}) => {
  return (
    <div className={textCenter ? "text-center": ""}>
      <h3 className={`text-[46px] font-volkhov text-[#484848] pb-[20px] ${className}`}>
        {subHeading}
      </h3>
      <h2 className={`text-4 font-poppins leading-[26px] text-[#8A8A8A] ${className}`}>
        {heading}
      </h2>
    </div>
  );
};

export default SectionHeading;
