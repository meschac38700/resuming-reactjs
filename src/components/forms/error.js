import { motion } from "framer-motion";

const frameError = {
	initial: { opacity: 0, y: 14 },
	animate: { opacity: 1, y: 4 },
	exit: { opacity: 0, y: 10 },
	transition: { duration: 0.2 },
};

export default function InputError({ message }) {
	return (
		<motion.p
			className="flex items-center gap-1 px-2 mb-0 font-semibold text-red-500 bg-red-100 rounded-md"
			{...frameError}
			style={{ color: "#dc3545" }}
		>
			{message}
		</motion.p>
	);
}
