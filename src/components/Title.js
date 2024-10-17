export default function Title({ title, centered }) {
	const textCentered = centered && "text-center";
	return <h1 className={"title h3 " + textCentered}>{title}</h1>;
}
