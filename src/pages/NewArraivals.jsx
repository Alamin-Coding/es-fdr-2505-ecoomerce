import Arrivals from "../components/Arrivals";
import SectionHeading from "../components/SectionHeading";

const NewArraivals = ({ dataProps }) => {
	return (
		<section className="w-full bg-white pt-[150px]">
			<div className="container">
				{/* Heading */}
				<SectionHeading
					className={"mx-auto max-w-[614px] text-center"}
					subHeading={"New Arrivals"}
					heading={
						"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque duis ultrices sollicitudin aliquam sem. Scelerisque duis ultrices sollicitudin"
					}
				/>
				<Arrivals anoterProps={dataProps} />
			</div>
		</section>
	);
};

export default NewArraivals;
